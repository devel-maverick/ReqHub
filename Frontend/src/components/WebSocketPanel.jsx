import React, { useState } from "react";

export default function WebSocketPanel({
  url,
  status,
  messages,
  onSendMessage,
}) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  const statusLabel =
    status === "connected"
      ? "connected"
      : status === "connecting"
      ? "connecting"
      : "disconnected";

  const statusColor =
    status === "connected"
      ? "bg-emerald-400"
      : status === "connecting"
      ? "bg-yellow-400"
      : "bg-zinc-500";

  return (
    <div className="flex flex-col h-full bg-black">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900">
        <div>
          <p className="text-xs text-zinc-400">Message Log</p>
          <p className="text-sm text-zinc-500 truncate max-w-md">
            {url || "No WebSocket URL set"}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span
            className={`inline-block w-2 h-2 rounded-full ${statusColor}`}
          />
          <span>{statusLabel}</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 py-6 text-sm text-zinc-300">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-zinc-600 text-xs">
            No messages yet. Connect to a WebSocket server to start.
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.type === "out"
                    ? "justify-end"
                    : m.type === "in"
                    ? "justify-start"
                    : "justify-center"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-3 py-2 text-xs whitespace-pre-wrap ${
                    m.type === "out"
                      ? "bg-purple-600/80 text-white"
                      : m.type === "in"
                      ? "bg-zinc-900 border border-zinc-800 text-zinc-100"
                      : "bg-transparent text-zinc-500 text-[11px]"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-zinc-900 px-4 py-3 flex items-center gap-2 bg-zinc-950/80">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Message..."
          className="flex-1 bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
          disabled={status !== "connected"}
        />
        <button
          onClick={handleSend}
          disabled={status !== "connected"}
          className="px-4 py-2 rounded-lg bg-purple-600 disabled:bg-zinc-700 text-sm font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
}
