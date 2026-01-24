import React, { useState } from "react";

function prettyJsonWithLines(json) {
  const str = typeof json === "string" ? json : JSON.stringify(json, null, 2);
  return str.split("\n").map((line, i) => (
    <div key={i} className="flex">
      <span className="text-gray-600 select-none w-8 text-right mr-2">{i + 1}</span>
      <span className="whitespace-pre-wrap">{line}</span>
    </div>
  ));
}

export default function ResponsePanel({ response, meta }) {
  const [tab, setTab] = useState("body");

  if (!response)
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Ready to Send
      </div>
    );

  const headers = meta?.headers || {};
  const cookies = headers["set-cookie"] ? (Array.isArray(headers["set-cookie"]) ? headers["set-cookie"] : [headers["set-cookie"]]) : [];

  const statusText = meta?.status ?? "";
  const timeText = meta?.time != null ? `${meta.time} ms` : "";
  const sizeText = meta?.size ?? "";

  return (
    <div className="flex-1 p-3 overflow-auto">
      <div className="flex gap-4 mb-2 text-sm">
        {statusText !== "" && (
          <span className="text-green-400">{statusText}</span>
        )}
        {timeText !== "" && <span>{timeText}</span>}
        {sizeText !== "" && <span>{sizeText}</span>}
      </div>
      <div className="flex gap-4 mb-4 border-b border-zinc-800">
        <button className={`px-3 py-1 ${tab === "body" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400"}`} onClick={() => setTab("body")}>Body</button>
        <button className={`px-3 py-1 ${tab === "headers" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400"}`} onClick={() => setTab("headers")}>Headers</button>
        <button className={`px-3 py-1 ${tab === "cookies" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400"}`} onClick={() => setTab("cookies")}>Cookies</button>
      </div>
      {tab === "body" && (
        <div className="bg-gray-900 p-3 rounded text-green-400 text-sm overflow-auto">
          {prettyJsonWithLines(response)}
        </div>
      )}
      {tab === "headers" && (
        <div className="bg-gray-900 p-3 rounded text-xs overflow-auto">
          {Object.entries(headers).map(([k, v], i) => (
            <div key={i} className="flex gap-2 border-b border-zinc-800 py-1">
              <span className="text-gray-400 w-40">{k}</span>
              <span className="text-white flex-1">{typeof v === "string" ? v : JSON.stringify(v)}</span>
            </div>
          ))}
        </div>
      )}
      {tab === "cookies" && (
        <div className="bg-gray-900 p-3 rounded text-xs overflow-auto">
          {cookies.length === 0 ? (
            <span className="text-gray-400">No cookies</span>
          ) : (
            cookies.map((c, i) => (
              <div key={i} className="border-b border-zinc-800 py-1 text-white">{c}</div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

