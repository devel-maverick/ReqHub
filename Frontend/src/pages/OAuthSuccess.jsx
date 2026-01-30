import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    const run = async () => {
      await checkAuth();
      navigate("/tester"); 
    };
    run();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      Logging you in...
    </div>
  );
}
