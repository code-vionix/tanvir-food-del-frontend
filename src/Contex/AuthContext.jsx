// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import API from "@/services/api";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // check login when app loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me"); // backend /auth/me route
        console.log(res.data.user);

        setUser(res.data.user); // {role: "admin" / "user", ...}
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
