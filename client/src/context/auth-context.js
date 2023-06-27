import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
const AuthContext = React.createContext({
  isLoggedIn: false,
  logoutUser: () => {},
  isAdmin: false,
  handleAdmin: () => {},
});

//AuthContextProvider wraps the App.js component in the Index.js file so all children of app have access to the AuthContext
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoggedIn = async () => {
    //Call the check login api here
    const sessionToken = Cookies.get("session_token");
    if (!sessionToken) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };
  const logoutUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/logout", {
        withCredentials: true,
      });
      Cookies.remove("session_token");
      setIsLoggedIn(false);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Use useEffect hook on checkLoggedIn to check if the user is loggedIn everytime page refreshes
  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        logoutUser: logoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
