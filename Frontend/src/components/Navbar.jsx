
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="text-xl font-semibold flex items-center gap-2">
          ⚡ ReqHub
        </Link>

        {/* CENTER LINKS */}
        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          <a href="#">Products</a>
          <a href="#">Developers</a>
          <a href="#">Pricing</a>
          <a href="#">FAQ</a>
        </div>

        {/* RIGHT SIDE */}
        {!authUser ? (
          <div className="flex gap-3">
            <Link to="/signin" className="px-4 py-2 text-sm text-gray-300">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-white text-black rounded-md text-sm"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="relative">
            {/* AVATAR BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2"
            >
              <img
                src="boy.png"
                alt="avatar"
                className="w-8 h-8 rounded-full border border-white/10"
              />
              <span className="text-sm text-gray-200 hidden sm:block">
                {authUser.name?.split(" ")[0] || "User"}
              </span>
            </button>

            {/* DROPDOWN */}
            {open && (
              <div
                onMouseLeave={() => setOpen(false)}
                className="absolute right-0 mt-2 w-40 rounded-lg bg-[#111118] border border-white/10 shadow-lg"
              >
                <Link
                  to="/tester"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                >
                  Dashboard
                </Link>

                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                >
                  Profile
                </Link>

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
