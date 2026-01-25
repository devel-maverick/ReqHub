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
    <div className="w-72 border-r border-gray-800 bg-black p-3 overflow-y-auto">
      <div className="flex gap-2 mb-3 bg-gray-900 p-1 rounded-lg">
        <button
          className={`flex-1 py-1 rounded-md text-sm font-medium transition-colors ${activeTab === "history" ? "bg-black text-white shadow-sm" : "text-gray-500 hover:text-gray-300"}`}
          onClick={() => setActiveTab("history")}
        >History</button>
        <button
          className={`flex-1 py-1 rounded-md text-sm font-medium transition-colors ${activeTab === "saved" ? "bg-black text-white shadow-sm" : "text-gray-500 hover:text-gray-300"}`}
          onClick={() => setActiveTab("saved")}
        >Saved</button>
      </div>

      {activeTab === "history" && (
        <>
          <input
            value={searchHistory}
            onChange={e => setSearchHistory(e.target.value)}
            placeholder="Search history..."
            className="w-full mb-3 bg-black border border-gray-800 focus:border-gray-700 text-sm p-2 rounded outline-none transition-colors"
          />
          {filteredHistory.length === 0 && <div className="text-xs text-gray-500 p-2">No history found.</div>}
          {filteredHistory.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                const proto = item.method === "WS" ? "WebSocket" : "HTTP";
                setProtocol && setProtocol(proto);
                setActiveRequest(item);
              }}
              className="p-2 mb-1 rounded cursor-pointer hover:bg-gray-900 flex items-center group relative border border-transparent hover:border-gray-800 transition-all"
            >
              <div className="text-xs font-mono text-blue-500 font-bold mr-2 min-w-[40px]">{item.method}</div>
              <div className="text-sm text-gray-300 truncate flex-1 font-mono" title={item.url}>{item.url}</div>
              <button
                className="mr-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity z-10"
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
                  size={14}
                  className={item.isStarred ? "fill-white text-white cursor-pointer" : "text-gray-600 hover:text-gray-400 cursor-pointer"}
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
            className="w-full mb-3 bg-black border border-gray-800 focus:border-gray-700 text-sm p-2 rounded outline-none transition-colors"
          />
          {filteredSaved.length === 0 && <div className="text-xs text-gray-500 p-2">No saved requests.</div>}
          {filteredSaved.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setProtocol && setProtocol("HTTP");
                setActiveRequest(item);
              }}
              className="p-2 mb-1 rounded cursor-pointer hover:bg-gray-900 flex items-center group relative border border-transparent hover:border-gray-800 transition-all"
            >
              <div className="text-xs font-mono text-blue-500 font-bold mr-2 min-w-[40px]">{item.method}</div>
              <div className="text-sm text-gray-300 truncate flex-1 font-mono" title={item.url}>{item.url}</div>
              <button
                className="mr-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity z-10"
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
              <div className="ml-1"><Star size={14} className="fill-white text-white" /></div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}


