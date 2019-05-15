import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import "./NavBar.scss";

class NavBar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const isLoggedIn = this.props.auth.isAuthenticated;
    return (
      <nav
        className="navbar is-dark"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link
            className="navbar-item"
            to={isLoggedIn ? "/tea-collection" : "/"}
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
              <a className="navbar-link">My Account</a>

              <div className="navbar-dropdown">
                <Link className="navbar-item" to={"/dashboard"}>
                  Dashboard
                </Link>
                <hr className="navbar-divider" />
                <span className="navbar-item">
                  <button
                    className="button is-small is-dark"
                    onClick={this.onLogoutClick}
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
                    isLoggedIn ? "button is-primary" : "button is-disabled"
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavBar);
