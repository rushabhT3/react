import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router";

import classes from "./AuthForm.module.css";
// import { API_KEY } from "../../constants";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authContext = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation
    setIsLoading(true);

    const url = isLogin
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAmlkJVsdR4VRFHKasqsBt910ezfg-1Lcw"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAmlkJVsdR4VRFHKasqsBt910ezfg-1Lcw";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
      });

      setIsLoading(false);
      if (res.ok) {
        const data = await res.json();
        console.log({ data });
        authContext.login(data.idToken);
        history.replace("/");
      } else {
        // const data = await res.json();
        // if (data && data.error && data.error.message){
        //   errorMsg = data.error.message
        // }
        const errorMsg = "Authentication failed 😭";
        throw new Error(errorMsg);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Loading...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
