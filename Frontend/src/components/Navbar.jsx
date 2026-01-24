import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <img
              src="/reqhub-logo.png"
              alt="ReqHub logo"
              className="w-8 h-8 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.5)]"
            />
            <span className="text-2xl font-bold text-white">ReqHub</span>
          </Link>
        </motion.div>

        {/* DESKTOP LINKS */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="hidden md:flex gap-8 text-sm text-gray-300">
          <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
          <a href="#how" className="hover:text-purple-400 transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-purple-400 transition-colors">Testimonials</a>
        </motion.div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* MOBILE MENU */}
          <motion.button whileTap={{ scale: 0.9 }} className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu />
          </motion.button>

          {!authUser ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="hidden md:flex gap-3">
              <Link to="/signin" className="px-4 py-2 text-sm text-gray-300 hover:text-purple-400">Sign In</Link>
              <Link to="/signup" className="px-4 py-2 bg-purple-600 rounded-md text-sm hover:bg-purple-700">
                Sign Up
              </Link>
            </motion.div>
          ) : (
            <div className="relative">
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setOpen(!open)} className="flex items-center gap-2">
                <img src="boy.png" className="w-8 h-8 rounded-full border border-purple-400"/>
                <span className="font-semibold text-purple-400">{authUser.name?.split(" ")[0]}</span>
              </motion.button>
              <AnimatePresence>
                {open && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 mt-2 w-44 rounded-lg bg-[#111118] border border-white/10 shadow-lg z-50">
                    <Link to="/tester" className="block px-4 py-2 text-gray-300 hover:bg-purple-500/10">Dashboard</Link>
                    <button onClick={logout} className="block w-full px-4 py-2 text-red-400 hover:bg-red-500/10">Logout</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden px-6 py-4 space-y-3 bg-black border-t border-white/10 shadow-lg">
            <a href="#features" className="block py-2 hover:text-purple-400">Features</a>
            <a href="#how" className="block py-2 hover:text-purple-400">How it works</a>
            <a href="#pricing" className="block py-2 hover:text-purple-400">Pricing</a>
            <a href="#testimonials" className="block py-2 hover:text-purple-400">Testimonials</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
