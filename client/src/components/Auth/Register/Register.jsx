import React from "react";
import { Link } from "react-router-dom";
import InputField from "../../FormComponents/InputField/InputField";

export class Register extends React.Component {
  render() {
    return (
      <div className="container content" data-testid="register">
        <Link to="/">Back to home</Link>
        <h1>Register</h1>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        {!this.props.errors.incomplete && (
          <div
            className="notification is-danger"
            data-testid="incompletenotice"
          >
            Please provide a valid email address and password.
          </div>
        )}
        {!this.props.errors.emailAlreadyExists && (
          <div className="notification is-danger" data-testid="notfoundnotice">
            This email already exists in our system. Please try again or{" "}
            <Link to="/login">login</Link> to your account.
          </div>
        )}
        <form noValidate={true} onSubmit={this.props.onSubmit}>
          <div className="field">
            <label className="label" htmlFor="name">
              Name
            </label>
            <InputField
              datatestid="name"
              id="name"
              type="text"
              value={this.props.name}
              className="input"
              error={this.props.errors.name}
              errorMessage={this.props.errorMessages.name}
              errorClass="input is-danger"
              onChange={this.props.onChange}
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="email">
              Email
            </label>
            <InputField
              datatestid="email"
              id="email"
              type="email"
              value={this.props.email}
              className="input"
              error={this.props.errors.email}
              errorMessage={this.props.errorMessages.email}
              errorClass="input is-danger"
              onChange={this.props.onChange}
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="password">
              Password
            </label>

            <InputField
              datatestid="password"
              id="password"
              type="password"
              value={this.props.password}
              className="input"
              error={this.props.errors.password}
              errorMessage={this.props.errorMessages.password}
              errorClass="input is-danger"
              onChange={this.props.onChange}
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="password2">
              Confirm Password
            </label>

            <InputField
              datatestid="password2"
              id="password2"
              type="password"
              value={this.props.password2}
              className="input"
              error={this.props.errors.password2}
              errorMessage={this.props.errorMessages.password2}
              errorClass="input is-danger"
              onChange={this.props.onChange}
            />
          </div>
          <div className="field">
            <button
              data-testid="submit"
              type="submit"
              className="button is-primary"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}
