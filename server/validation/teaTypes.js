const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateTeaTypeInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.brewTime = !isEmpty(data.brewTime + "") ? data.brewTime + "" : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // brewTime checks
  if (Validator.isEmpty(data.brewTime)) {
    errors.brewTime = "BrewTime field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
