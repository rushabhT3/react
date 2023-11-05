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
  console.log({ userLoggedIn });

  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
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
  console.log({ ctxtValue });
  return (
    <AuthContext.Provider value={ctxtValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
