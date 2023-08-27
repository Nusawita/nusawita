import React, { useContext, useEffect, useState } from "react";
import { getProfileData, editProfileData } from "../utilities/api-calls";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  validateBirthDate,
  validatePhone,
  validateUsername,
} from "../utilities/profile-validations";
import AuthContext from "../../../../context/auth-context";

const ProfileContext = React.createContext({
  fetchedProfileData: { username: "", email: "", noTelp: "", dob: "" },
  shownProfileData: { username: "", email: "", noTelp: "", dob: "" },
  changeShownProfileData: () => {},
  pageLoading: true,
  editingStates: "",
  changeEditingStates: () => {},
  editProfileData: () => {},
  profileFormErrors: {},
  editProfileActions: {},
  fieldErrorVibrateAnimation:false
});

export const ProfileContextProvider = (props) => {
  const authCtx = useContext(AuthContext)
  //Dayjs function to handle birth date
  dayjs.extend(utc);
  dayjs.extend(timezone);
  // Fetched data from the database
  const [fetchedProfileData, setFetchedProfileData] = useState({
    username: "",
    email: "",
    noTelp: "",
    dob: "",
  });
  //Data to show on the profile field (editable)
  const [shownProfileData, setShownProfileData] = useState({
    username: "",
    email: "",
    noTelp: "",
    dob: "",
  });
  // State to handle error animation
  const [fieldErrorVibrateAnimation, setFieldErrorVibrateAnimation] = useState({
    username: false,
    noTelp:false,
    dob:false
  })
  const startErrorAnimation = (field, boolean)=>{
    setFieldErrorVibrateAnimation((prev)=>({
      ...prev,
      [field]:boolean,
    }))
  }
  //Function to change shown profile data when user edit its value
  const changeShownProfileData = (field, value) => {
    //Not allowing typing other than numbers for phone
    if (field === "noTelp") {
      const numberRegex = /\D/g;
      value = value.replace(numberRegex, "");
    }
    if (field === "dob") {
      value = dayjs(value).utc().format("YYYY-MM-DD");
    }
    setShownProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [editingStates, setEditingStates] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const [profileFormErrors, setProfileFormErrors] = useState({
    username: "",
    phone: "",
    dob: "",
  });
  const clearProfileErrors = () => {
    setProfileFormErrors({
      username: "",
      phone: "",
      dob: "",
    });
  };

  // Function to change editingstates
  const changeEditingStates = (states) => {
    setEditingStates(states);
  };

  // Get User Data
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getProfileData();
        if (res.status === 200) {
          setFetchedProfileData(res.data.data);
          setShownProfileData(res.data.data);
          setPageLoading(false);
        }
      } catch (error) {
        alert("Server Error");
      }
    };
    getData();
  }, []);

  const editProfileActions = {
    // Start editing profile, field become not disabled
    startEditProfile: () => {
      changeEditingStates("editing");
    },
    // End editing profile without revert data
    endEditProfile:()=>{
      changeEditingStates("")
    },
    // End editing profile, revert shown data to old data from database
    cancelEditProfile: () => {
      changeEditingStates("");
      clearProfileErrors();
      setShownProfileData(fetchedProfileData);
    },
    // Attempt to submit the data
    submitNewProfileData: () => {
      changeEditingStates("submitting");
    },
    // Show are you sure dialog when cancel
    verifyCancelEditProfile: () => {
      changeEditingStates("verifyingCancel");
    },
    // Show are you sure dialog when save
    verifySaveEditProfile: () => {
      changeEditingStates("verifyingSave");
    },
    attemptEditProfile: async () => {
      // If some field have error do not submit, run animation instead
      const fieldError = Object.keys(profileFormErrors).filter(field => profileFormErrors[field] !== "")
      if (fieldError.length > 0) {
        changeEditingStates('editing')
        fieldError.forEach(field=>{
          startErrorAnimation(field,true)
        })
        return;
      }
      changeEditingStates("submitting");
      try {
        console.log(shownProfileData)
        const res = await editProfileData(shownProfileData);
        if (res.status === 200) {
          changeEditingStates("success");
          setFetchedProfileData(shownProfileData);
          authCtx.changeLoginUser(shownProfileData.username)
        }
      } catch (error) {
        alert("Server Error");
      }
    },
  };

  //Real time validations
  useEffect(() => {
    // If user is not editing do not validate
    if (editingStates !== 'editing') {
      return;
    }
    //Do not call validate if user reentered their old username
    if (shownProfileData.username === fetchedProfileData.username) {
      // Reset the username error instead
      setProfileFormErrors((prev) => ({
        ...prev,
        username: "",
      }));
      return;
    }
    // Call the validateUsername function with timeout
    const timeoutid = setTimeout(async () => {
      const usernameError = await validateUsername(shownProfileData.username);
      setProfileFormErrors((prev) => ({
        ...prev,
        username: usernameError,
      }));
    }, 600);
    return () => {
      clearTimeout(timeoutid);
    };
  }, [shownProfileData.username, editingStates, fetchedProfileData.username]);

  useEffect(() => {
    if (editingStates!=='editing' || shownProfileData.noTelp.trim().length === 0) {
      return;
    }
    const timeoutId = setTimeout(() => {
      const phoneError = validatePhone(shownProfileData.noTelp);
      setProfileFormErrors((prev) => ({
        ...prev,
        phone: phoneError,
      }));
    }, 600);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [shownProfileData.noTelp, editingStates]);

  useEffect(() => {
    if (editingStates !== 'editing') {
      return;
    }
    const dobError = validateBirthDate(shownProfileData.dob);
    setProfileFormErrors((prev) => ({
      ...prev,
      dob: dobError,
    }));
  }, [shownProfileData.dob, editingStates]);

  return (
    <ProfileContext.Provider
      value={{
        fetchedProfileData: fetchedProfileData,
        shownProfileData: shownProfileData,
        changeShownProfileData: changeShownProfileData,
        pageLoading: pageLoading,
        editingStates: editingStates,
        changeEditingStates: changeEditingStates,
        editProfileActions: editProfileActions,
        profileFormErrors: profileFormErrors,
        fieldErrorVibrateAnimation:fieldErrorVibrateAnimation,
        startErrorAnimation:startErrorAnimation
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
