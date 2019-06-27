import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import NavBar from "./NavBar";

class NavBarContainer extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    return <NavBar auth={this.props.auth} onLogoutClick={this.onLogoutClick} />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavBarContainer);

export const NavBarContainerComponent = NavBarContainer;
