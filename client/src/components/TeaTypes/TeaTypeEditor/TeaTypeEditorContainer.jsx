import React from "react";
import uuidv4 from "uuid/v4";
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
import { editTeaTypeFlash } from "../../../actions/flashActions";
import { TeaTypeEditor } from "./TeaTypeEditor";

export class TeaTypeEditorContainer extends React.Component {
  state = {
    flash: {
      name: "",
      teaTypeID: ""
    },
    touched: {
      name: false
    },
    userID: this.props.userID,
    teaTypeID: this.props.currentTeaType ? this.props.currentTeaType.id : "",
    name: this.props.currentTeaType ? this.props.currentTeaType.name : "",
    brewTimeMin: this.props.currentTeaType
      ? convertTimeToMinSec(this.props.currentTeaType.brewTime).minute
      : "",
    brewTimeSec: this.props.currentTeaType
      ? convertTimeToMinSec(this.props.currentTeaType.brewTime).seconds
      : "",
    edit: !!this.props.currentTeaType,
    errors: {
      name: true,
      brewTime: true,
      brewTimeMin: true,
      brewTimeSec: true,
      incomplete: true,
      teaTypeConflict: true
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
    if (!this.state.teaTypeID) {
      this.setState({
        teaTypeID: uuidv4()
      });
    }

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
      teaTypeID: this.state.teaTypeID,
      name: this.state.name,
      brewTime: convertTimeToSec(
        this.state.brewTimeMin,
        Number(this.state.brewTimeSec)
      )
    };

    if (namevalid && brewtimevalid) {
      if (this.state.edit === true) {
        this.props.editTeaType(typeData);
        this.props.editTeaTypeFlash("on");
        this.props.history.push("/tea-types/");
      } else {
        this.props.addTeaType(typeData);
        this.setState({
          flash: {
            name: this.state.name,
            teaTypeID: this.state.teaTypeID
          },
          touched: {
            name: false
          },
          teaTypeID: "",
          userID: this.props.userID,
          name: "",
          brewTimeMin: "",
          brewTimeSec: "",
          edit: false,
          errors: {
            name: true,
            brewTime: true,
            brewTimeMin: true,
            brewTimeSec: true,
            incomplete: true,
            teaTypeConflict: true
          }
        });
      }
    } else {
      this.setState(state => ({
        errors: {
          ...state.errors,
          name: namevalid,
          brewTime: brewtimevalid,
          brewTimeMin: brewtimeminvalid,
          brewTimeSec: brewtimesecvalid,
          incomplete: false
        }
      }));
    }
  };

  componentDidMount() {
    this.props.getTeaTypes(this.props.userID);

    if (this.props.serverErrors && this.props.serverErrors.teaTypeConflict) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          teaTypeConflict: false
        }
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
        teaID: this.props.currentTeaType.id,
        name: this.props.currentTeaType.name,
        brewTimeMin: convertTimeToMinSec(this.props.currentTeaType.brewTime)
          .minute,
        brewTimeSec: convertTimeToMinSec(this.props.currentTeaType.brewTime)
          .seconds,
        edit: true
      });
    }
  }

  render() {
    return (
      <TeaTypeEditor
        name={this.state.name}
        brewTimeMin={this.state.brewTimeMin}
        brewTimeSec={this.state.brewTimeSec}
        flash={this.state.flash}
        errors={this.state.errors}
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
    serverErrors: state.auth.errors
  };
};

const mapDispatchToProps = {
  editTeaType,
  addTeaType,
  editTeaTypeFlash,
  getTeaTypes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaTypeEditorContainer);

export const TeaTypeEditorContainerClass = TeaTypeEditorContainer;
