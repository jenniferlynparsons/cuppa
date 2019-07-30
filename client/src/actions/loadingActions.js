import { loadingActionTypes } from "../lib/actionTypes";

export const getLoadingStatus = () => {
  return dispatch =>
    dispatch({
      type: loadingActionTypes.LOADING,
      payload: "complete"
    });
};
