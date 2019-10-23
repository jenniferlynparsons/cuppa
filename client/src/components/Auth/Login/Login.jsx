import React from "react";
import { Link } from "react-router-dom";
import { validationComplete } from "../../../lib/validationComplete";
import InputField from "../../FormComponents/InputField/InputField";

export class Login extends React.Component {
  render() {
    return (
      <div className="container content" data-testid="login">
        <Link to="/">Back to home</Link>
        <h1>Login</h1>
        <p>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
        {!validationComplete(this.props.inputValidation) && (
          <p className="notification is-danger" data-testid="incompletenotice">
            Please provide a valid email address and password
          </p>
        )}
        {!this.props.inputValidation.emailNotFound && (
          <p className="notification is-danger" data-testid="notfoundnotice">
            This email does not exist in our system. Please try again or{" "}
            <Link to="/register">register</Link> for an account.
          </p>
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
              valid={this.props.inputValidation.email}
              errorMessage={this.props.errorMessages.email}
              errorClass="is-danger"
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
              valid={this.props.inputValidation.password}
              errorMessage={this.props.errorMessages.password}
              errorClass="is-danger"
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

Login.propTypes = {
  inputValidation: PropTypes.shape({
    email: PropTypes.bool,
    password: PropTypes.bool
  }),
  serverErrors: PropTypes.shape({
    emailNotFound: PropTypes.string,
    passwordIncorrect: PropTypes.string
  }),
  errorMessages: PropTypes.shape({
    passwordIncorrect: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string
  }),
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
