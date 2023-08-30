import api from "../../../axios-instance";
export const verifyChangePasswordToken = async (token) => {
  try {
    const res = await api.get(`/profile/verify-edit-password?token=${token}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const putNewPassword = async (emailEncrypt, password) => {
  try {
    const res = await api.put("/profile/edit-password", {
      emailEncrypt,
      password,
    });
    return res;
  } catch (error) {
    throw error;
  }
};
