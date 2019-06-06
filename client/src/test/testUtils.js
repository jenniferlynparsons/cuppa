import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

export const makeMockStore = configureStore([thunk]);

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test-id="${val}"]`);
};
