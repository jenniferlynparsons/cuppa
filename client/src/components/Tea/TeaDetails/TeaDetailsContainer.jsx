/* eslint-disable no-console */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteTea, getTeas } from "../../../actions/teaActions";
import { TeaDetails } from "./TeaDetails";
import { editTeaFlash } from "../../../actions/flashActions";

class TeaDetailsContainer extends Component {
  clickHandler = (e, status) => {
    this.props.updateFlash(status);
  };

  componentDidMount() {
    this.props.getTeaList(this.props.userID);
  }

  render() {
    return !this.props.tea ? null : (
      <TeaDetails
        tea={this.props.tea}
        flash={this.props.flash}
        onClick={this.clickHandler}
        updateFlash={this.props.updateFlash}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tea: state.teas.allTeas[ownProps.match.params.id] || {},
    flash: state.flash,
    userID: state.auth.user.id
  };
};

const mapDispatchToProps = dispatch => ({
  handleDelete: tea => {
    dispatch(deleteTea(tea));
  },
  updateFlash: status => {
    dispatch(editTeaFlash(status));
  },
  getTeaList: userIDNum => {
    dispatch(getTeas(userIDNum));
  }
});

// TODO figure out the typings mismatch
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TeaDetailsContainer)
);
