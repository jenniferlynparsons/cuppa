import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PropTypes } from "prop-types";
import { teaTypeShape } from "../../../lib/propTypes";
import {
  convertTimeToMinSec,
  convertTimeToSec
} from "../../../lib/timerHelpers";
import {
  nameSchema,
  brewTimeMinSchema,
  brewTimeSecSchema
} from "../../../lib/validationSchemas";
import { editTeaType, addTeaType } from "../../../actions/teaTypeActions";
import { editFlash } from "../../../actions/flashActions";
import { validationComplete } from "../../../lib/validationComplete";
import InputField from "../../FormComponents/InputField";

export default function TeaTypeEditorModal(props) {
  const [teaTypeState, setTeaTypeState] = useState({
    id: "",
    globalID: "",
    name: "",
    brewTimeMin: "",
    brewTimeSec: "",
    visible: true
  });
  const [inputValidation, setInputValidation] = useState({
    name: true,
    brewTime: true,
    brewTimeMin: true,
    brewTimeSec: true
  });

  const errorMessages = {
    name: "Please enter a tea type name",
    brewTime: "Please enter a tea brew time"
  };

  const userID = useSelector(state => state.userID);
  const teaType = useSelector(
    state => state.teaTypes.allTeaTypes[props.teaTypeID]
  );
  const edit = teaType ? true : false;
  const serverErrors = useSelector(state => state.errors.serverErrors);

  const dispatch = useDispatch();

  useEffect(() => {
    const currentTeaType = {
      ...teaType,
      brewTimeMin: convertTimeToMinSec(teaType.brewTime).minute,
      brewTimeSec: convertTimeToMinSec(teaType.brewTime).seconds
    };

    setTeaTypeState(currentTeaType);
  }, [teaType, serverErrors]);

  const handleNameChange = event => {
    setTeaTypeState({ ...teaTypeState, name: event.currentTarget.value });
  };

  const handleBrewTimeMinChange = event => {
    setTeaTypeState({
      ...teaTypeState,
      brewTimeMin: event.currentTarget.value
    });
  };

  const handleBrewTimeSecChange = event => {
    const newSec =
      (event.currentTarget.value < 10 ? "0" : "") +
      Number(event.currentTarget.value);

    setTeaTypeState({ ...teaTypeState, brewTimeSec: newSec });
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    const namevalid = nameSchema.isValidSync(teaTypeState);
    const brewtimeminvalid = brewTimeMinSchema.isValidSync(teaTypeState);
    const brewtimesecvalid = brewTimeSecSchema.isValidSync(teaTypeState);
    const brewtimevalid =
      brewTimeMinSchema.isValidSync(teaTypeState) &&
      brewTimeSecSchema.isValidSync(teaTypeState);

    const typeData = {
      id: teaTypeState.id,
      userID: userID,
      globalID: teaTypeState.globalID,
      name: teaTypeState.name,
      brewTime: convertTimeToSec(
        teaTypeState.brewTimeMin,
        Number(teaTypeState.brewTimeSec)
      ),
      visible: true
    };

    if (namevalid && brewtimevalid) {
      if (edit === true) {
        // useDispatch
        dispatch(editTeaType(userID, typeData))
          .then(dispatch(editFlash("success")))
          .then(dispatch(props.onModalClose()));
      } else {
        dispatch(addTeaType(userID, typeData))
          .then(dispatch(editFlash("success")))
          .then(dispatch(props.onModalClose()));
      }
    } else {
      setInputValidation({
        ...inputValidation,
        name: namevalid,
        brewTime: brewtimevalid,
        brewTimeMin: brewtimeminvalid,
        brewTimeSec: brewtimesecvalid
      });
    }
  };

  return (
    <div
      className="modal is-active has-text-centered"
      data-testid="teatypeeditor"
    >
      <div className="modal-background"></div>
      <div className="modal-card">
        <section className="modal-card-body">
          {!validationComplete(inputValidation) && (
            <div
              className="notification is-danger"
              data-testid="incompletenotice"
            >
              Please enter the tea type details.
            </div>
          )}

          {serverErrors && serverErrors.duplicate && (
            <div
              className="notification is-danger"
              data-testid="duplicatenotice"
            >
              This tea type already exists in our system. Please try again.
            </div>
          )}

          <form onSubmit={handleFormSubmit} data-testid="teatypeeditorform">
            <div className="field">
              <label className="label" htmlFor="name">
                Tea Type Name
              </label>
              <InputField
                datatestid="name"
                name="name"
                id="name"
                type="text"
                placeholder="Tea Type Name"
                value={teaTypeState.name}
                className="input"
                valid={inputValidation.name}
                errorMessage={errorMessages.name}
                errorClass="is-danger"
                onChange={handleNameChange}
              />
            </div>
            <div className="field">
              <p className="label">Brew Time</p>
              <div className="columns">
                <div className="column is-one-quarter">
                  <InputField
                    datatestid="brewtimemin"
                    name="brewTimeMin"
                    id="brewTimeMin"
                    type="number"
                    min="0"
                    max="59"
                    placeholder="Min"
                    value={teaTypeState.brewTimeMin}
                    className="input is-one-fifth"
                    valid={inputValidation.brewTimeMin}
                    errorClass="input is-danger is-one-fifth"
                    onChange={handleBrewTimeMinChange}
                  />
                </div>
                <div className="column is-one-quarter">
                  <InputField
                    datatestid="brewtimesec"
                    name="brewTimeSec"
                    id="brewTimeSec"
                    type="number"
                    min="0"
                    max="59"
                    placeholder="Sec"
                    value={teaTypeState.brewTimeSec}
                    className="input is-one-fifth"
                    valid={inputValidation.brewTimeSec}
                    errorClass="input is-danger is-one-fifth"
                    onChange={handleBrewTimeSecChange}
                  />
                </div>
              </div>
              {!inputValidation.brewTime && (
                <p className="help is-danger" data-testid="inputerror">
                  {errorMessages.brewTime}
                </p>
              )}
            </div>
            <div className="is-centered">
              <button
                data-testid="canceltimer"
                className="button"
                type="button"
                onClick={props.onModalClose}
              >
                Cancel
              </button>
              <button data-testid="submit" className="button is-primary">
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export const TeaTypeEditorModalClass = TeaTypeEditorModal;

TeaTypeEditorModal.propTypes = {
  userID: PropTypes.string.isRequired,
  currentTeaType: teaTypeShape,
  teaTypeID: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  history: PropTypes.object,
  serverErrors: PropTypes.object,
  editTeaType: PropTypes.func.isRequired,
  editFlash: PropTypes.func.isRequired,
  addTeaType: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};
