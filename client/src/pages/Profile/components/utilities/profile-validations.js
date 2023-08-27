import { checkUsernameDuplicate } from "./api-calls";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export const validateUsername = async (newUsername) => {
  // if username empty
  if (newUsername.trim().length === 0) {
    return "Username cannot be empty";
  }
  // if username have spaces
  const spaceRegex = /^[^ ]+$/;
  if (!spaceRegex.test(newUsername)) {
    return "Username must not contain spaces";
  }
  //If username is less than 8 or more than 16 words
  if (newUsername.trim().length < 8 || newUsername.trim().length > 16) {
    return "Username must be between 8-16 characters long";
  }
  // Check if username is duplicate
  try {
    const res = await checkUsernameDuplicate(newUsername);
    if (res.status === 200) {
      return "";
    }
  } catch (error) {
    if (error.status === 401) {
      return "Username is taken, please use another username";
    }
  }
};

export const validatePhone = (phone)=>{
  if(phone.trim().length < 11 || phone.trim().length>12){
    return "Phone number must be between 11 or 12 characters"
  }
  return ""
}

export const validateBirthDate = (dob)=>{
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const dobParsed = dayjs(dob)
  if (!dobParsed.isValid()) {
    return "Please enter a valid date";
  }
  return ""
}

