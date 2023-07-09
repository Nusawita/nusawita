import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

//Declaration of auth context
const AuthContext = React.createContext({
  isLoggedIn: false, //state to store user logged in or not
  isAdmin: false, // state to store user is admin or not
  loading: false, // state to store loading status
  loginUser: "",
  logoutUser: () => {}, //function to log user out
  checkAdmin: () => {}, //function to check if logged in user is admin
  checkLoggedIn: () => {}, //function to check if user logged in or not
});

//AuthContextProvider wraps the App.js component in the Index.js file so all children of app have access to the AuthContext
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //state to store user logged in or not
  const [isAdmin, setIsAdmin] = useState(false); // state to store user is admin or not
  const [loading, setLoading] = useState(true); // state to store loading status
  const [loginUser, setLoginUser] = useState("");

  // function to check if user logged in or not
  const checkLoggedIn = async () => {
    //Call the check login api here
    try {
      const res = await axios.get(
        "https://black-centipede-hose.cyclic.app/api/home",
        { withCredentials: true }
      );
      setIsLoggedIn(true);
      const storedData = localStorage.getItem("loginCredentials");
      const parsedData = JSON.parse(storedData);
      setLoginUser(parsedData.username);
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setLoading(false); //after checking done setloading to false
    }
  };
  //function to check if user is admin
  const checkAdmin = async (isAdmin) => {
    try {
      if (isAdmin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      //else user is not admin
      setIsAdmin(false);
    }
  };

  //function to logout user
  const logoutUser = async () => {
    try {
      //call the logout api
      await axios.get("https://black-centipede-hose.cyclic.app/api/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("loginCredentials");
      setIsLoggedIn(false); //set the logged_in state to false
      window.location.href = "/"; //Redirect to landing page
    } catch (error) {
      console.log(error);
    }
  };
  // Use useEffect hook on checkLoggedIn to check if the user is loggedIn everytime page refreshes
  useEffect(() => {
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
        checkLoggedIn: checkLoggedIn,
        loading: loading,
        loginUser: loginUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
