import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
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
    // If logged in and user navigates to Register page, should redirect them to dashboard
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
    const { errors } = this.state;

    return (
      <div className="container content">
        <Link to="/">Back to home</Link>
        <h1>Register</h1>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        <form noValidate={true} onSubmit={this.onSubmit}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
                className={classnames("input", {
                  invalid: "input is-danger"
                })}
              />
            </div>
            <span className="help is-danger">{errors.name}</span>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("input", {
                  invalid: "input is-danger"
                })}
              />
            </div>
            <span className="help is-danger">{errors.email}</span>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("input", {
                  invalid: "input is-danger"
                })}
              />
            </div>
            <span className="help is-danger">{errors.password}</span>
          </div>
          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                id="password2"
                type="password"
                className={classnames("input", {
                  invalid: "input is-danger"
                })}
              />
            </div>
            <span className="help is-danger">{errors.password2}</span>
          </div>
          <div className="field">
            <button type="submit" className="button is-primary">
              Sign up
            </button>
          </div>
        </form>
      </div>
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
)(Register);
