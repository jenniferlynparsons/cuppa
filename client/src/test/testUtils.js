export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test-id="${val}"]`);
};
