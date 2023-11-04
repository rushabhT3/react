import React, { useState, createContext } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthProvider = (props) => {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken);
  const userLoggedIn = !!token;

  const login = (token) => {
    setToken(token);
    localStorage.getItem("token", token);
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const ctxtValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: login,
    logout: logout,
  };
  return (
    <AuthContext.Provider value={ctxtValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
