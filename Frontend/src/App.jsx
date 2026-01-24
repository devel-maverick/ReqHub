import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Tester from "./pages/Tester";
import { useAuthStore } from "./store/useAuthStore";

export default function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) return null;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/signin"
          element={!authUser ? <SignIn /> : <Navigate to="/tester" />}
        />

        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/tester" />}
        />
        <Route
          path="/tester"
          element={authUser ? <Tester /> : <Navigate to="/signin" />}
        />
      </Routes>

      <Footer />
    </div>
  );
}
