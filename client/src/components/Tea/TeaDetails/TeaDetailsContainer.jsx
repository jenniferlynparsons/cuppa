import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeas, editTea } from "../../../actions/teaActions";
import { getTeaTypes } from "../../../actions/teaTypeActions";
import { editTeaFlash } from "../../../actions/flashActions";
import { selectBrewTime } from "../../../reducers/teaTypesReducers";
import { TeaDetails } from "./TeaDetails";

class TeaDetailsContainer extends Component {
  state = {
    showTimer: false
  };

  updateFlash = status => {
    this.props.editTeaFlash(status);
  };

  handleOpenTimer = () => {
    this.setState({ showTimer: true });
  };
  handleCloseTimer = () => {
    this.setState({ showTimer: false });
  };
  handleTimerUpdateQty = updatedTea => {
    this.props.editTea(updatedTea);
  };

  componentDidMount() {
    this.props.getTeas(this.props.userID);
    this.props.getTeaTypes(this.props.userID);
  }

  render() {
    return !this.props.tea ? null : (
      <TeaDetails
        tea={this.props.tea}
        brewTime={this.props.brewTime}
        showTimer={this.state.showTimer}
        flash={this.props.flash}
        updateFlash={this.updateFlash}
        handleOpenTimer={this.handleOpenTimer}
        handleCloseTimer={this.handleCloseTimer}
        handleTimerUpdateQty={this.handleTimerUpdateQty}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    brewTime: selectBrewTime(state, ownProps),
    tea: state.teas.allTeas[ownProps.match.params.id],
    flash: state.flash,
    userID: state.auth.user.id
  };
};

const mapDispatchToProps = {
  editTeaFlash,
  editTea,
  getTeas,
  getTeaTypes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaDetailsContainer);

export const TeaDetailsContainerClass = TeaDetailsContainer;
