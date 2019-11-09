import React from "react";
import { Link } from "react-router-dom";
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
import {
  editTeaType,
  addTeaType,
  getTeaTypes
} from "../../../actions/teaTypeActions";
import { editFlash } from "../../../actions/flashActions";
import { validationComplete } from "../../../lib/validationComplete";
import InputField from "../../FormComponents/InputField";

export class TeaTypeEditorModalContainer extends React.Component {
  state = {
    flash: {
      name: ""
    },
    touched: {
      name: false
    },
    userID: this.props.userID,
    id: this.props.currentTeaType ? this.props.currentTeaType.id : "",
    name: this.props.currentTeaType ? this.props.currentTeaType.name : "",
    brewTimeMin: this.props.currentTeaType
      ? convertTimeToMinSec(this.props.currentTeaType.brewTime).minute
      : "",
    brewTimeSec: this.props.currentTeaType
      ? convertTimeToMinSec(this.props.currentTeaType.brewTime).seconds
      : "",
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
      name: event.currentTarget.value
    });
  };

  handleBrewTimeMinChange = event => {
    this.setState({
      brewTimeMin: event.currentTarget.value
    });
  };

  handleBrewTimeSecChange = event => {
    const newSec =
      (event.currentTarget.value < 10 ? "0" : "") +
      Number(event.currentTarget.value);
    this.setState({
      brewTimeSec: newSec
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const namevalid = nameSchema.isValidSync(this.state);
    const brewtimeminvalid = brewTimeMinSchema.isValidSync(this.state);
    const brewtimesecvalid = brewTimeSecSchema.isValidSync(this.state);
    const brewtimevalid =
      brewTimeMinSchema.isValidSync(this.state) &&
      brewTimeSecSchema.isValidSync(this.state);

    const typeData = {
      userID: this.state.userID,
      id: this.state.id,
      name: this.state.name,
      brewTime: convertTimeToSec(
        this.state.brewTimeMin,
        Number(this.state.brewTimeSec)
      )
    };

    if (namevalid && brewtimevalid) {
      if (this.props.edit === true) {
        this.props
          .editTeaType(this.props.userID, typeData)
          .then(() => this.props.editFlash("success"))
          .then(() => this.props.history.push("/teaTypes/"));
      } else {
        this.props.addTeaType(this.props.userID, typeData).then(() =>
          this.setState({
            ...this.initialState,
            loadingStatus: "complete",
            flash: {
              name: this.state.name
            }
          })
        );
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
    return this.props.getTeaTypes(this.props.userID).then(() => {
      return this.setState({ loadingStatus: "complete" });
    });
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.currentTeaType && !prevProps.currentTeaType) ||
      (this.props.currentTeaType &&
        this.props.currentTeaType.id !== prevProps.currentTeaType.id)
    ) {
      this.setState({
        id: this.props.currentTeaType.id,
        name: this.props.currentTeaType.name,
        brewTimeMin: convertTimeToMinSec(this.props.currentTeaType.brewTime)
          .minute,
        brewTimeSec: convertTimeToMinSec(this.props.currentTeaType.brewTime)
          .seconds
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
        <div className="container" data-testid="teatypeeditor">
          {this.state.flash.name && (
            <p className="notification is-success" data-testid="flash">
              {this.state.flash.name} has been succesfully saved.{" "}
              <Link to={"/teaTypes/"}>View all types.</Link>
            </p>
          )}

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

          <form onSubmit={this.onFormSubmit} data-testid="teatypeeditorform">
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
                value={this.state.name}
                className="input"
                valid={this.state.inputValidation.name}
                errorMessage={this.state.errorMessages.name}
                errorClass="is-danger"
                onChange={this.onNameChange}
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
                    value={this.state.brewTimeMin}
                    className="input is-one-fifth"
                    valid={this.state.inputValidation.brewTimeMin}
                    errorClass="input is-danger is-one-fifth"
                    onChange={this.onBrewTimeMinChange}
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
                    value={this.state.brewTimeSec}
                    className="input is-one-fifth"
                    valid={this.state.inputValidation.brewTimeSec}
                    errorClass="input is-danger is-one-fifth"
                    onChange={this.onBrewTimeSecChange}
                  />
                </div>
              </div>
              {!this.state.inputValidation.brewTime && (
                <p className="help is-danger" data-testid="inputerror">
                  {this.state.errorMessages.brewTime}
                </p>
              )}
            </div>
            <div className="control">
              <button data-testid="submit" className="button is-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userID: state.auth.user.id,
    currentTeaType: state.teaTypes.allTeaTypes[ownProps.match.params.id],
    edit: state.teaTypes.allTeaTypes[ownProps.match.params.id] ? true : false,
    serverErrors: state.errors.serverErrors
  };
};

const mapDispatchToProps = {
  editTeaType,
  addTeaType,
  editFlash,
  getTeaTypes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaTypeEditorModalContainer);

export const TeaTypeEditorModalContainerClass = TeaTypeEditorModalContainer;

TeaTypeEditorModalContainer.propTypes = {
  userID: PropTypes.string.isRequired,
  currentTeaType: teaTypeShape,
  edit: PropTypes.bool,
  history: PropTypes.object,
  serverErrors: PropTypes.object,
  editTeaType: PropTypes.func.isRequired,
  editFlash: PropTypes.func.isRequired,
  addTeaType: PropTypes.func.isRequired,
  getTeaTypes: PropTypes.func.isRequired
};
