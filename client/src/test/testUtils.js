import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

const mockStore = configureStore([thunk]);

export const makeMockStore = (state = {}) => {
  return mockStore({ ...state });
};

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test-id="${val}"]`);
};
