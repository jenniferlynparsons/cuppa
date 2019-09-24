const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateTeaInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.brand = !isEmpty(data.brand) ? data.brand : "";
  data.teaType = !isEmpty(data.teaType) ? data.teaType : "";
  data.servings = !isEmpty(data.servings + "") ? data.servings + "" : "";
  data.rating = !isEmpty(data.rating) ? data.rating + "" : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Brand checks
  if (Validator.isEmpty(data.brand)) {
    errors.brand = "Brand field is required";
  }

  // teaType checks
  if (Validator.isEmpty(data.teaType)) {
    errors.teaType = "Type field is required";
  }

  // servings checks
  if (Validator.isEmpty(data.servings)) {
    errors.servings = "Servings field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
