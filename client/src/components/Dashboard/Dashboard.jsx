import React from "react";

export class Dashboard extends React.PureComponent {
  render() {
    return (
      <div data-testid="dashboard" className="container content">
        <h1 data-test-id="user-name">
          Hey there, {this.props.auth.user.name.split(" ")[0]}
        </h1>
        <div className="columns">
          <div className="column is-two-thirds">
            <h2>Your stats</h2>
            <p data-test-id="tea-count">
              You currently have XX teas in your collection
            </p>
          </div>
          <div className="column is-one-third">
            <p data-test-id="user-email">
              You are logged in as {this.props.auth.user.email}
            </p>
            <p>
              <button
                data-testid="logout"
                className="button"
                onClick={this.props.handleLogoutClick}
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
