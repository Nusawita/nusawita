import api from "../../../../axios-instance";

export const getProfileData = async () => {
  try {
    const res = await api.get("/profile", { withCredentials: true });
    return res;
  } catch (error) {
    throw error.response
  }
};

export const editProfileData = async (newData) => {
  delete newData.ban;
  try {
    const res = await api.put("/profile/edit", newData, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    throw error.response
  }
};

export const checkUsernameDuplicate = async (username) => {
  try {
    const res = await api.post("/check-username", { username });
    return res;
  } catch (error) {
    throw error.response;
  }
};

export const sendChangePasswordLink = async(email) =>{
  try{
    const res = await api.put("/profile/request-edit-password", {email})
    return res
  }catch(error){
    throw error.response
  }
}
