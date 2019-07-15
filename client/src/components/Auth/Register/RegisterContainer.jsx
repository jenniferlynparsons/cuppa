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
    errors: {
      name: true,
      email: true,
      emailAlreadyExists: true,
      password: true,
      password2: true,
      incomplete: true
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
        errors: {
          ...state.errors,
          name: namevalid,
          email: emailvalid,
          emailAlreadyExists: true,
          password: passvalid,
          password2: pass2valid === passmatch ? pass2valid : false,
          incomplete: false
        }
      }));
    }
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (this.props.serverErrors && this.props.serverErrors.emailAlreadyExists) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          emailAlreadyExists: false
        }
      }));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.serverErrors.emailAlreadyExists) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          emailAlreadyExists: false
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
        errors={this.state.errors}
        errorMessages={this.state.errorMessages}
        onChange={this.handleInputChange}
        onSubmit={this.handleFormSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  serverErrors: state.auth.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(RegisterContainer);

export const RegisterContainerComponent = RegisterContainer;
