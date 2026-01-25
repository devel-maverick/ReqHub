import React, { useState, useEffect } from "react";
import { PanelLeftClose, X, Wifi, Plus } from "lucide-react";
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
  envVars,
  setEnvVars,
}) {

  const [savedRequests, setSavedRequests] = useState([]);
  const [showEnvModal, setShowEnvModal] = useState(false);

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
            <div className="bg-gray-800/50 hover:bg-gray-800 text-xs px-2 py-1 rounded border border-gray-800 cursor-pointer transition-colors" onClick={() => setShowHistoryPreview(false)}>
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
                  className={`flex items-center rounded mr-1 px-2 py-1 cursor-pointer transition-all duration-200 border-t border-x border-b border-transparent ${activeTab === tab.id ? "bg-black border-gray-800 border-b-black text-white" : "text-gray-500 hover:text-gray-300 hover:bg-gray-900/50"}`}
                  style={{ minWidth: tabWidth, maxWidth: tabWidth }}
                  onClick={() => switchTab(tab.id)}
                >
                  <span className="mr-2 text-xs font-mono text-blue-500 font-bold">{tabLabel}</span>
                  <span className="truncate text-xs" style={{ maxWidth: tabWidth - 40 }}>{tab.url || "New Request"}</span>
                  {tabs.length > 1 && (
                    <button className="ml-2 text-gray-600 hover:text-white" onClick={e => { e.stopPropagation(); closeTab(tab.id); }}>
                      <X size={14} />
                    </button>
                  )}
                </div>
              );
            })}
            <button className="text-gray-500 hover:text-white px-2 py-1 text-xs" onClick={addTab}>+</button>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="bg-black border border-gray-800 hover:bg-gray-900 text-xs px-3 py-1 rounded transition-colors" onClick={handleCopyAsCurl}>Copy as CURL</button>

          <button className="bg-black border border-gray-800 hover:bg-gray-900 text-xs px-3 py-1 rounded transition-colors" onClick={() => setShowEnvModal(true)}>Env</button>
          <button onClick={toggleHistory} className="bg-black border border-gray-800 hover:bg-gray-900 p-2 rounded transition-colors">
            <PanelLeftClose size={16} />
          </button>
        </div>
      </div>

      <div className="flex gap-2">

        <select
          value={protocol}
          onChange={handleProtocolChange}
          className="bg-black border border-gray-800 hover:border-gray-700 px-2 rounded text-sm focus:outline-none focus:border-gray-600 transition-colors"
        >
          <option value="HTTP">HTTP</option>
          <option value="WebSocket">WS</option>
        </select>

        {protocol === "HTTP" && (
          <select
            value={request.method}
            onChange={(e) => updateRequest("method", e.target.value)}
            className="bg-black border border-gray-800 hover:border-gray-700 px-2 rounded text-sm font-mono focus:outline-none focus:border-gray-600 transition-colors"
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
          className="flex-1 bg-black border border-gray-800 hover:border-gray-700 focus:border-gray-600 px-3 py-1 rounded text-sm font-mono focus:outline-none transition-colors"
        />

        <button
          onClick={protocol === "WebSocket" ? onConnect : onSend}
          className="bg-white text-black border border-white hover:bg-gray-200 px-5 py-1 rounded text-sm font-medium transition-colors"
        >
          {protocol === "WebSocket"
            ? isWsConnected
              ? "Disconnect"
              : "Connect"
            : "Send"}
        </button>
      </div>


      {showEnvModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#050505] border border-gray-800 rounded-xl shadow-2xl p-6 w-[500px] relative">
            <button className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors" onClick={() => setShowEnvModal(false)}><X size={20} /></button>
            <div className="font-bold text-xl text-white mb-6">Environment Variables</div>

            <div className="text-sm mb-6 bg-[#111118] border border-gray-800/50 p-4 rounded-lg text-gray-400 leading-relaxed">
              Use environment variables in your requests with the syntax <span className="bg-[#1A1A22] border border-gray-700/50 px-1.5 py-0.5 rounded font-mono text-gray-300 mx-1">{"{{VARIABLE_NAME}}"}</span><br />
              Example: <span className="bg-[#1A1A22] border border-gray-700/50 px-1.5 py-0.5 rounded font-mono text-gray-300 mt-2 inline-block">{"{{BASE_URL}}"}</span><span className="font-mono text-gray-500">/api/users</span>
            </div>

            <div className="mb-6 space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {Object.entries(envVars).map(([key, value]) => (
                <div key={key} className="flex items-center gap-3">
                  <div className="bg-[#111] border border-gray-800 px-3 py-2 rounded-md w-1/3 text-xs font-mono text-gray-400 truncate" title={key}>{key}</div>
                  <input value={value} onChange={e => setEnvVars(v => ({ ...v, [key]: e.target.value }))} className="bg-black border border-gray-800 focus:border-gray-600 px-3 py-2 rounded-md w-2/3 text-xs font-mono text-white focus:outline-none transition-colors" />
                  <button className="text-gray-500 hover:text-red-500 p-1" onClick={() => setEnvVars(v => { const nv = { ...v }; delete nv[key]; return nv; })}>
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mb-8 items-center">
              <input value={newVarKey} onChange={e => setNewVarKey(e.target.value)} placeholder="Key" className="bg-black border border-gray-800 focus:border-gray-600 px-3 py-2 rounded-md w-1/3 text-xs font-mono text-white focus:outline-none transition-colors" />
              <input value={newVarValue} onChange={e => setNewVarValue(e.target.value)} placeholder="Value" className="bg-black border border-gray-800 focus:border-gray-600 px-3 py-2 rounded-md w-2/3 text-xs font-mono text-white focus:outline-none transition-colors" />
              <button
                className="bg-white text-black hover:bg-gray-200 p-2 rounded-md transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newVarKey}
                onClick={() => {
                  if (newVarKey) {
                    setEnvVars(v => ({ ...v, [newVarKey]: newVarValue }));
                    setNewVarKey("");
                    setNewVarValue("");
                  }
                }}
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="flex gap-4 justify-end items-center">
              <button className="text-gray-400 hover:text-white text-sm font-medium transition-colors" onClick={() => setShowEnvModal(false)}>Cancel</button>
              <button className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-md text-sm font-bold transition-colors" onClick={saveEnvVars}>Save</button>
            </div>
          </div>
        </div>
      )}

      {!showHistoryPreview && (
        <div className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer flex justify-center py-1" onClick={() => setShowHistoryPreview(true)}>
          Show History Preview
        </div>
      )}
    </div>
  );
}
