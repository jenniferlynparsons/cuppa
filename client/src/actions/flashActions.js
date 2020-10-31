import { flashActionTypes } from "../lib/actionTypes";

export const editFlash = status => {
  console.log("editFlash");
  return {
    type: flashActionTypes.EDIT_FLASH,
    payload: status
  };
};

export const clearFlash = () => ({
  type: flashActionTypes.CLEAR_FLASH
});
