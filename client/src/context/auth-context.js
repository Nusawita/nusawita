import React, { useState, useEffect } from "react";
import api from "../axios-instance";

//Declaration of auth context
const AuthContext = React.createContext({
  isLoggedIn: false, //state to store user logged in or not
  isAdmin: false, // state to store user is admin or not
  loading: false, // state to store loading status
  loginUser: "",
  logoutUser: () => {}, //function to log user out
  verificationCooldown: 0,
  verificationEmail: "",
  onRegisterSession: true,
  fetchEmailVerificationSendApi: () => {},
  createRegisterSession: () => {},
  clearRegisterSession: () => {},
  cancelUserRegistration: () => {},
  emailVerified: "",
});

//AuthContextProvider wraps the App.js component in the Index.js file so all children of app have access to the AuthContext
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //state to store user logged in or not
  const [isAdmin, setIsAdmin] = useState(false); // state to store user is admin or not
  const [loading, setLoading] = useState(true); // state to store loading status
  const [loginUser, setLoginUser] = useState("");

  const [verificationCooldown, setVerificationCooldown] = useState(0);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [onRegisterSession, setOnRegisterSession] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // Use useEffect hook on checkLoggedIn to check if the user is loggedIn everytime page refreshes
  useEffect(() => {
    // function to check if user logged in or not
    const checkLoggedIn = async () => {
      //Call the check login api here
      try {
        const res = await api.get("/home", { withCredentials: true });
        setIsLoggedIn(true);
        const loginData = res.data;
        setLoginUser(loginData.username);
        setIsAdmin(loginData.isAdmin);
      } catch (error) {
        //If temp token exists give user register session
        if (error.response.data.temp_token) {
          //Set session email
          setVerificationEmail(error.response.data.temp_token);
          // if have cooldown set cooldown
          if (error.response.data.cooldown) {
            setVerificationCooldown(
              Math.trunc(error.response.data.cooldown / 1000)
            );
          }
        }
        setIsLoggedIn(false);
      } finally {
        setLoading(false); //after checking done setloading to false
      }
    };
    checkLoggedIn();
  }, []);
  //function to logout user
  const logoutUser = async () => {
    try {
      //call the logout api
      await api.get("/logout", {
        withCredentials: true,
      });
      setIsLoggedIn(false); //set the logged_in state to false
      window.location.href = "/"; //Redirect to landing page
    } catch (error) {
      alert("Server Error");
    }
  };

  //Function to call the send verification email api
  const fetchEmailVerificationSendApi = async (email, cooldown) => {
    try {
      const res = await api.put(
        "email-verification",
        { email, cooldown },
        { withCredentials: true }
      );
      if (res.status === 200) {
        //Give cooldown on successfull send email
        setVerificationCooldown(cooldown);
        setOnRegisterSession(true);
        setVerificationEmail(email);
      }
    } catch (error) {
      //400 means email is already verified
      if (error.response.status === 400) {
        //Set the email verified state to true to show the success registration message
        setEmailVerified(true);
        //Set the onRegisterSession to false to remove the email verification dialog
        setOnRegisterSession(false);
      }
      if (error.response.status === 500) {
        alert("Server Error");
      }
    }
  };
  //Function to start user session
  const createRegisterSession = (userEmail) => {
    //Set the verification email state to current
    setVerificationEmail(userEmail);
    //Set the onRegisterSession to true to show the verification popup dialog
    setOnRegisterSession(true);
  };

  // Function to call delete new user api when user decide to cancel their registration
  const fetchDeleteNewUser = async (email) => {
    try {
      const res = await api.post("/delete-new-user", { email });
      if (res.status === 200) {
        // On successfull delete, remove the registration session
        fetchClearRegisterSessionApi();
      }
    } catch (error) {
      alert("Internal server error");
    }
  };
  // Function to cancel user registration, contains api call to delete new user
  const cancelUserRegistration = () => {
    fetchDeleteNewUser(verificationEmail);
  };
  //Function to call the clear register session cookie api
  const fetchClearRegisterSessionApi = async (status) => {
    try {
      const res = await api.get("/logout-temp", {
        withCredentials: true,
      });
      if (res.status === 200) {
        //Set onRegisterSession to false to remove the email verification dialog
        setOnRegisterSession(false);
        //Set the emailVerified state to false to remove successfull registration dialog
        setEmailVerified(false);
        //Reset ongoing cooldown to 0
        setVerificationCooldown(0);
        //Reset the verificationEmail to empty string
        setVerificationEmail("");
        return;
      }
    } catch (error) {
      if (error.response.status === 500) {
        alert("Server error");
      }
    }
  };
  // Function to clear register session, only calls the fetchClearRegisterSessionApi
  const clearRegisterSession = () => {
    fetchClearRegisterSessionApi();
  };
  //Use effect to check email everytime the emailVerification variable changes
  useEffect(() => {
    if (verificationEmail) {
      //Check if email already verified
      const fetchEmailCheckApi = async (email) => {
        try {
          const res = await api.post("/check-email", { email });
          if (res.status === 200) {
            // If email not verified, show the verification dialog and start register session
            setOnRegisterSession(true);
            return;
          }
        } catch (error) {
          console.log(error);
          //If verified server returns 401
          if (error.response.status === 401) {
            // show successfully verified dialog
            setEmailVerified(true)
            // remove the popup dialog of verification email
            setOnRegisterSession(false)
            return;
          }
        }
      };
      // Call check email
      fetchEmailCheckApi(verificationEmail);
    }
  }, [verificationEmail]);

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
        emailVerified: emailVerified,
        onRegisterSession: onRegisterSession,
        createRegisterSession: createRegisterSession,
        cancelUserRegistration: cancelUserRegistration,
        clearRegisterSession: clearRegisterSession,
        fetchEmailVerificationSendApi: fetchEmailVerificationSendApi,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
