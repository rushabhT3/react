import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  useEffect(() => {
    const tokenExpirationTime = localStorage.getItem("tokenExpirationTime");
    if (new Date().getTime() > tokenExpirationTime) {
      logoutHandler();
    }
  }, []);

  const loginHandler = (token) => {
    setToken(token);
    const expirationTime = new Date().getTime() + 5 * 60 * 1000; // ! 5 minutes from now
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpirationTime", expirationTime);
    // setTimeout(logoutHandler, 3000);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpirationTime");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
