import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";
import Register from "./Register";

class RegisterContainer extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {
      name: "",
      email: "",
      emailnotfound: "",
      password: "",
      password2: "",
      passwordincorrect: ""
    }
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    return (
      <Register
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        email={this.state.email}
        password={this.state.password}
        password2={this.state.password2}
        errors={this.state.errors}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(RegisterContainer);

export const RegisterContainerComponent = RegisterContainer;
