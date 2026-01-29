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
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-black rounded-lg shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-gray-800">

        {/* LEFT */}
        <div className="p-8 bg-black border-r border-gray-800 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">
            Why ReqHub?
          </h2>

          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-center gap-2"><span className="text-white">⚡</span> Test REST & WebSocket APIs</li>
            <li className="flex items-center gap-2"><span className="text-white">🕘</span> Save & replay request history</li>
            <li className="flex items-center gap-2"><span className="text-white">🔐</span> Secure auth & environments</li>
            <li className="flex items-center gap-2"><span className="text-white">🚀</span> Built for serious developers</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="p-8 bg-black">
          <h1 className="text-2xl font-bold mb-6 text-white tracking-tight">
            Create ReqHub account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 rounded-md bg-black text-white placeholder-gray-600 outline-none border transition-colors
                ${authError ? "border-red-500 focus:border-red-500" : "border-gray-800 focus:border-white"}`}
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 rounded-md bg-black text-white placeholder-gray-600 outline-none border transition-colors
                ${authError ? "border-red-500 focus:border-red-500" : "border-gray-800 focus:border-white"}`}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 rounded-md bg-black text-white placeholder-gray-600 outline-none border transition-colors
                ${authError ? "border-red-500 focus:border-red-500" : "border-gray-800 focus:border-white"}`}
            />

            {authError && (
              <p className="text-sm text-red-400">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-white hover:bg-gray-200 transition text-black py-2 rounded-md font-medium"
            >
              Create Free Account
            </button>
          </form>

          {/* DIVIDER */}
          <div className="my-6 flex items-center text-sm text-gray-500">
            <div className="flex-1 border-t border-gray-800" />
            <span className="px-3">or</span>
            <div className="flex-1 border-t border-gray-800" />
          </div>

          {/* OAUTH */}
          <button
            onClick={() =>
            (window.location.href =
              `${API_URL}/api/auth/google`)
            }
            className="w-full border border-gray-800 hover:border-gray-600 hover:bg-gray-900 transition-all py-2 rounded-md mb-3 flex items-center justify-center gap-2 text-gray-300"
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
              `${API_URL}/api/auth/github`)
            }
            className="w-full border border-gray-800 hover:border-gray-600 hover:bg-gray-900 transition-all py-2 rounded-md flex items-center justify-center gap-2 text-gray-300"
          >
            <img
              src="https://www.svgrepo.com/show/475654/github-color.svg"
              className="w-5 bg-white rounded-full p-0.5"
            />
            Sign up with GitHub
          </button>

          {/* FOOTER */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/signin" className="text-white hover:underline decoration-gray-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}