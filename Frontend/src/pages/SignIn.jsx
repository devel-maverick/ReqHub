import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

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
    <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111118] rounded-2xl shadow-xl p-8 border border-white/10">

        <div className="text-center mb-6">
          <img
            src="/reqhub-logo.png"
            alt="ReqHub logo"
            className="w-10 h-10 mx-auto mb-2 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          />
          <h1 className="text-2xl font-semibold text-white">
            Sign in to ReqHub
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Welcome back, developer
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full mt-1 px-4 py-2 rounded-lg bg-[#0b0b0f] text-white placeholder-gray-500 outline-none border 
                ${authError ? "border-red-500" : "border-white/10"}`}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full mt-1 px-4 py-2 rounded-lg bg-[#0b0b0f] text-white placeholder-gray-500 outline-none border 
                ${authError ? "border-red-500" : "border-white/10"}`}
            />
          </div>

          {authError && (
            <p className="text-sm text-red-400">{authError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 transition text-white py-2 rounded-lg font-medium"
          >
            Sign In
          </button>
        </form>

        {/* DIVIDER */}
        <div className="my-6 flex items-center text-sm text-gray-500">
          <div className="flex-1 border-t border-white/10" />
          <span className="px-3">or</span>
          <div className="flex-1 border-t border-white/10" />
        </div>

        {/* OAUTH */}
        <div className="space-y-3">
          <button
            onClick={() =>
              (window.location.href =
                "http://localhost:3000/api/auth/google")
            }
            className="w-full border border-white/10 hover:border-white/20 py-2 rounded-lg flex items-center justify-center gap-2 text-gray-300"
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
                "http://localhost:3000/api/auth/github")
            }
            className="w-full border border-white/10 hover:border-white/20 py-2 rounded-lg flex items-center justify-center gap-2 text-gray-300"
          >
            <img
              src="https://www.svgrepo.com/show/475654/github-color.svg"
              className="w-5"
            />
            Continue with GitHub
          </button>
        </div>

        {/* FOOTER */}
        <p className="mt-6 text-center text-sm text-gray-400">
          New to ReqHub?{" "}
          <Link to="/signup" className="text-violet-400 hover:underline">
            Create free account
          </Link>
        </p>
      </div>
    </div>
  );
}
