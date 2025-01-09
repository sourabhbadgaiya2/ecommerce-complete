"use strict";

/**
 * Get a unique error message from the error object
 * (Yeh function error message me se unique field ka naam nikalta hai
 *  aur uske saath ek readable message banata hai)
 */

const getUniqueErrorMessage = (error) => {
  try {
    // MongoDB ke error message me se field ka naam extract karna
    const fieldName = error.message.match(/index:\s(.+)_1/)[1];
    // Field name ko capitalize karke error message return karna
    return `${fieldName.charAt(0).toUpperCase()}${fieldName.slice(
      1
    )} already exists`;
  } catch (err) {
    // Agar error parsing me dikkat aaye to default message dena
    return "Unique field already exists";
  }
};

/**
 * Get the error message from the error object
 * (Yeh function error object ko check karke sahi error message generate karta hai)
 */
export const errorHandler = (error) => {
  if (error.code) {
    // MongoDB ke unique constraint error ke liye handling
    if ([11000, 11001].includes(error.code)) {
      // Agar error unique field ka hai, toh uska message return karo
      return getUniqueErrorMessage(error);
    }
    // Baaki generic database error ke liye error.message ko return karo
    return error.message; // Display the exact message from the error
  }

  // Validation errors ke liye handling
  if (error.errors) {
    // Validation errors ko map karke unke messages nikalna
    const messages = Object.values(error.errors).map((err) => err.message);
    // Saare messages ko comma se join karke ek string me return karna
    return messages.join(", ");
  }

  // Agar error type match nahi hua toh default message dena
  return error.message;
};

// Agar error type match nahi hua toh default message dena
