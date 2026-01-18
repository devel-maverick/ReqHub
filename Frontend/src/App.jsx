// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <div className="min-h-screen bg-black text-white flex flex-col">
//         <Navbar />

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/signin" element={<SignIn />} />
//           <Route path="/signup" element={<SignUp />} />
//         </Routes>

//         <Footer />
//       </div>
//     </BrowserRouter>
//   );
// }
// import { useEffect } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Home from "./pages/Home";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// import Tester from "./pages/Tester";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import PageLoader from "./components/PageLoader";

// import { useAuthStore } from "./store/useAuthStore";

// export default function App() {
//   const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   if (isCheckingAuth) return <PageLoader />;

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col">
//       <Navbar />

//       <Routes>
//         {/* PUBLIC */}
//         <Route path="/" element={<Home />} />

//         <Route
//           path="/signin"
//           element={!authUser ? <SignIn /> : <Navigate to="/tester" />}
//         />

//         <Route
//           path="/signup"
//           element={!authUser ? <SignUp /> : <Navigate to="/tester" />}
//         />

//         {/* PROTECTED */}
//         <Route
//           path="/tester"
//           element={authUser ? <Tester /> : <Navigate to="/signin" />}
//         />
//       </Routes>

//       {/* Footer only on public pages */}
//       {!authUser && <Footer />}
//     </div>
//   );
// // }
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useEffect } from "react";
// import { useAuthStore } from "./store/useAuthStore";

// import Home from "./pages/Home";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// import Tester from "./pages/Tester";

// export default function App() {
//   const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   if (isCheckingAuth) return null;

//   return (
//      <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signin" element={!authUser ? <SignIn /> : <Navigate to="/tester" />} />
//         <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/tester" />} />
//         <Route path="/tester" element={authUser ? <Tester /> : <Navigate to="/signin" />} />
//       </Routes>
//   );
// }
// import { useEffect } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// import Tester from "./pages/Tester";
// import { useAuthStore } from "./store/useAuthStore";

// export default function App() {
//   const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   if (isCheckingAuth) return null;

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col">
//       {/* Navbar sirf PUBLIC pages pe */}
//       <Routes>
//         <Route path="/" element={<Home />} />

//         <Route
//           path="/signin"
//           element={!authUser ? <SignIn /> : <Navigate to="/tester" />}
//         />
//         <Route
//           path="/signup"
//           element={!authUser ? <SignUp /> : <Navigate to="/tester" />}
//         />

//         {/* PROTECTED ROUTE */}
//         <Route
//           path="/tester"
//           element={authUser ? <Tester /> : <Navigate to="/signin" />}
//         />
//       </Routes>
//     </div>
//   );
// }
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
      
      {/* ✅ ALWAYS VISIBLE */}
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

        {/* 🔐 PROTECTED */}
        <Route
          path="/tester"
          element={authUser ? <Tester /> : <Navigate to="/signin" />}
        />
      </Routes>

      <Footer />
    </div>
  );
}
