import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="container content" data-testid="landing">
        <h1>Welcome to Cuppa!</h1>
        <p>Organize your tea so you can enjoy it</p>

        <div className="box">
          <h3>Thanks for checking out Cuppa!</h3>
          <p>
            This project is under development and not meant for folks to use
            yet.
          </p>
          <p>
            Currently the teas added are not tied to a particular user and all
            the data may be wiped at any time.
          </p>
          <p>
            You&apos;re free to register an account, but that might get wiped,
            too.
          </p>
          <p>
            Basically, everything is volatile on this site and you
            shouldn&apos;t depend on it to actually store your teas yet.
          </p>
          <h4>
            Follow the project on&#32;
            <a
              href="https://github.com/jenniferlynparsons/cuppa"
              nofollow="true"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </h4>
        </div>
        <p>
          <Link to="/register" className="button is-primary">
            Register
          </Link>
          <Link to="/login" className="button is-primary">
            Log In
          </Link>
        </p>
      </div>
    );
  }
}

export default Landing;
