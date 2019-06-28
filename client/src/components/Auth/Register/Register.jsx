import React from "react";
import { Link } from "react-router-dom";
import InputField from "../../FormComponents/InputField/InputField";

export class Register extends React.PureComponent {
  render() {
    return (
      <div className="container content" data-testid="register">
        <Link to="/">Back to home</Link>
        <h1>Register</h1>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        <form noValidate={true} onSubmit={this.props.onSubmit}>
          <div className="field">
            <label className="label" htmlFor="name">
              Name
            </label>
            <div className="control">
              <InputField
                datatestid="name"
                id="name"
                type="text"
                value={this.props.name}
                className="input"
                onChange={this.props.onChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="email">
              Email
            </label>
            <div className="control">
              <InputField
                datatestid="email"
                id="email"
                type="email"
                value={this.props.email}
                className="input"
                onChange={this.props.onChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="password">
              Password
            </label>
            <div className="control">
              <InputField
                datatestid="password"
                id="password"
                type="password"
                value={this.props.password}
                className="input"
                onChange={this.props.onChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="password2">
              Confirm Password
            </label>
            <div className="control">
              <InputField
                datatestid="password2"
                id="password2"
                type="password"
                value={this.props.password2}
                className="input"
                onChange={this.props.onChange}
              />
            </div>
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
