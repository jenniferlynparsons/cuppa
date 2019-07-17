import React from "react";
import uuidv4 from "uuid/v4";
import { connect } from "react-redux";
import { nameSchema, brewTimeSchema } from "../../../lib/validationSchemas";
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
    name: this.props.currentTeaType ? this.props.currentTeaType.name : "",
    brewTime: this.props.currentTeaType
      ? this.props.currentTeaType.brewTime
      : "",
    edit: !!this.props.currentTeaType,
    errors: {
      name: true,
      brewTime: true,
      incomplete: true,
      teaTypeConflict: true
    },
    errorMessages: {
      name: "Please enter a tea type name",
      brand: "Please enter a tea brew time"
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

  handleBrewTimeChange = event => {
    this.setState({
      brewTime: event.currentTarget.value
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
    const brewTimevalid = brewTimeSchema.isValidSync(this.state);

    if (namevalid && brewTimevalid) {
      if (this.state.edit === true) {
        this.props.editTeaType(this.state);
        this.props.editTeaTypeFlash("on");
        this.props.history.push("/teaTypes/");
      } else {
        this.props.addTeaType(this.state);
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
          brewTime: "",
          edit: false,
          errors: {
            name: true,
            brewTime: true,
            incomplete: true
          }
        });
      }
    } else {
      this.setState(state => ({
        errors: {
          ...state.errors,
          name: namevalid,
          brewTime: brewTimevalid,
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
        teaTypeID: this.props.currentTeaType.id,
        name: this.props.currentTeaType.name,
        brewTime: this.props.currentTeaType.brewTime,
        edit: true
      });
    }
  }

  render() {
    return (
      <TeaTypeEditor
        name={this.state.name}
        brewTime={this.state.brewTime}
        flash={this.state.flash}
        errors={this.state.errors}
        errorMessages={this.state.errorMessages}
        handleBlur={this.handleBlur}
        handleNameChange={this.handleNameChange}
        handleBrewTimeChange={this.handleBrewTimeChange}
        handleSubmitButton={this.handleSubmitButton}
        handleFormSubmit={this.handleFormSubmit}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    teaTypes: state.teaTypes,
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
