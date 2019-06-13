import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div className="container content" data-testid="dashboard">
        <h1 data-test-id="user-name">Hey there, {user.name.split(" ")[0]}</h1>
        <div className="columns">
          <div className="column is-two-thirds">
            <h2>Your stats</h2>
            <p data-test-id="tea-count">
              You currently have XX teas in your collection
            </p>
          </div>
          <div className="column is-one-third">
            <p data-test-id="user-email">You are logged in as {user.email}</p>
            <p>
              <button
                className="button"
                onClick={this.onLogoutClick}
                data-testid="logout"
              >
                Logout
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
