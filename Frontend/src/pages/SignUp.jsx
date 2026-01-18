// import { Link } from "react-router-dom";

// export default function SignUp() {
//   return (
//     <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center px-4">
//       <div className="w-full max-w-4xl bg-[#111118] rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-white/10">
        
//         {/* LEFT */}
//         <div className="p-8 bg-gradient-to-br from-[#141422] to-[#0f0f1a]">
//           <h2 className="text-xl font-semibold mb-4 text-white">
//             Why ReqHub?
//           </h2>

//           <ul className="space-y-3 text-gray-400 text-sm ">
//             <li>⚡ Test REST & WebSocket APIs</li>
//             <li>🕘 Save & replay request history</li>
//             <li>🔐 Secure auth & environments</li>
//             <li>🚀 Built for serious developers</li>
//           </ul>
//         </div>

//         {/* RIGHT */}
//         <div className="p-8">
//           <h1 className="text-2xl font-semibold mb-6 text-white">
//             Create ReqHub account
//           </h1>

//           <form className="space-y-4">
//             <input
//               placeholder="Name"
//               className="w-full px-4 py-2 rounded-lg bg-[#0b0b0f] border border-white/10 text-white placeholder-gray-500 outline-none focus:border-violet-500"
//             />

//             <input
//               placeholder="Email"
//               className="w-full px-4 py-2 rounded-lg bg-[#0b0b0f] border border-white/10 text-white placeholder-gray-500 outline-none focus:border-violet-500"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full px-4 py-2 rounded-lg bg-[#0b0b0f] border border-white/10 text-white placeholder-gray-500 outline-none focus:border-violet-500"
//             />

//             <button className="w-full bg-violet-600 hover:bg-violet-700 transition text-white py-2 rounded-lg font-medium">
//               Create Free Account
//             </button>
//           </form>

//           <div className="my-6 flex items-center text-sm text-gray-500">
//             <div className="flex-1 border-t border-white/10" />
//             <span className="px-3">or</span>
//             <div className="flex-1 border-t border-white/10" />
//           </div>

//           <button className="w-full border border-white/10 hover:border-white/20 py-2 rounded-lg mb-3 flex items-center justify-center gap-2 text-gray-300">
//             <img
//               src="https://www.svgrepo.com/show/475656/google-color.svg"
//               className="w-5"
//             />
//             Sign up with Google
//           </button>

//           <button className="w-full border border-white/10 hover:border-white/20 py-2 rounded-lg flex items-center justify-center gap-2 text-gray-300">
//             <img
//               src="https://www.svgrepo.com/show/475654/github-color.svg"
//               className="w-5"
//             />
//             Sign up with GitHub
//           </button>

//           <p className="mt-6 text-center text-sm text-gray-400">
//             Already have an account?{" "}
//             <Link
//               to="/signin"
//               className="text-violet-400 hover:underline"
//             >
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// // }
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function SignUp() {
  const navigate = useNavigate();
  const { signup, authError } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({ name, email, password });
    // navigate("/tester");
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-[#111118] rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-white/10">

        {/* LEFT */}
        <div className="p-8 bg-gradient-to-br from-[#141422] to-[#0f0f1a]">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Why ReqHub?
          </h2>

          <ul className="space-y-3 text-gray-400 text-sm">
            <li>⚡ Test REST & WebSocket APIs</li>
            <li>🕘 Save & replay request history</li>
            <li>🔐 Secure auth & environments</li>
            <li>🚀 Built for serious developers</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="p-8">
          <h1 className="text-2xl font-semibold mb-6 text-white">
            Create ReqHub account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg bg-[#0b0b0f] text-white placeholder-gray-500 outline-none border
                ${authError ? "border-red-500" : "border-white/10"}`}
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg bg-[#0b0b0f] text-white placeholder-gray-500 outline-none border
                ${authError ? "border-red-500" : "border-white/10"}`}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg bg-[#0b0b0f] text-white placeholder-gray-500 outline-none border
                ${authError ? "border-red-500" : "border-white/10"}`}
            />

            {authError && (
              <p className="text-sm text-red-400">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 transition text-white py-2 rounded-lg font-medium"
            >
              Create Free Account
            </button>
          </form>

          {/* DIVIDER */}
          <div className="my-6 flex items-center text-sm text-gray-500">
            <div className="flex-1 border-t border-white/10" />
            <span className="px-3">or</span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          {/* OAUTH */}
          <button
            onClick={() =>
              (window.location.href =
                "http://localhost:3000/api/auth/google")
            }
            className="w-full border border-white/10 hover:border-white/20 py-2 rounded-lg mb-3 flex items-center justify-center gap-2 text-gray-300"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5"
            />
            Sign up with Google
          </button>

          <button
            onClick={() =>
              (window.location.href =
                "http://localhost:3000/api/auth/github")
            }
            className="w-full border border-white/10 hover:border-white/20 py-2 rounded-lg flex items-center justify-center gap-2 text-gray-300"
          >
            <img
              src="https://www.svgrepo.com/show/475654/github-color.svg"
              className="w-5"
            />
            Sign up with GitHub
          </button>

          {/* FOOTER */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/signin" className="text-violet-400 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}