import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

class RegisterContainer extends React.PureComponent {
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
              <input
                data-testid="name"
                onChange={this.props.onChange}
                value={this.props.name}
                error={this.props.errors.name}
                id="name"
                type="text"
                className={classnames("input", {
                  invalid: "input is-danger"
                })}
              />
            </div>
            <span className="help is-danger">{this.props.errors.name}</span>
          </div>
          <div className="field">
            <label className="label" htmlFor="email">
              Email
            </label>
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
            <span className="help is-danger">{this.props.errors.email}</span>
          </div>
          <div className="field">
            <label className="label" htmlFor="password">
              Password
            </label>
            <div className="control">
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
            </div>
            <span className="help is-danger">{this.props.errors.password}</span>
          </div>
          <div className="field">
            <label className="label" htmlFor="password2">
              Confirm Password
            </label>
            <div className="control">
              <input
                data-testid="password2"
                onChange={this.props.onChange}
                value={this.props.password2}
                error={this.props.errors.password2}
                id="password2"
                type="password"
                className={classnames("input", {
                  invalid: "input is-danger"
                })}
              />
            </div>
            <span className="help is-danger">
              {this.props.errors.password2}
            </span>
          </div>
          <div className="field">
            <button
              type="submit"
              className="button is-primary"
              data-testid="submit"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterContainer;
