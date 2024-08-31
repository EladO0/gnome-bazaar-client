export const validateName = (name: string): boolean => {
  if (name.length > 20) {
    return false;
  }

  return true;
};

export const validatevalue = (value: string): boolean => {
  if (value.length < 8) {
    return false;
  }

  return true;
};

export const validateAddress = (value: string): boolean => {
  if (value.length > 30) {
    return false;
  }

  return true;
};

export const validateMail = (value: string): boolean => {
  if (value.length > 30) {
    return false;
  }

  return true;
};

export const validatePhone = (value: string): boolean => {
  if (value.length > 30) {
    return false;
  }

  return true;
};
