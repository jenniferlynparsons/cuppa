import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Dashboard from "./Dashboard";

class DashboardContainer extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <Dashboard auth={this.props.auth} onLogoutClick={this.onLogoutClick} />
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
