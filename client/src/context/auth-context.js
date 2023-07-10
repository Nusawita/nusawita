import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import AxiosContext from "./axios_context";


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
  const api = useContext(AxiosContext).api
  const [isLoggedIn, setIsLoggedIn] = useState(false); //state to store user logged in or not
  const [isAdmin, setIsAdmin] = useState(false); // state to store user is admin or not
  const [loading, setLoading] = useState(true); // state to store loading status
  const [loginUser, setLoginUser] = useState("");

  // function to check if user logged in or not
  const checkLoggedIn = async () => {
    //Call the check login api here
    try {
      const res = await api.get(
        "/home",
        { withCredentials: true }
      );
      setIsLoggedIn(true);
      const loginData = res.data
      setLoginUser(loginData.username);
      setIsAdmin(loginData.isAdmin)
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setLoading(false); //after checking done setloading to false
    }
  };
  //function to logout user
  const logoutUser = async () => {
    try {
      //call the logout api
      const res = await api.get("/logout", {
        withCredentials: true,
      });
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
