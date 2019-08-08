export const validationComplete = inputs => {
  let valid = true;
  for (let key in inputs) {
    if (inputs[key] === false) {
      valid = false;
    }
  }
  return valid;
};
