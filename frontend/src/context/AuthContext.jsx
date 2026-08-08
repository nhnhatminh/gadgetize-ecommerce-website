import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await axiosClient.get("/auth/me");
          setUser(userData);
        } catch (error) {
          console.error("Token hết hạn hoặc không hợp lệ:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkLoggedInUser();
  }, []);

  const login = async (email, password) => {
    const response = await axiosClient.post("/auth/login", { email, password });
    localStorage.setItem("token", response.token);
    setUser(response.user);
    return response;
  };

  const register = async (formData) => {
    const response = await axiosClient.post("/auth/register", formData);
    return response;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};