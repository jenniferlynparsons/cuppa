import React, { Component } from "react";
import { connect } from "react-redux";
import { emailSchema, passwordSchema } from "../../../lib/validationSchemas";
import { loginAction } from "../../../actions/authActions";
import { Login } from "./Login";

class LoginContainer extends Component {
  state = {
    email: "",
    password: "",
    errors: {
      email: true,
      emailNotFound: !this.props.serverErrors ? false : true,
      password: true,
      incomplete: true
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

    const emailvalid = emailSchema.isValidSync(userData);
    const passvalid = passwordSchema.isValidSync(userData);

    if (emailvalid && passvalid) {
      this.props.loginAction(userData);
    } else {
      this.setState(state => ({
        errors: {
          ...state.errors,
          email: emailvalid,
          emailNotFound: true,
          password: passvalid,
          incomplete: false
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
          emailNotFound: false
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
