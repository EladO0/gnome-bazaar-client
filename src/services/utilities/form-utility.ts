export const validateName = (name: string): boolean => {
  if (name.length > 20) {
    return false;
  }

  return true;
};

export const validatePWD = (pwd: string): boolean => {
  if (pwd.length < 8) {
    return false;
  }

  return true;
};

export const validateAddress = (pwd: string): boolean => {
  if (pwd.length > 30) {
    return false;
  }

  return true;
};

export const validateMail = (pwd: string): boolean => {
  if (pwd.length > 30) {
    return false;
  }

  return true;
};

export const validatePhone = (pwd: string): boolean => {
  if (pwd.length > 30) {
    return false;
  }

  return true;
};
