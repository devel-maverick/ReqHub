// import { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import axiosInstance from "../api/axios";

// export default function Tester() {
//   const { authUser } = useAuthStore();

//   const [method, setMethod] = useState("GET");
//   const [url, setUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);

//   const sendRequest = async () => {
//     if (!url) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axiosInstance.post("/request", {
//         method,
//         url,
//       });

//       setResponse(res.data);
//     } catch (err) {
//       setError(err?.response?.data?.message || "Request failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen bg-[#0b0b0f] text-white p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-xl font-semibold">ReqHub Tester</h1>
//         <p className="text-sm text-gray-400">
//           Logged in as {authUser.email}
//         </p>
//       </div>

//       {/* Request Bar */}
//       <div className="flex gap-2 mb-6">
//         <select
//           value={method}
//           onChange={(e) => setMethod(e.target.value)}
//           className="bg-[#111118] border border-white/10 rounded px-3 py-2"
//         >
//           <option>GET</option>
//           <option>POST</option>
//           <option>PUT</option>
//           <option>PATCH</option>
//           <option>DELETE</option>
//         </select>

//         <input
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           placeholder="https://api.github.com/users/octocat"
//           className="flex-1 bg-[#111118] border border-white/10 rounded px-3 py-2 outline-none"
//         />

//         <button
//           onClick={sendRequest}
//           disabled={loading}
//           className="bg-violet-600 hover:bg-violet-700 disabled:opacity-60 px-4 rounded"
//         >
//           {loading ? "Sending..." : "Send"}
//         </button>
//       </div>

//       {/* Response */}
//       {response && (
//         <div className="bg-[#111118] border border-white/10 rounded p-4 text-sm overflow-auto max-h-[60vh]">
//           <div className="mb-2 text-gray-400">
//             Status: {response.status}
//           </div>

//           <pre className="whitespace-pre-wrap">
//             {JSON.stringify(response.body, null, 2)}
//           </pre>
//         </div>
//       )}

//       {error && (
//         <div className="text-red-400 mt-4 text-sm">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// }
export default function Tester() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center">
      <h1 className="text-3xl font-semibold">
        🚀 ReqHub Tester Dashboard
      </h1>
    </div>
  );
}
