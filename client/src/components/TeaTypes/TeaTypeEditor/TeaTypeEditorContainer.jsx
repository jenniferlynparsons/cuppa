import React from "react";
import { connect } from "react-redux";
import {
  convertTimeToMinSec,
  convertTimeToSec
} from "../../../lib/timeConverter";
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
import { TeaTypeEditor } from "./TeaTypeEditor";

export class TeaTypeEditorContainer extends React.Component {
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
      brewTimeSec: true,
      complete: true,
      duplicate: true
    },
    errorMessages: {
      name: "Please enter a tea type name",
      brewTime: "Please enter a tea brew time"
    }
  };

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

  handleSubmitButton = () => {
    this.setState(state => ({
      touched: {
        ...state.touched
      }
    }));
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
          .editTeaType(typeData)
          .then(this.props.editFlash("success"))
          .then(this.props.history.push("/tea-types/"));
      } else {
        this.props.addTeaType(typeData).then(
          this.setState({
            flash: {
              name: this.state.name
            },
            touched: {
              name: false
            },
            id: "",
            userID: this.props.userID,
            name: "",
            brewTimeMin: "",
            brewTimeSec: "",
            inputValidation: {
              name: true,
              brewTime: true,
              brewTimeMin: true,
              brewTimeSec: true,
              complete: true,
              duplicate: true
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
          brewTimeSec: brewtimesecvalid,
          complete: false,
          duplicate: true
        }
      }));
    }
  };

  componentDidMount() {
    this.props.getTeaTypes(this.props.userID);
    if (this.props.serverErrors && this.props.serverErrors.duplicate) {
      this.setState(state => ({
        inputValidation: {
          ...state.inputValidation,
          duplicate: false
        },
        flash: { name: "" }
      }));
    }
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
    if (this.props.serverErrors && !prevProps.serverErrors) {
      this.setState(state => ({
        inputValidation: {
          ...state.inputValidation,
          duplicate: false
        },
        flash: { name: "" }
      }));
    }
  }

  render() {
    return (
      <TeaTypeEditor
        name={this.state.name}
        brewTimeMin={this.state.brewTimeMin}
        brewTimeSec={this.state.brewTimeSec}
        flash={this.state.flash}
        inputValidation={this.state.inputValidation}
        errorMessages={this.state.errorMessages}
        handleBlur={this.handleBlur}
        handleNameChange={this.handleNameChange}
        handleBrewTimeMinChange={this.handleBrewTimeMinChange}
        handleBrewTimeSecChange={this.handleBrewTimeSecChange}
        handleSubmitButton={this.handleSubmitButton}
        handleFormSubmit={this.handleFormSubmit}
      />
    );
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
)(TeaTypeEditorContainer);

export const TeaTypeEditorContainerClass = TeaTypeEditorContainer;
