export const validatePassword = (password) => {
  if (password.trim().length === 0) {
    return "empty";
  }
  if (password.trim().length < 8) {
    return "Password must be 8 or more characters long";
  }
  const passRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/;
  if (!passRegex.test(password)) {
    return "Password must contain an uppercase character, a lowercase character, and a number";
  }
  return ""
};
