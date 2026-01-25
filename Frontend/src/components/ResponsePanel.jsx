import React, { useState } from "react";

function prettyJsonWithLines(json) {
  const str = typeof json === "string" ? json : JSON.stringify(json, null, 2);

  // Basic tokenization for syntax highlighting
  const highlightLine = (line) => {
    // Match "key": ...
    const keyMatch = line.match(/^(\s*)(".*?")(: )/);
    if (keyMatch) {
      const indent = keyMatch[1];
      const key = keyMatch[2];
      const colon = keyMatch[3];
      let value = line.substring(keyMatch[0].length);
      let comma = "";

      if (value.endsWith(",")) {
        comma = ",";
        value = value.slice(0, -1);
      }

      let valueSpan;
      if (value.startsWith('"')) {
        valueSpan = <span className="text-green-400">{value}</span>;
      } else if (value.match(/true|false/)) {
        valueSpan = <span className="text-purple-400">{value}</span>;
      } else if (value.match(/^[0-9.]+$/)) {
        valueSpan = <span className="text-blue-400">{value}</span>;
      } else {
        valueSpan = <span className="text-white">{value}</span>;
      }

      return (
        <>
          {indent}
          <span className="text-yellow-500">{key}</span>
          {colon}
          {valueSpan}
          <span className="text-white">{comma}</span>
        </>
      );
    }

    // Match string values in array (e.g. "value",)
    const stringMatch = line.match(/^(\s*)(".*?")(,?)$/);
    if (stringMatch) {
      return (
        <>
          {stringMatch[1]}
          <span className="text-green-400">{stringMatch[2]}</span>
          <span className="text-white">{stringMatch[3]}</span>
        </>
      );
    }

    // Default (braces, brackets)
    return <span className="text-white">{line}</span>;
  };

  return str.split("\n").map((line, i) => (
    <div key={i} className="flex">
      <span className="text-gray-600 select-none w-8 text-right mr-2 font-mono text-xs opacity-50">{i + 1}</span>
      <span className="whitespace-pre-wrap font-mono text-sm">{highlightLine(line)}</span>
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

  const statusText = meta?.status ? `Status: ${meta.status}` : "";
  const timeText = meta?.time ? `Time: ${meta.time}ms` : "";
  const sizeText = meta?.size ? `Size: ${meta.size}` : "";

  return (
    <div className="flex-1 p-3 overflow-auto flex flex-col h-full">
      <div className="flex gap-6 mb-3 text-sm font-mono border-b border-gray-800 pb-2">
        {statusText && (
          <span className="text-green-500 font-bold">{statusText}</span>
        )}
        {timeText && <span className="text-gray-500">{timeText}</span>}
        {sizeText && <span className="text-gray-500">{sizeText}</span>}
      </div>
      <div className="flex gap-4 mb-2">
        <button className={`px-3 py-1 text-xs font-medium transition-colors ${tab === "body" ? "text-white border-b border-white" : "text-gray-500 hover:text-gray-300"}`} onClick={() => setTab("body")}>Body</button>
        <button className={`px-3 py-1 text-xs font-medium transition-colors ${tab === "headers" ? "text-white border-b border-white" : "text-gray-500 hover:text-gray-300"}`} onClick={() => setTab("headers")}>Headers</button>
        <button className={`px-3 py-1 text-xs font-medium transition-colors ${tab === "cookies" ? "text-white border-b border-white" : "text-gray-500 hover:text-gray-300"}`} onClick={() => setTab("cookies")}>Cookies</button>
      </div>

      <div className="flex-1 bg-[#050505] border border-gray-800 rounded-md p-4 overflow-auto relative group">
        {tab === "body" && (
          prettyJsonWithLines(response)
        )}
        {tab === "headers" && (
          <div className="text-xs font-mono grid grid-cols-[minmax(150px,auto)_1fr] gap-x-4">
            {Object.entries(headers).map(([k, v], i) => (
              <React.Fragment key={i}>
                <div className="py-2 border-b border-gray-800 text-yellow-500 font-semibold">{k}</div>
                <div className="py-2 border-b border-gray-800 text-green-400 break-all">{typeof v === "string" ? v : JSON.stringify(v)}</div>
              </React.Fragment>
            ))}
          </div>
        )}
        {tab === "cookies" && (
          <div className="text-xs font-mono text-gray-300">
            {cookies.length === 0 ? "No cookies" : cookies.map((c, i) => <div key={i} className="py-1 border-b border-gray-800">{c}</div>)}
          </div>
        )}
      </div>
    </div>
  );
}
