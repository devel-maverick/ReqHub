import { create } from "zustand";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  authError: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      set({ authUser: res.data });
    } catch {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async ({ email, name, password }) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", {
        email,
        name,
        password,
      });

      set({ authUser: res.data.user });
      toast.success("Account created successfully!");
    } catch (err) {
  set({ authError: err?.response?.data?.message || "Signup failed" });
  toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },
login: async ({ email, password }) => {
  set({ isLoggingIn: true, authError: null });
  try {
    const res = await axiosInstance.post("/auth/login", { email, password });
    set({ authUser: res.data.user });
    toast.success("Logged in successfully");
  } catch (err) {
    const msg = err?.response?.data?.message || "Login failed";
    set({ authError: msg });
    toast.error(msg);
  } finally {
    set({ isLoggingIn: false });
  }
},


  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out");
    } catch (err) {
      toast.error("Logout failed");
    }
  },
}));
