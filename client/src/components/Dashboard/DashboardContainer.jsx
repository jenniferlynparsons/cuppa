import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authShape } from "../../lib/propTypes";
import { logoutUser } from "../../actions/authActions";
import { Dashboard } from "./Dashboard";

class DashboardContainer extends React.Component {
  handleLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return !this.props ? null : (
      <Dashboard
        auth={this.props.auth}
        onLogoutClick={this.handleLogoutClick}
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

DashboardContainer.propTypes = {
  auth: authShape.isRequired,
  logoutUser: PropTypes.func.isRequired
};
