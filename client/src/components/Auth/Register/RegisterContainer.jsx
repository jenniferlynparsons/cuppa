import React, { Component } from "react";
import { connect } from "react-redux";
import {
  emailSchema,
  passwordSchema,
  password2Schema,
  nameSchema
} from "../../../lib/validationSchemas";
import { registerUser } from "../../../actions/authActions";
import { Register } from "./Register";

class RegisterContainer extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    valid: {
      name: true,
      email: true,
      duplicateEmail: true,
      password: true,
      password2: true,
      complete: true
    },
    errorMessages: {
      name: "Please enter a valid name",
      email: "Please enter a valid email address",
      password: "Please enter a valid password",
      password2: "Please make sure the passwords match"
    }
  };

  handleInputChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    const namevalid = nameSchema.isValidSync(newUser);
    const emailvalid = emailSchema.isValidSync(newUser);
    const passvalid = passwordSchema.isValidSync(newUser);
    const pass2valid = password2Schema.isValidSync(newUser);

    const passmatch = newUser.password === newUser.password2;

    if (namevalid && emailvalid && passvalid && pass2valid && passmatch) {
      this.props.registerUser(newUser, this.props.history);
    } else {
      this.setState(state => ({
        valid: {
          ...state.valid,
          name: namevalid,
          email: emailvalid,
          duplicateEmail: true,
          password: passvalid,
          password2: pass2valid === passmatch ? pass2valid : false,
          complete: false
        }
      }));
    }
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (this.props.serverErrors && this.props.serverErrors.duplicateEmail) {
      this.setState(state => ({
        valid: {
          ...state.valid,
          duplicateEmail: false
        }
      }));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.serverErrors.duplicateEmail) {
      this.setState(state => ({
        valid: {
          ...state.valid,
          duplicateEmail: false
        }
      }));
    }
  }

  render() {
    return (
      <Register
        email={this.state.email}
        password={this.state.password}
        password2={this.state.password2}
        valid={this.state.valid}
        errorMessages={this.state.errorMessages}
        onChange={this.handleInputChange}
        onSubmit={this.handleFormSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  serverErrors: state.errors.serverErrors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(RegisterContainer);

export const RegisterContainerComponent = RegisterContainer;
