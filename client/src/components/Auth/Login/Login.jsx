import React from "react";
import { Link } from "react-router-dom";
import InputField from "../../FormComponents/InputField/InputField";

export class Login extends React.PureComponent {
  render() {
    return (
      <div className="container content" data-testid="login">
        <Link to="/">Back to home</Link>
        <h1>Login</h1>
        <p>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
        {!this.props.errors.incomplete && (
          <div
            className="notification is-danger"
            data-testid="incompletenotice"
          >
            Please provide a valid email address and password
          </div>
        )}
        {!this.props.errors.emailNotFound && (
          <div className="notification is-danger" data-testid="notfoundnotice">
            This email does not exist in our system. Please try again or{" "}
            <Link to="/register">register</Link> for an account.
          </div>
        )}
        <form noValidate={true} onSubmit={this.props.onSubmit}>
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
            <div className="control">
              <button
                data-testid="submit"
                type="submit"
                className="button is-primary"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
