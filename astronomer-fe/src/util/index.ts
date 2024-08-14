export const validateEmail = (email: string) => {
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateNumber = (number: string) => {
  // Employee number validation regex
  const numberRegex = /^0*[0-9]{10,11}$/;
  return numberRegex.test(number);
};
