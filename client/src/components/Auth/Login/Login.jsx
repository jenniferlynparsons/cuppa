import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

export class Login extends React.PureComponent {
  render() {
    return (
      <div className="container content" data-testid="login">
        <Link to="/">Back to home</Link>
        <h1>Login</h1>
        <p>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
        <form noValidate={true} onSubmit={this.props.onSubmit}>
          <div className="field">
            <label className="label" htmlFor="email">Email</label>
            <div className="control">
              <input
                data-testid="email"
                onChange={this.props.onChange}
                value={this.props.email}
                error={this.props.errors.email}
                id="email"
                type="email"
                className={classnames("input", {
                  invalid: "input is-danger"
                })}
              />
            </div>
            <span className="help is-danger">
              {this.props.errors.email}
              {this.props.errors.emailnotfound}
            </span>
          </div>
          <div className="field">
            <label className="label" htmlFor="password">Password</label>
            <input
              data-testid="password"
              onChange={this.props.onChange}
              value={this.props.password}
              error={this.props.errors.password}
              id="password"
              type="password"
              className={classnames("input", {
                invalid: "input is-danger"
              })}
            />
            <span className="help is-danger">
              {this.props.errors.password}
              {this.props.errors.passwordincorrect}
            </span>
          </div>
          <div className="field">
            <div className="control">
              <button
                type="submit"
                className="button is-primary"
                data-testid="submit"
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

