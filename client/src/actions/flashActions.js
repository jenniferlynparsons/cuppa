import { flashActionTypes } from "../lib/actionTypes";

export const editFlash = status => ({
  type: flashActionTypes.EDIT_FLASH,
  payload: status
});

export const clearFlash = () => ({
  type: flashActionTypes.CLEAR_FLASH
});
