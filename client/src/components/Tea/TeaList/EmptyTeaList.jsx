import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";

export class EmptyTeaList extends React.Component {
  render() {
    return (
      <tr>
        {this.props.filtered ? (
          <td>
            There are no teas that meet your filter criteria, please try again.
          </td>
        ) : (
          <td>
            You don't have any teas yet! Why not{" "}
            <Link to={this.props.auth.isAuthenticated ? "/new-tea" : "/"}>
              add some
            </Link>
            ?
          </td>
        )}
      </tr>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(EmptyTeaList);
