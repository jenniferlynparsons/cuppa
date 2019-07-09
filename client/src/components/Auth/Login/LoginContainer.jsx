import React, { Component } from "react";
import { connect } from "react-redux";
import { string, object } from "yup";
import { loginAction } from "../../../actions/authActions";
import { Login } from "./Login";

const emailSchema = object({
  email: string()
    .email()
    .required()
});

const passwordSchema = object({
  password: string().required()
});

class LoginContainer extends Component {
  state = {
    email: "",
    password: "",
    errors: {
      email: "valid",
      emailNotFound: this.props.serverErrors ? "invalid" : "valid",
      password: "valid",
      incomplete: "valid"
    },
    errorMessages: {
      email: "Please enter a valid email address",
      password: "Please enter a valid password"
    }
  };

  handleInputChange = e => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    let emailvalidation = emailSchema.isValidSync(userData)
      ? "valid"
      : "invalid";
    let passwordvalidation = passwordSchema.isValidSync(userData)
      ? "valid"
      : "invalid";

    this.setState(state => ({
      errors: {
        ...state.errors,
        email: emailvalidation,
        password: passwordvalidation
      }
    }));

    if (emailvalidation == "valid" && passwordvalidation == "valid") {
      this.props.loginAction(userData);
    } else {
      this.setState(state => ({
        errors: {
          ...state.errors,
          incomplete: "invalid",
          emailNotFound: "valid"
        }
      }));
    }
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.serverErrors.emailNotFound) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          emailNotFound: "invalid"
        }
      }));
    }
  }

  render() {
    return (
      <Login
        email={this.state.email}
        password={this.state.password}
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
  { loginAction }
)(LoginContainer);

export const LoginContainerComponent = LoginContainer;
