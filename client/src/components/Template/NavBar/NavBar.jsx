import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";

class NavBar extends React.Component {
  render() {
    return (
      <nav
        data-testid="navbar"
        role="navigation"
        className="navbar is-dark"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link
            className="navbar-item"
            to={this.props.auth.isAuthenticated ? "/tea-collection" : "/"}
          >
            Cuppa
          </Link>
        </div>
        <div className="navbar-menu is-active">
          <div className="navbar-start" />
          <div className="navbar-end">
            <Link className="navbar-item" to={"/tea-collection"}>
              Tea Collection
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <a href="/" className="navbar-link">
                My Account
              </a>

              <div className="navbar-dropdown">
                <Link className="navbar-item" to={"/dashboard"}>
                  Dashboard
                </Link>
                <Link className="navbar-item" to={"/tea-types"}>
                  My Tea Types
                </Link>
                <hr className="navbar-divider" />
                <span className="navbar-item">
                  <button
                    data-testid="logout"
                    className="button is-small is-dark"
                    onClick={this.props.handleLogoutClick}
                  >
                    Logout
                  </button>
                </span>
              </div>
            </div>
            <ul>
              <li>
                <Link
                  className={
                    this.props.auth.isAuthenticated
                      ? "button is-primary"
                      : "button is-disabled"
                  }
                  to={"/new-tea"}
                >
                  Add a Tea
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
