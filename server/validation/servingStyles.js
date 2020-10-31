const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateServingStyleInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.userID = !isEmpty(data.userID) ? data.userID : "";
  data.globalID = !isEmpty(data.globalID) ? data.globalID : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
