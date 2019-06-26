import React, { Component } from "react";
import { connect } from "react-redux";
import { loginAction } from "../../../actions/authActions";
import { Login } from "./Login"

class LoginContainer extends Component {
  state = {
    email: "",
    password: "",
    errors: {
      email: "",
      emailnotfound: "",
      password: "",
      passwordincorrect: ""
    }
  };

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.handleSubmit(userData);
  };

  render() {
    return (
      <Login
      onChange={this.onChange}
      onSubmit={this.onSubmit}
      email={this.state.email}
      password={this.state.password}
      errors={this.state.errors}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: userData => {
    dispatch(loginAction(userData));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);

export const LoginContainerComponent = LoginContainer;
