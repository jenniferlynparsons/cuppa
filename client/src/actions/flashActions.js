import { flashActionTypes } from "../lib/actionTypes";

export const editTeaFlash = status => ({
  type: flashActionTypes.EDIT_TEA_FLASH,
  payload: status
});

export const editTeaTypeFlash = status => ({
  type: flashActionTypes.EDIT_TEA_TYPE_FLASH,
  payload: status
});
