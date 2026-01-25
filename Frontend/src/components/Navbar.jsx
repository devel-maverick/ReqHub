import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { Menu, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2"
          >
            <img
              src="/reqhub-logo.png"
              alt="ReqHub logo"
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-xl font-bold text-white tracking-tight">ReqHub</span>
          </Link>
        </motion.div>

        {/* DESKTOP LINKS */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="hidden md:flex gap-8 text-sm text-gray-400 font-medium">
          <button onClick={() => scrollToSection("features")} className="hover:text-white transition-colors cursor-pointer">Features</button>
          <button onClick={() => scrollToSection("how")} className="hover:text-white transition-colors cursor-pointer">How it works</button>
          <button onClick={() => scrollToSection("pricing")} className="hover:text-white transition-colors cursor-pointer">Pricing</button>
        </motion.div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          <a href="https://github.com/devel-maverick/ReqHub" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hidden md:block">
            <Github size={20} />
          </a>

          {/* MOBILE MENU */}
          <motion.button whileTap={{ scale: 0.9 }} className="md:hidden text-gray-400 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu />
          </motion.button>

          {!authUser ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="hidden md:flex gap-3">
              <Link to="/signin" className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Sign In</Link>
              <Link to="/signup" className="px-4 py-2 bg-white text-black border border-white rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                Sign Up
              </Link>
            </motion.div>
          ) : (
            <div className="relative">
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setOpen(!open)} className="flex items-center gap-2">
                <img src="boy.png" className="w-8 h-8 rounded-full border border-gray-700" />
                <span className="font-medium text-sm text-gray-300">{authUser.name?.split(" ")[0]}</span>
              </motion.button>
              <AnimatePresence>
                {open && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 mt-2 w-44 rounded-lg bg-black border border-gray-800 shadow-xl z-50 overflow-hidden">
                    <Link to="/tester" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-900 hover:text-white">Dashboard</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-900">Logout</button>
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
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden px-6 py-4 space-y-3 bg-black border-t border-gray-800">
            <button onClick={() => scrollToSection("features")} className="block w-full text-left py-2 text-gray-400 hover:text-white">Features</button>
            <button onClick={() => scrollToSection("how")} className="block w-full text-left py-2 text-gray-400 hover:text-white">How it works</button>
            <button onClick={() => scrollToSection("pricing")} className="block w-full text-left py-2 text-gray-400 hover:text-white">Pricing</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
