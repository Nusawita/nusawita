import React, { useState, useEffect } from "react";
import axios from "../axios-instance";

//Declaration of auth context
const AuthContext = React.createContext({
  isLoggedIn: false, //state to store user logged in or not
  isAdmin: false, // state to store user is admin or not
  loading: false, // state to store loading status
  loginUser: "",
  logoutUser: () => {}, //function to log user out
  verificationCooldown: 0,
  verificationEmail: "",
});

//AuthContextProvider wraps the App.js component in the Index.js file so all children of app have access to the AuthContext
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //state to store user logged in or not
  const [isAdmin, setIsAdmin] = useState(false); // state to store user is admin or not
  const [loading, setLoading] = useState(true); // state to store loading status
  const [loginUser, setLoginUser] = useState("");
  const [verificationCooldown, setVerificationCooldown] = useState(0);
  const [verificationEmail, setVerificationEmail] = useState("");

  //function to logout user
  const logoutUser = async () => {
    try {
      //call the logout api
      await axios.get("/logout", {
        withCredentials: true,
      });
      setIsLoggedIn(false); //set the logged_in state to false
      window.location.href = "/"; //Redirect to landing page
    } catch (error) {
      alert('Server Error')
    }
  };
  // Use useEffect hook on checkLoggedIn to check if the user is loggedIn everytime page refreshes
  useEffect(() => {
    // function to check if user logged in or not
    const checkLoggedIn = async () => {
      //Call the check login api here
      try {
        const res = await axios.get("/home", { withCredentials: true });
        setIsLoggedIn(true);
        const loginData = res.data;
        setLoginUser(loginData.username);
        setIsAdmin(loginData.isAdmin);
      } catch (error) {
        if (error.response.status === 400) {
          if (error.response.data.temp_token) {
            setVerificationEmail(error.response.data.temp_token);
          }
          if (error.response.data.cooldown) {
            setVerificationCooldown(error.response.data.cooldown);
          }
          setIsLoggedIn(false)
        }
        setIsLoggedIn(false);
      } finally {
        setLoading(false); //after checking done setloading to false
      }
    };
    // Cookies.remove("session_token"); //remove the session token
    checkLoggedIn();
  }, []);

  return (
    //declare the authcontextprovider with child and wrap app js inside this provider in index.js
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        logoutUser: logoutUser,
        isAdmin: isAdmin,
        loading: loading,
        loginUser: loginUser,
        verificationCooldown: verificationCooldown,
        verificationEmail: verificationEmail,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
