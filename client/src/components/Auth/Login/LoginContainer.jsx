import React, { Component } from "react";
import { connect } from "react-redux";
import { loginAction } from "../../../actions/authActions";
import { Login } from "./Login";

class LoginContainer extends Component {
  state = {
    email: "",
    password: ""
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

    this.props.loginAction(userData);
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
  }

  render() {
    return (
      <Login
        email={this.state.email}
        password={this.state.password}
        onChange={this.handleInputChange}
        onSubmit={this.handleFormSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginAction }
)(LoginContainer);

export const LoginContainerComponent = LoginContainer;
