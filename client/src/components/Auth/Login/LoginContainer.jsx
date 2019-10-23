import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authShape } from "../../../lib/propTypes";
import { emailSchema, passwordSchema } from "../../../lib/validationSchemas";
import { loginAction } from "../../../actions/authActions";
import { Login } from "./Login";

class LoginContainer extends Component {
  state = {
    email: "",
    password: "",
    inputValidation: {
      email: true,
      password: true
    },
    errorMessages: {
      email: "Please enter a valid email address",
      password: "Please enter a valid password",
      passwordIncorrect: "The password is incorrect. Please try again."
    },
    loadingStatus: "inprogress"
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
        inputValidation: {
          ...state.inputValidation,
          email: emailvalid,
          password: passvalid
        }
      }));
    }
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    } else {
      this.setState({ loadingStatus: "complete" });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuthenticated && !prevProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
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
        <Login
          email={this.state.email}
          password={this.state.password}
          inputValidation={this.state.inputValidation}
          serverErrors={this.props.serverErrors}
          errorMessages={this.state.errorMessages}
          onChange={this.handleInputChange}
          onSubmit={this.handleFormSubmit}
        />
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  serverErrors: state.errors.serverErrors
});

export default connect(
  mapStateToProps,
  { loginAction }
)(LoginContainer);

export const LoginContainerComponent = LoginContainer;

LoginContainer.propTypes = {
  auth: authShape.isRequired,
  history: PropTypes.object,
  loginAction: PropTypes.func.isRequired,
  serverErrors: PropTypes.object
};
