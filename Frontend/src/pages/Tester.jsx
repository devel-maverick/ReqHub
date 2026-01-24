import React, { useState, useCallback, useEffect, useRef } from "react";
import axiosInstance from "../api/axios";
import RequestBar from "../components/RequestBar";
import HistoryPanel from "../components/HistoryPanel";
import RequestTabs from "../components/RequestTabs";
import ResponsePanel from "../components/ResponsePanel";
import WebSocketPanel from "../components/WebSocketPanel";
export default function Tester() {
  const [showHistory, setShowHistory] = useState(true);
  const [historyReloadKey, setHistoryReloadKey] = useState(0);
  const [activeRequest, setActiveRequest] = useState({
    method: "GET",
    url: "",
    params: [{ key: "", value: "" }],
    headers: [{ key: "Content-Type", value: "application/json" }],
    body: "",
  });

  const [response, setResponse] = useState(null);
  const [meta, setMeta] = useState(null);

  const [protocol, setProtocol] = useState("HTTP");
  const [wsStatus, setWsStatus] = useState("disconnected");
  const [wsMessages, setWsMessages] = useState([]);
  const wsRef = useRef(null);

  const sendRequest = async () => {
    if (protocol === "WebSocket") return;
    if (!activeRequest.url) return;

    const params = (activeRequest.params ?? [])
      .filter(p => p.key)
      .reduce((acc, p) => ({ ...acc, [p.key]: p.value }), {});

    let headers = (activeRequest.headers ?? [])
      .filter(h => h.key)
      .reduce((acc, h) => ({ ...acc, [h.key]: h.value }), {});

    const authType = activeRequest.authType;
    const authData = activeRequest.authData || {};

    if (authType === "bearer" && authData.token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${authData.token}`,
      };
    }

    if (authType === "basic" && authData.username) {
      const raw = `${authData.username}:${authData.password || ""}`;
      const encoded = btoa(raw);
      headers = {
        ...headers,
        Authorization: `Basic ${encoded}`,
      };
    }

    const start = performance.now();
    try {
      const res = await axiosInstance.post("/request", {
        method: activeRequest.method,
        url: activeRequest.url,
        params,
        headers,
        authType,
        authData,
        bodyType: activeRequest.body ? "raw" : "none",
        body: null,
        rawText: activeRequest.body || null,
      });

      const time = Math.round(performance.now() - start);
      const result = res.data || {};
      const body =
        result.body !== undefined && result.body !== null
          ? result.body
          : result.text !== undefined && result.text !== null
          ? result.text
          : result;

      setResponse(body);
      setMeta({
        status: result.status ?? res.status,
        time: result.timeMs ?? time,
        size:
          result.sizeBytes != null
            ? `${result.sizeBytes} B`
            : `${JSON.stringify(body).length} B`,
        headers: result.headers || {},
      });
      setHistoryReloadKey((k) => k + 1);
    } catch (err) {
      const time = Math.round(performance.now() - start);
      if (err.response) {
        const data = err.response.data;
        setResponse(data || err.message);
        setMeta({
          status: err.response.status,
          time,
          size: JSON.stringify(data ?? err.message).length + " B",
          headers: err.response.headers || {},
        });
      } else {
        setResponse(err.message || "Request failed");
        setMeta({
          status: "Error",
          time,
          size: (err.message || "Request failed").length + " B",
          headers: {},
        });
      }
    }
  };
  useEffect(() => {
    setHistoryReloadKey((k) => k + 1);
  }, []);

  const appendWsMessage = (partial) => {
    setWsMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ...partial,
      },
    ]);
  };

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  const connectWebSocket = () => {
    if (!activeRequest.url) return;

    disconnectWebSocket();
    try {
      const socket = new WebSocket(activeRequest.url);
      wsRef.current = socket;
      setWsStatus("connecting");
      setWsMessages([]);

      socket.onopen = () => {
        setWsStatus("connected");
        appendWsMessage({ type: "system", text: "Connected" });
        // Log this WebSocket call into backend history
        axiosInstance
          .post("/history/ws", { url: activeRequest.url })
          .then(() => setHistoryReloadKey((k) => k + 1))
          .catch(() => {});
      };

      socket.onmessage = (event) => {
        appendWsMessage({ type: "in", text: String(event.data || "") });
      };

      socket.onerror = () => {
        appendWsMessage({ type: "system", text: "Error on WebSocket connection" });
      };

      socket.onclose = () => {
        setWsStatus("disconnected");
        appendWsMessage({ type: "system", text: "Disconnected" });
      };
    } catch {
      setWsStatus("disconnected");
      appendWsMessage({ type: "system", text: "Failed to open WebSocket" });
    }
  };

  const handleWsConnectToggle = () => {
    if (wsStatus === "connected" || wsStatus === "connecting") {
      disconnectWebSocket();
    } else {
      connectWebSocket();
    }
  };

  const handleWsSendMessage = (text) => {
    if (!wsRef.current || wsStatus !== "connected") return;
    try {
      wsRef.current.send(text);
      appendWsMessage({ type: "out", text });
    } catch {
      appendWsMessage({ type: "system", text: "Failed to send message" });
    }
  };

  useEffect(() => {
    if (protocol !== "WebSocket") {
      disconnectWebSocket();
      setWsStatus("disconnected");
    }
    return () => {
      disconnectWebSocket();
    };
  }, [protocol]);

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {showHistory && (
        <div className="w-72 min-w-72 max-w-72 flex-shrink-0">
          <HistoryPanel
            setActiveRequest={setActiveRequest}
            setProtocol={setProtocol}
            reloadKey={historyReloadKey}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-auto min-w-0">
        <RequestBar
          request={activeRequest}
          setRequest={setActiveRequest}
          onSend={sendRequest}
          protocol={protocol}
          setProtocol={setProtocol}
          onConnect={handleWsConnectToggle}
          isWsConnected={wsStatus === "connected"}
          toggleHistory={() => setShowHistory(!showHistory)}
        />

        <div className="flex flex-row h-full">
          {protocol === "HTTP" ? (
            <>
              <div className="w-[600px] min-w-[400px] max-w-[700px] border-r border-zinc-800">
                <RequestTabs
                  request={activeRequest}
                  setRequest={setActiveRequest}
                />
              </div>
              <div className="flex-1">
                <ResponsePanel response={response} meta={meta} />
              </div>
            </>
          ) : (
            <div className="flex-1 border-l border-zinc-900">
              <WebSocketPanel
                url={activeRequest.url}
                status={wsStatus}
                messages={wsMessages}
                onSendMessage={handleWsSendMessage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


