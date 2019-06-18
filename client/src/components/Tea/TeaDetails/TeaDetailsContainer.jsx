/* eslint-disable no-console */
import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeas } from "../../../actions/teaActions";
import { TeaDetails } from "./TeaDetails";
import { editTeaFlash } from "../../../actions/flashActions";

class TeaDetailsContainer extends Component {
  updateFlash = status => {
    this.props.editTeaFlash(status);
  };

  componentDidMount() {
    this.props.getTeas(this.props.userID);
  }

  render() {
    return !this.props.tea ? null : (
      <TeaDetails
        tea={this.props.tea}
        flash={this.props.flash}
        updateFlash={this.updateFlash}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tea: state.teas.allTeas[ownProps.match.params.id],
    flash: state.flash,
    userID: state.auth.user.id
  };
};

const mapDispatchToProps = {
  editTeaFlash,
  getTeas
};

// TODO figure out the typings mismatch
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaDetailsContainer);
