import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
const API_URL = import.meta.env.VITE_API_URL;
export default function SignIn() {
  const navigate = useNavigate();
  const { login, authError } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
    // navigate("/tester");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black rounded-lg shadow-2xl p-8 border border-gray-800">

        <div className="text-center mb-8">
          <img
            src="/reqhub-logo.png"
            alt="ReqHub logo"
            className="w-10 h-10 mx-auto mb-4 rounded-lg"
          />
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Sign in to ReqHub
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Welcome back, developer
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full mt-1 px-4 py-2 rounded-md bg-black text-white placeholder-gray-600 outline-none border transition-colors
                ${authError ? "border-red-500 focus:border-red-500" : "border-gray-800 focus:border-white"}`}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full mt-1 px-4 py-2 rounded-md bg-black text-white placeholder-gray-600 outline-none border transition-colors
                ${authError ? "border-red-500 focus:border-red-500" : "border-gray-800 focus:border-white"}`}
            />
          </div>

          {authError && (
            <p className="text-sm text-red-400">{authError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-white hover:bg-gray-200 transition text-black py-2 rounded-md font-medium"
          >
            Sign In
          </button>
        </form>

        {/* DIVIDER */}
        <div className="my-6 flex items-center text-sm text-gray-500">
          <div className="flex-1 border-t border-gray-800" />
          <span className="px-3">or</span>
          <div className="flex-1 border-t border-gray-800" />
        </div>

        {/* OAUTH */}
        <div className="space-y-3">
          <button
            onClick={() =>
            (window.location.href =
              `${API_URL}/api/auth/google`)
            }
            className="w-full border border-gray-800 hover:border-gray-600 hover:bg-gray-900 transition-all py-2 rounded-md flex items-center justify-center gap-2 text-gray-300"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5"
            />
            Continue with Google
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
            Continue with GitHub
          </button>
        </div>

        {/* FOOTER */}
        <p className="mt-8 text-center text-sm text-gray-500">
          New to ReqHub?{" "}
          <Link to="/signup" className="text-white hover:underline decoration-gray-500">
            Create free account
          </Link>
        </p>
      </div>
    </div>
  );
}
