import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

//Declaration of auth context
const AuthContext = React.createContext({
  isLoggedIn: false, //state to store user logged in or not
  isAdmin: false, // state to store user is admin or not
  loading: false, // state to store loading status
  logoutUser: () => {}, //function to log user out
  checkAdmin: () => {}, //function to check if logged in user is admin
  checkLoggedIn: () => {}, //function to check if user logged in or not
});

//AuthContextProvider wraps the App.js component in the Index.js file so all children of app have access to the AuthContext
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //state to store user logged in or not
  const [isAdmin, setIsAdmin] = useState(false); // state to store user is admin or not
  const [loading, setLoading] = useState(true); // state to store loading status

  //function to check if user logged in or not
  const checkLoggedIn = async () => {
    //Call the check login api here
    try {
      const sessionToken = Cookies.get("session_token"); //get session token cookies
      //if session token is not valid user is not logged in
      if (!sessionToken) {
        setIsLoggedIn(false);
      }
      //else user is logged in
      else {
        setIsLoggedIn(true);
        await checkAdmin(); //check if user is admin
      }
    } catch (error) {
      console.log("Error Logging In");
    } finally {
      setLoading(false); //after checking done setloading to false
    }
  };
  //function to check if user is admin
  const checkAdmin = async () => {
    try {
      //get the api to get the admin checker api
      const res = await axios.get("http://localhost:5000/api/dashboard", {
        withCredentials: true,
      });
      //if successfully call the api, then user is admin
      if (res.status === 200) {
        setIsAdmin(true);
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
      await axios.get("http://localhost:5000/api/logout", {
        withCredentials: true,
      });
      Cookies.remove("session_token"); //remove the session token
      setIsLoggedIn(false); //set the logged_in state to false
      window.location.href = "/"; //Redirect to landing page
    } 
    catch (error) {
      console.log(error);
    }
  };
  // Use useEffect hook on checkLoggedIn to check if the user is loggedIn everytime page refreshes
  useEffect(() => {
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
