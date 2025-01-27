import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("jwtToken"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const login = (token, userDetails) => {
    setAuthToken(token);
    setUser(userDetails);
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("user", JSON.stringify(userDetails));
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
  };

  const headers = { "Content-Type": "application/json", Authorization: authToken };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout, headers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
