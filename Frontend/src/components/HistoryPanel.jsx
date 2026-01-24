import React, { useState, useEffect } from "react";
import { Star, X } from "lucide-react";
import axiosInstance from "../api/axios";

export default function HistoryPanel({ setActiveRequest, setProtocol, reloadKey }) {
  const [activeTab, setActiveTab] = useState("history");
  const [searchHistory, setSearchHistory] = useState("");
  const [searchSaved, setSearchSaved] = useState("");
  const [historyList, setHistoryList] = useState([]);
  const [savedList, setSavedList] = useState([]);

  const loadLists = async () => {
    try {
      const [historyRes, savedRes] = await Promise.all([
        axiosInstance.get("/history"),
        axiosInstance.get("/star"),
      ]);
      setHistoryList(historyRes.data || []);
      setSavedList(savedRes.data || []);
    } catch {
      setHistoryList([]);
      setSavedList([]);
    }
  };

  useEffect(() => {
    loadLists();
  }, [reloadKey]);

    const filteredHistory = historyList.filter(item =>
      item.url?.toLowerCase().includes(searchHistory.toLowerCase()) ||
      item.method?.toLowerCase().includes(searchHistory.toLowerCase())
    );
    const filteredSaved = savedList.filter(item =>
      item.url?.toLowerCase().includes(searchSaved.toLowerCase()) ||
      item.method?.toLowerCase().includes(searchSaved.toLowerCase())
    );

  return (
    <div className="w-72 border-r border-gray-800 p-3 overflow-y-auto">
      <div className="flex gap-2 mb-3">
        <button
          className={`flex-1 py-1 rounded ${activeTab === "history" ? "bg-gray-700 text-purple-400" : "bg-gray-900 text-gray-400"}`}
          onClick={() => setActiveTab("history")}
        >History</button>
        <button
          className={`flex-1 py-1 rounded ${activeTab === "saved" ? "bg-gray-700 text-purple-400" : "bg-gray-900 text-gray-400"}`}
          onClick={() => setActiveTab("saved")}
        >Saved</button>
      </div>

      {activeTab === "history" && (
        <>
          <input
            value={searchHistory}
            onChange={e => setSearchHistory(e.target.value)}
            placeholder="Search history..."
            className="w-full mb-2 bg-gray-900 border border-gray-700 p-1 rounded"
          />
          {filteredHistory.length === 0 && <div className="text-xs text-gray-500">No history found.</div>}
          {filteredHistory.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                const proto = item.method === "WS" ? "WebSocket" : "HTTP";
                setProtocol && setProtocol(proto);
                setActiveRequest(item);
              }}
              className="p-2 mb-1 bg-gray-900 rounded cursor-pointer hover:bg-gray-800 flex items-center group relative"
            >
              <div className="text-xs text-purple-400 mr-2 min-w-[40px]">{item.method}</div>
              <div className="text-sm truncate flex-1" title={item.url}>{item.url}</div>
              <button
                className="mr-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                title="Remove"
                onClick={async e => {
                  e.stopPropagation();
                  try {
                    await axiosInstance.delete(`/history/${item.id}`);
                    await loadLists();
                  } catch {
                    alert("Failed to delete history item");
                  }
                }}
              >
                <X size={14} />
              </button>
              <div className="ml-2">
                <Star
                  size={16}
                  className={item.isStarred ? "text-yellow-400 cursor-pointer" : "text-gray-400 cursor-pointer"}
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      await axiosInstance.patch(`/star/star/${item.id}`);
                      axiosInstance.get("/history").then(res => setHistoryList(res.data)).catch(() => setHistoryList([]));
                      axiosInstance.get("/star").then(res => setSavedList(res.data)).catch(() => setSavedList([]));
                    } catch (err) {
                      alert("Failed to toggle star");
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </>
      )}

      {activeTab === "saved" && (
        <>
          <input
            value={searchSaved}
            onChange={e => setSearchSaved(e.target.value)}
            placeholder="Search saved..."
            className="w-full mb-2 bg-gray-900 border border-gray-700 p-1 rounded"
          />
          {filteredSaved.length === 0 && <div className="text-xs text-gray-500">No saved requests.</div>}
          {filteredSaved.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setProtocol && setProtocol("HTTP");
                setActiveRequest(item);
              }}
              className="p-2 mb-1 bg-gray-900 rounded cursor-pointer hover:bg-gray-800 flex items-center group relative"
            >
              <div className="text-xs text-purple-400 mr-2 min-w-[40px]">{item.method}</div>
              <div className="text-sm truncate flex-1" title={item.url}>{item.url}</div>
              <button
                className="mr-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                title="Remove"
                onClick={async e => {
                  e.stopPropagation();
                  try {
                    await axiosInstance.delete(`/history/${item.id}`);
                    await loadLists();
                  } catch {
                    alert("Failed to delete saved item");
                  }
                }}
              >
                <X size={14} />
              </button>
              <div className="ml-1"><Star size={16} className="text-yellow-400" /></div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}


