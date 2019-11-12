import React from "react";
import { connect } from "react-redux";
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

export class TeaTypeEditorModal extends React.Component {
  state = {
    flash: {
      name: ""
    },
    touched: {
      name: false
    },
    userID: this.props.userID,
    teaType: {
      id: this.props.currentTeaType ? this.props.currentTeaType.id : "",
      globalID: this.props.currentTeaType
        ? this.props.currentTeaType.globalID
        : "",
      name: this.props.currentTeaType ? this.props.currentTeaType.name : "",
      brewTimeMin: this.props.currentTeaType
        ? convertTimeToMinSec(this.props.currentTeaType.brewTime).minute
        : "",
      brewTimeSec: this.props.currentTeaType
        ? convertTimeToMinSec(this.props.currentTeaType.brewTime).seconds
        : "",

      visible: this.props.currentTeaType
        ? this.props.currentTeaType.visible
        : ""
    },
    inputValidation: {
      name: true,
      brewTime: true,
      brewTimeMin: true,
      brewTimeSec: true
    },
    errorMessages: {
      name: "Please enter a tea type name",
      brewTime: "Please enter a tea brew time"
    },
    loadingStatus: "inprogress"
  };

  initialState = this.state;

  handleBlur = field => () => {
    this.setState(state => ({
      touched: { ...state.touched, [field]: true }
    }));
  };

  handleNameChange = event => {
    this.setState({
      teaType: {
        ...this.state.teaType,
        name: event.currentTarget.value
      }
    });
  };

  handleBrewTimeMinChange = event => {
    this.setState({
      teaType: {
        ...this.state.teaType,
        brewTimeMin: event.currentTarget.value
      }
    });
  };

  handleBrewTimeSecChange = event => {
    const newSec =
      (event.currentTarget.value < 10 ? "0" : "") +
      Number(event.currentTarget.value);
    this.setState({
      teaType: {
        ...this.state.teaType,
        brewTimeSec: newSec
      }
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const namevalid = nameSchema.isValidSync(this.state.teaType);
    const brewtimeminvalid = brewTimeMinSchema.isValidSync(this.state.teaType);
    const brewtimesecvalid = brewTimeSecSchema.isValidSync(this.state.teaType);
    const brewtimevalid =
      brewTimeMinSchema.isValidSync(this.state.teaType) &&
      brewTimeSecSchema.isValidSync(this.state.teaType);

    const typeData = {
      id: this.state.teaType.id,
      userID: this.state.userID,
      globalID: this.state.teaType.globalID,
      name: this.state.teaType.name,
      brewTime: convertTimeToSec(
        this.state.teaType.brewTimeMin,
        Number(this.state.teaType.brewTimeSec)
      ),
      visible: true
    };

    if (namevalid && brewtimevalid) {
      if (this.props.edit === true) {
        this.props
          .editTeaType(this.props.userID, typeData)
          .then(() => {
            this.props.editFlash("success");
          })
          .then(() => this.props.onModalClose());
      } else {
        this.props
          .addTeaType(this.props.userID, typeData)
          .then(() => {
            this.props.editFlash("success");
          })
          .then(() => this.props.onModalClose());
      }
    } else {
      this.setState(state => ({
        inputValidation: {
          ...state.errors,
          name: namevalid,
          brewTime: brewtimevalid,
          brewTimeMin: brewtimeminvalid,
          brewTimeSec: brewtimesecvalid
        }
      }));
    }
  };

  componentDidMount() {
    if (this.props.currentTeaType) {
      this.setState({
        teaType: {
          id: this.props.currentTeaType.id,
          globalID: this.props.currentTeaType.globalID,
          name: this.props.currentTeaType.name,
          brewTimeMin: convertTimeToMinSec(this.props.currentTeaType.brewTime)
            .minute,
          brewTimeSec: convertTimeToMinSec(this.props.currentTeaType.brewTime)
            .seconds,
          visible: this.props.currentTeaType.visible
        },
        loadingStatus: "complete"
      });
    } else {
      this.setState({ loadingStatus: "complete" });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.currentTeaType &&
      this.props.currentTeaType.id !== prevProps.currentTeaType.id
    ) {
      this.setState({
        teaType: {
          id: this.props.currentTeaType.id,
          globalID: this.props.currentTeaType.globalID,
          name: this.props.currentTeaType.name,
          brewTimeMin: convertTimeToMinSec(this.props.currentTeaType.brewTime)
            .minute,
          brewTimeSec: convertTimeToMinSec(this.props.currentTeaType.brewTime)
            .seconds,
          visible: this.props.currentTeaType.visible
        },
        loadingStatus: "complete"
      });
    }
  }

  render() {
    if (this.state.loadingStatus !== "complete") {
      return (
        <div data-testid="loadingmessage" className="pageloader is-active">
          <span className="title">Loading</span>
        </div>
      );
    } else {
      return (
        <div
          className="modal is-active has-text-centered"
          data-testid="teatypeeditor"
        >
          <div className="modal-background"></div>
          <div className="modal-card">
            <section className="modal-card-body">
              {!validationComplete(this.state.inputValidation) && (
                <div
                  className="notification is-danger"
                  data-testid="incompletenotice"
                >
                  Please enter the tea type details.
                </div>
              )}

              {this.props.serverErrors && this.props.serverErrors.duplicate && (
                <div
                  className="notification is-danger"
                  data-testid="duplicatenotice"
                >
                  This tea type already exists in our system. Please try again.
                </div>
              )}

              <form
                onSubmit={this.handleFormSubmit}
                data-testid="teatypeeditorform"
              >
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
                    value={this.state.teaType.name}
                    className="input"
                    valid={this.state.inputValidation.name}
                    errorMessage={this.state.errorMessages.name}
                    errorClass="is-danger"
                    onChange={this.handleNameChange}
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
                        value={this.state.teaType.brewTimeMin}
                        className="input is-one-fifth"
                        valid={this.state.inputValidation.brewTimeMin}
                        errorClass="input is-danger is-one-fifth"
                        onChange={this.handleBrewTimeMinChange}
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
                        value={this.state.teaType.brewTimeSec}
                        className="input is-one-fifth"
                        valid={this.state.inputValidation.brewTimeSec}
                        errorClass="input is-danger is-one-fifth"
                        onChange={this.handleBrewTimeSecChange}
                      />
                    </div>
                  </div>
                  {!this.state.inputValidation.brewTime && (
                    <p className="help is-danger" data-testid="inputerror">
                      {this.state.errorMessages.brewTime}
                    </p>
                  )}
                </div>
                <div className="is-centered">
                  <button
                    data-testid="canceltimer"
                    className="button"
                    type="button"
                    onClick={this.props.onModalClose}
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
  }
}

const mapStateToProps = (state, ownProps) => {
  const teaTypeID = state.teaTypes.allTeaTypes[ownProps.teaTypeID];
  return {
    userID: state.auth.user.id,
    currentTeaType: teaTypeID,
    edit: teaTypeID ? true : false,
    serverErrors: state.errors.serverErrors
  };
};

const mapDispatchToProps = {
  editTeaType,
  addTeaType,
  editFlash
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaTypeEditorModal);

export const TeaTypeEditorModalClass = TeaTypeEditorModal;

TeaTypeEditorModal.propTypes = {
  userID: PropTypes.string.isRequired,
  currentTeaType: teaTypeShape,
  edit: PropTypes.bool,
  history: PropTypes.object,
  serverErrors: PropTypes.object,
  editTeaType: PropTypes.func.isRequired,
  editFlash: PropTypes.func.isRequired,
  addTeaType: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};
