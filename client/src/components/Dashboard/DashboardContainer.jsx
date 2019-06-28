import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Dashboard } from "./Dashboard";

class DashboardContainer extends Component {
  handleLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return !this.props ? null : (
      <Dashboard
        auth={this.props.auth}
        handleLogoutClick={this.handleLogoutClick}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(DashboardContainer);

export const DashboardContainerComponent = DashboardContainer;
