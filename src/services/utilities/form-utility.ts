import { Credentials, UserInfo } from "../../config/types/userTypes";

export const validateUser = (name: string): boolean => {
  if (name.length > 20) {
    return false;
  }

  document.getElementById("user")?.classList.remove("error");
  return true;
};

export const validatePWD = (value: string): boolean => {
  const escapeChars = ";=-".split("");
  if (escapeChars.some((c) => value.includes(c))) {
    return false;
  }
  document.getElementById("password")?.classList.remove("error");
  return true;
};

export const validateFullName = (value: string): boolean => {
  if (value.length > 30) {
    return false;
  }

  document.getElementById("fullName")?.classList.remove("error");
  return true;
};

export const validateMail = (value: string): boolean => {
  if (value.length > 30) {
    return false;
  }

  document.getElementById("mail")?.classList.remove("error");
  return true;
};

export const validatePhone = (value: string): boolean => {
  if (value.length > 10) {
    return false;
  }

  document.getElementById("phone")?.classList.remove("error");
  return true;
};

////// Submission validation //////

const fullNameSchemeValidation = (value: string): boolean => {
  if (!value) return false;
  return true;
};

const mailSchemeValidation = (value: string): boolean => {
  if (!value) return false;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) return false;
  return true;
};

const phoneSchemeValidation = (value: string): boolean => {
  if (!value) return false;
  if (value.length !== 10) return false;
  return true;
};

const passwordSchemeValidation = (value: string): boolean => {
  if (!value) return false;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordPattern.test(value)) return false;
  return true;
};

const userSchemeValidation = (value: string): boolean => {
  if (!value) return false;
  return true;
};

export const validateRegistrationForm = (
  formData: UserInfo,
  skip_pwd = false
): boolean => {
  let isValid = true;
  if (!fullNameSchemeValidation(formData.fullName)) {
    console.log("full name not good");
    
    document.getElementById("fullName")?.classList.add("error");
  }
  if (!mailSchemeValidation(formData.mail)) {
    console.log("mail not good");
    document.getElementById("mail")?.classList.add("error");
    isValid = false;
  }
  if (!phoneSchemeValidation(formData.phone)) {
    console.log("phone not good");
    document.getElementById("phone")?.classList.add("error");
    isValid = false;
  }
  if (!skip_pwd && !passwordSchemeValidation(formData.pwd)) {
    console.log("pwd not good");
    document.getElementById("password")?.classList.add("error");
    isValid = false;
  }
  if (!userSchemeValidation(formData.userName)) {
    
    console.log("username not good");
    document.getElementById("user")?.classList.add("error");
    isValid = false;
  }
  return isValid;
};

export const validateLoginForm = (formData: Credentials): boolean => {
  let isValid = true;
  if (!formData.pwd) {
    document.getElementById("password")?.classList.add("error");
    isValid = false;
  }
  if (!formData.user) {
    document.getElementById("user")?.classList.add("error");
    isValid = false;
  }
  return isValid;
};
