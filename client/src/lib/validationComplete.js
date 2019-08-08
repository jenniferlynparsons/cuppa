export const validationComplete = inputs => {
  let valid = true;

  Object.keys(inputs).forEach(key => {
    if (inputs[key] === false) {
      valid = false;
    }
  });

  return valid;
};
