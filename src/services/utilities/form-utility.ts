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

export const validateAddress = (value: string): boolean => {
  if (value.length > 30) {
    return false;
  }

  document.getElementById("address")?.classList.remove("error");
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

const addressSchemeValidation = (value: string): boolean => {
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

export const validateRegistrationForm = (formData: UserInfo): boolean => {
  let isValid = true;
  if (!addressSchemeValidation(formData.address)) {
    document.getElementById("address")?.classList.add("error");
  }
  if (!mailSchemeValidation(formData.mail)) {
    document.getElementById("mail")?.classList.add("error");
    isValid = false;
  }
  if (!phoneSchemeValidation(formData.phone)) {
    document.getElementById("phone")?.classList.add("error");
    isValid = false;
  }
  if (!passwordSchemeValidation(formData.pwd)) {
    document.getElementById("password")?.classList.add("error");
    isValid = false;
  }
  if (!userSchemeValidation(formData.user)) {
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
