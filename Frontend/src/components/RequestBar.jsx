import React, { useState, useEffect } from "react";
import { PanelLeftClose, X } from "lucide-react";

export default function RequestBar({
  request,
  setRequest,
  onSend,
  toggleHistory,
}) {

  const [savedRequests, setSavedRequests] = useState([]);
  const [tabs, setTabs] = useState([
    { id: 1, method: "GET", url: "" }
  ]);
  const [activeTab, setActiveTab] = useState(1);

  const [showHistoryPreview, setShowHistoryPreview] = useState(false);


  const addTab = () => {
    const newId = tabs.length ? Math.max(...tabs.map(t => t.id)) + 1 : 1;
    const active = tabs.find(t => t.id === activeTab);
    const baseMethod = active?.method || "GET";
    setTabs([
      ...tabs,
      { id: newId, method: baseMethod, url: "" },
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



  const tabWidth = Math.max(120, 220 - tabs.length * 15);

  useEffect(() => {
    const tab = tabs.find(t => t.id === activeTab);
    if (tab) {
      setRequest({ method: tab.method, url: tab.url });
    }
  }, [activeTab, tabs]);


  const handleCopyAsCurl = () => {
    let curl = `curl -X ${request.method}`;
    curl += ` "${request.url}"`;
    if (request.headers && Array.isArray(request.headers)) {
      request.headers.forEach(h => {
        if (h.key && h.value) curl += ` -H "${h.key}: ${h.value}"`;
      });
    }
    if (request.body && request.body.trim()) {
      curl += ` -d '${request.body}'`;
    }
    navigator.clipboard.writeText(curl);
    alert("cURL command copied to clipboard!");
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
              return (
                <div
                  key={tab.id}
                  className={`flex items-center rounded mr-1 px-2 py-1 cursor-pointer transition-all duration-200 border-t border-x border-b border-transparent ${activeTab === tab.id ? "bg-black border-gray-800 border-b-black text-white" : "text-gray-500 hover:text-gray-300 hover:bg-gray-900/50"}`}
                  style={{ minWidth: tabWidth, maxWidth: tabWidth }}
                  onClick={() => switchTab(tab.id)}
                >
                  <span className="mr-2 text-xs font-mono text-blue-500 font-bold">{tab.method}</span>
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
          <button onClick={toggleHistory} className="bg-black border border-gray-800 hover:bg-gray-900 p-2 rounded transition-colors">
            <PanelLeftClose size={16} />
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <select
          value={request.method}
          onChange={(e) => updateRequest("method", e.target.value)}
          className="bg-black border border-gray-800 hover:border-gray-700 px-2 rounded text-sm font-mono focus:outline-none focus:border-gray-600 transition-colors"
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
          <option>PATCH</option>
        </select>

        <input
          value={request.url}
          onChange={e => updateRequest("url", e.target.value)}
          placeholder="Enter request URL"
          className="flex-1 bg-black border border-gray-800 hover:border-gray-700 focus:border-gray-600 px-3 py-1 rounded text-sm font-mono focus:outline-none transition-colors"
        />

        <button
          onClick={onSend}
          className="bg-white text-black border border-white hover:bg-gray-200 px-5 py-1 rounded text-sm font-medium transition-colors"
        >
          Send
        </button>
      </div>


      {!showHistoryPreview && (
        <div className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer flex justify-center py-1" onClick={() => setShowHistoryPreview(true)}>
          Show History Preview
        </div>
      )}
    </div>
  );
}
