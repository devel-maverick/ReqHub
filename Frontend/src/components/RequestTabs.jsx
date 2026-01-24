
import { useState } from "react";
import axiosInstance from "../api/axios";

export default function RequestTabs({ request, setRequest }) {
  const [tab, setTab] = useState("params");

  const updateArray = (field, i, key, value) => {
    const copy = [...request[field]];
    copy[i][key] = value;
    setRequest({ ...request, [field]: copy });
  };
  const addPair = (field) => {
    const copy = Array.isArray(request[field]) ? [...request[field]] : [];
    copy.push({ key: "", value: "" });
    setRequest({ ...request, [field]: copy });
  };

  const params = Array.isArray(request.params) ? request.params : [];
  const headers = Array.isArray(request.headers) ? request.headers : [];
  const auth = Array.isArray(request.auth) ? request.auth : [];

  return (
    <div className="border-b border-gray-800 p-2">
      <div className="flex gap-4 mb-2">
        {["params", "headers", "auth", "body"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={tab === t ? "text-purple-400" : "text-gray-400"}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {tab === "params" && (
        <>
          {params.map((p, i) => (
            <div key={i} className="flex gap-2 mb-2 group items-center">
              <input
                value={p.key}
                onChange={e => updateArray("params", i, "key", e.target.value)}
                placeholder="Key"
                className="bg-gray-900 border border-gray-700 p-1 rounded w-1/2"
              />
              <input
                value={p.value}
                onChange={e => updateArray("params", i, "value", e.target.value)}
                placeholder="Value"
                className="bg-gray-900 border border-gray-700 p-1 rounded w-1/2"
              />
              <button
                className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                title="Remove"
                onClick={() => {
                  const copy = [...params];
                  copy.splice(i, 1);
                  setRequest({ ...request, params: copy });
                }}
              >
                ×
              </button>
            </div>
          ))}
          <button className="bg-gray-700 px-2 py-1 rounded text-xs" onClick={() => addPair("params")}>+ Add Param</button>
        </>
      )}

      {tab === "headers" && (
        <>
          {headers.map((h, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                value={h.key}
                onChange={e => updateArray("headers", i, "key", e.target.value)}
                placeholder="Key"
                className="bg-gray-900 border border-gray-700 p-1 rounded w-1/2"
              />
              <input
                value={h.value}
                onChange={e => updateArray("headers", i, "value", e.target.value)}
                placeholder="Value"
                className="bg-gray-900 border border-gray-700 p-1 rounded w-1/2"
              />
            </div>
          ))}
          <button className="bg-gray-700 px-2 py-1 rounded text-xs" onClick={() => addPair("headers")}>+ Add Header</button>
        </>
      )}

      {tab === "auth" && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs mb-1 text-gray-400">Auth Type</label>
            <select
              className="bg-gray-900 border border-gray-700 p-2 rounded w-full text-white"
              value={request.authType || "none"}
              onChange={e => setRequest({ ...request, authType: e.target.value, authData: {} })}
            >
              <option value="none">No Auth</option>
              <option value="basic">Basic Auth</option>
              <option value="bearer">Bearer Token</option>
              <option value="jwt">JWT Bearer</option>
              <option value="digest">Digest Auth</option>
              <option value="oauth1">OAuth 1.0</option>
              <option value="oauth2">OAuth 2.0</option>
              <option value="apiKey">API Key</option>
            </select>
          </div>
          {request.authType === "bearer" && (
            <div>
              <label className="block text-xs mb-1 text-gray-400">Token</label>
              <input
                type="text"
                className="bg-gray-900 border border-gray-700 p-2 rounded w-full text-white"
                placeholder="Token"
                value={request.authData?.token || ""}
                onChange={e => setRequest({ ...request, authData: { ...request.authData, token: e.target.value } })}
              />
            </div>
          )}
          {request.authType === "basic" && (
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs mb-1 text-gray-400">Username</label>
                <input
                  type="text"
                  className="bg-gray-900 border border-gray-700 p-2 rounded w-full text-white"
                  placeholder="Username"
                  value={request.authData?.username || ""}
                  onChange={e => setRequest({ ...request, authData: { ...request.authData, username: e.target.value } })}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs mb-1 text-gray-400">Password</label>
                <input
                  type="password"
                  className="bg-gray-900 border border-gray-700 p-2 rounded w-full text-white"
                  placeholder="Password"
                  value={request.authData?.password || ""}
                  onChange={e => setRequest({ ...request, authData: { ...request.authData, password: e.target.value } })}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "body" && (
        <textarea
          value={request.body}
          onChange={e => setRequest({ ...request, body: e.target.value })}
          placeholder="JSON Body"
          className="w-full h-32 bg-gray-900 border border-gray-700 p-2 rounded"
        />
      )}
    </div>
  );
}
