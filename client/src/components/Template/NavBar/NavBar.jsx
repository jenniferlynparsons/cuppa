import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
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
        <div className="container">
          <div className="navbar-brand">
            <Link
              className="navbar-item"
              to={this.props.auth.isAuthenticated ? "/tea-collection" : "/"}
            >
              Cuppa
            </Link>
            <a
              href="# "
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded={this.props.menuActive}
              onClick={this.props.handleNavToggle}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div
            className={[
              "navbar-menu",
              this.props.menuActive ? "is-active" : ""
            ].join(" ")}
          >
            <div className="navbar-start" />
            <div className="navbar-end">
              <Link className="navbar-item" to={"/tea-collection"}>
                Tea Collection
              </Link>
              <div
                className={[
                  "navbar-item has-dropdown",
                  this.props.dropdownActive ? "is-active" : ""
                ].join(" ")}
              >
                <a
                  href="# "
                  role="button"
                  className="navbar-link"
                  aria-label="menu"
                  aria-expanded={this.props.dropdownActive}
                  onClick={this.props.handleDropDownToggle}
                >
                  My Account
                </a>

                <div className="navbar-dropdown">
                  <Link
                    className="navbar-item"
                    to={"/dashboard"}
                    onClick={this.props.handleDropDownToggle}
                  >
                    Dashboard
                  </Link>
                  <Link
                    className="navbar-item"
                    to={"/tea-types"}
                    onClick={this.props.handleDropDownToggle}
                  >
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
        </div>
      </nav>
    );
  }
}

export default NavBar;

NavBar.propTypes = {
  auth: PropTypes.object,
  menuActive: PropTypes.bool,
  dropdownActive: PropTypes.string,
  handleDropDownToggle: PropTypes.func,
  handleLogoutClick: PropTypes.func,
  handleNavToggle: PropTypes.func
};
