import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold flex items-center gap-2">
          ⚡ Postman Lite
        </Link>

        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          <a href="#">Products</a>
          <a href="#">Developers</a>
          <a href="#">Pricing</a>
          <a href="#">FAQ</a>
        </div>

        <div className="flex gap-3">
          <Link to="/signin" className="px-4 py-2 text-sm">Sign In</Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-white text-black rounded-md text-sm"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
