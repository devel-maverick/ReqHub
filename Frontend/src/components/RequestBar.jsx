import React, { useState, useEffect } from "react";
import { PanelLeftClose, X, Wifi } from "lucide-react";
import axiosInstance from "../api/axios";

export default function RequestBar({
  request,
  setRequest,
  onSend,
  toggleHistory,
  protocol,
  setProtocol,
  onConnect,
  isWsConnected,
}) {

  const [savedRequests, setSavedRequests] = useState([]);

  const [showEnvModal, setShowEnvModal] = useState(false);
  const [envVars, setEnvVars] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("envVars") || "{}");
    } catch {
      return {};
    }
  });
  const [newVarKey, setNewVarKey] = useState("");
  const [newVarValue, setNewVarValue] = useState("");
  const [tabs, setTabs] = useState([
    { id: 1, method: "GET", url: "", protocol: "HTTP" }
  ]);
  const [activeTab, setActiveTab] = useState(1);

  const [showHistoryPreview, setShowHistoryPreview] = useState(false);


  const addTab = () => {
    const newId = tabs.length ? Math.max(...tabs.map(t => t.id)) + 1 : 1;
    const active = tabs.find(t => t.id === activeTab);
    const baseProtocol = active?.protocol || "HTTP";
    const baseMethod = active?.method || "GET";
    setTabs([
      ...tabs,
      { id: newId, method: baseMethod, url: "", protocol: baseProtocol },
    ]);
    setActiveTab(newId);
  };

  const closeTab = (id) => {
    let newTabs = tabs.filter(t => t.id !== id);
    if (!newTabs.length) newTabs = [{ id: 1, method: "GET", url: "" }];
    setTabs(newTabs);
    if (activeTab === id) setActiveTab(newTabs[newTabs.length - 1].id);
  };

  // Switch tab
  const switchTab = (id) => {
    setActiveTab(id);
  };

  const updateRequest = (field, value) => {
    setTabs(tabs.map(tab =>
      tab.id === activeTab ? { ...tab, [field]: value } : tab
    ));
    setRequest({ ...request, [field]: value });
  };

  const handleProtocolChange = (e) => {
    const value = e.target.value;
    setProtocol?.(value);
    setTabs(tabs.map(tab =>
      tab.id === activeTab ? { ...tab, protocol: value } : tab
    ));
  };

  const tabWidth = Math.max(120, 220 - tabs.length * 15);

  useEffect(() => {
    const tab = tabs.find(t => t.id === activeTab);
    if (tab) {
      const tabProtocol = tab.protocol || "HTTP";
      setRequest({ method: tab.method, url: tab.url });
      setProtocol?.(tabProtocol);
    }
  }, [activeTab, tabs]);


  const substituteEnvVars = (str) => {
    if (!str) return str;
    return str.replace(/\{\{(\w+)\}\}/g, (_, key) => envVars[key] || "");
  };

  const handleCopyAsCurl = () => {
    let curl = `curl -X ${request.method}`;
    const url = substituteEnvVars(request.url);
    curl += ` "${url}"`;
    if (request.headers && Array.isArray(request.headers)) {
      request.headers.forEach(h => {
        if (h.key && h.value) curl += ` -H "${h.key}: ${substituteEnvVars(h.value)}"`;
      });
    }
    if (request.body && request.body.trim()) {
      curl += ` -d '${substituteEnvVars(request.body)}'`;
    }
    navigator.clipboard.writeText(curl);
    alert("cURL command copied to clipboard!");
  };

  const saveEnvVars = () => {
    localStorage.setItem("envVars", JSON.stringify(envVars));
    setShowEnvModal(false);
  };

  return (
    <div className="border-b border-gray-800 p-2 space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {showHistoryPreview && (
            <div className="bg-gray-700 text-xs px-2 py-1 rounded mr-2 cursor-pointer" onClick={() => setShowHistoryPreview(false)}>
              History Preview
            </div>
          )}
          {/* Tabs */}
          <div className="flex items-center overflow-x-auto" style={{ maxWidth: "60vw" }}>
            {tabs.map(tab => {
              const tabProtocol = tab.protocol || "HTTP";
              const tabLabel = tabProtocol === "WebSocket" ? "WS" : tab.method;
              return (
              <div
                key={tab.id}
                className={`flex items-center bg-gray-800 rounded mr-1 px-2 py-1 cursor-pointer transition-all duration-200 ${activeTab === tab.id ? "border-b-2 border-purple-500" : "opacity-70"}`}
                style={{ minWidth: tabWidth, maxWidth: tabWidth }}
                onClick={() => switchTab(tab.id)}
              >
                <span className="mr-2 text-xs">{tabLabel}</span>
                <span className="truncate text-xs" style={{ maxWidth: tabWidth - 40 }}>{tab.url || "New Request"}</span>
                {tabs.length > 1 && (
                  <button className="ml-2 text-gray-400 hover:text-red-400" onClick={e => { e.stopPropagation(); closeTab(tab.id); }}>
                    <X size={14} />
                  </button>
                )}
              </div>
            );
            })}
            <button className="bg-gray-700 px-2 py-1 rounded ml-1 text-xs" onClick={addTab}>+</button>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="bg-gray-800 px-3 py-1 rounded" onClick={handleCopyAsCurl}>Copy as CURL</button>

          <button className="bg-gray-800 px-3 py-1 rounded" onClick={() => setShowEnvModal(true)}>Env</button>
          <button onClick={toggleHistory} className="bg-gray-800 p-2 rounded">
            <PanelLeftClose size={18} />
          </button>
        </div>
      </div>

      <div className="flex gap-2">

        <select
          value={protocol}
          onChange={handleProtocolChange}
          className="bg-gray-900 border border-gray-700 px-2 rounded"
        >
          <option value="HTTP">HTTP</option>
          <option value="WebSocket">WebSocket</option>
        </select>

        {protocol === "HTTP" && (
          <select
            value={request.method}
            onChange={(e) => updateRequest("method", e.target.value)}
            className="bg-gray-900 border border-gray-700 px-2 rounded"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        )}

        <input
          value={request.url}
          onChange={e => updateRequest("url", e.target.value)}
          placeholder="Enter request URL"
          className="flex-1 bg-gray-900 border border-gray-700 px-3 py-1 rounded"
        />

        <button
          onClick={protocol === "WebSocket" ? onConnect : onSend}
          className="bg-purple-600 px-5 py-1 rounded"
        >
          {protocol === "WebSocket"
            ? isWsConnected
              ? "Disconnect"
              : "Connect"
            : "Send"}
        </button>
      </div>


      {showEnvModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-lg shadow-lg p-6 w-96 relative">
            <button className="absolute top-2 right-2" onClick={() => setShowEnvModal(false)}><X size={20} /></button>
            <div className="font-bold text-lg mb-2">Environment Variables</div>
            <div className="text-xs mb-3 bg-zinc-800 p-2 rounded">
              Use environment variables in your requests with the syntax <span className="bg-zinc-700 px-1 rounded">&#123;&#123;VARIABLE_NAME&#125;&#125;</span><br />
              Example: <span className="bg-zinc-700 px-1 rounded">&#123;&#123;BASE_URL&#125;&#125;/api/users</span>
            </div>
            <div className="mb-2">
              {Object.entries(envVars).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2 mb-1">
                  <input value={key} disabled className="bg-zinc-800 px-2 py-1 rounded w-1/3 text-xs" />
                  <input value={value} onChange={e => setEnvVars(v => ({ ...v, [key]: e.target.value }))} className="bg-zinc-800 px-2 py-1 rounded w-2/3 text-xs" />
                  <button className="text-red-400 text-xs" onClick={() => setEnvVars(v => { const nv = { ...v }; delete nv[key]; return nv; })}>Remove</button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mb-4">
              <input value={newVarKey} onChange={e => setNewVarKey(e.target.value)} placeholder="Key" className="bg-zinc-800 px-2 py-1 rounded w-1/3 text-xs" />
              <input value={newVarValue} onChange={e => setNewVarValue(e.target.value)} placeholder="Value" className="bg-zinc-800 px-2 py-1 rounded w-2/3 text-xs" />
              <button className="text-blue-400 text-xs" onClick={() => {
                if (newVarKey) {
                  setEnvVars(v => ({ ...v, [newVarKey]: newVarValue }));
                  setNewVarKey("");
                  setNewVarValue("");
                }
              }}>Add Variable</button>
            </div>
            <div className="flex gap-2 justify-end">
              <button className="bg-zinc-700 px-3 py-1 rounded" onClick={() => setShowEnvModal(false)}>Cancel</button>
              <button className="bg-blue-600 px-3 py-1 rounded" onClick={saveEnvVars}>Save Variables</button>
            </div>
          </div>
        </div>
      )}

      {!showHistoryPreview && (
        <div className="text-xs text-gray-400 cursor-pointer" onClick={() => setShowHistoryPreview(true)}>
          Show History Preview
        </div>
      )}
    </div>
  );
}
