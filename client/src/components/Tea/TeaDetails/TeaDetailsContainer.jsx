/* eslint-disable no-console */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteTea } from "../../../actions/teaActions";
import { TeaDetails } from "./TeaDetails";
import { editTeaFlash } from "../../../actions/flashActions";

class TeaDetailsContainer extends Component {
  clickHandler = (e, status) => {
    this.props.updateFlash(status);
  };

  render() {
    return (
      <TeaDetails
        tea={this.props.tea}
        flash={this.props.flash}
        onClick={this.clickHandler}
        handleDelete={this.props.handleDelete}
        updateFlash={this.props.updateFlash}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  tea: state.teas.find(tea => tea.id === ownProps.match.params.id),
  flash: state.flash
});

const mapDispatchToProps = dispatch => ({
  handleDelete: tea => {
    dispatch(deleteTea(tea));
  },
  updateFlash: status => {
    dispatch(editTeaFlash(status));
  }
});

// TODO figure out the typings mismatch
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TeaDetailsContainer)
);
