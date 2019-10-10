import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTeas, editTea } from "../../../actions/teaActions";
import { getTeaTypes } from "../../../actions/teaTypeActions";
import { editFlash, clearFlash } from "../../../actions/flashActions";
import { setTimerID } from "../../../actions/timerActions";
import { selectSingleTeaType } from "../../../selectors";
import { TeaDetails } from "./TeaDetails";

class TeaDetailsContainer extends Component {
  state = {
    flash: "off",
    loadingStatus: "inprogress"
  };

  updateFlash = status => {
    this.props.editFlash(status);
  };

  handleOpenTimer = id => {
    this.props.setTimerID(id);
  };

  handleCloseTimer = () => {
    this.props.setTimerID("");
  };

  componentWillMount() {
    this.setState({ flash: this.props.flash });
    this.props.clearFlash();
  }

  componentDidMount() {
    this.props.getTeas(this.props.userID);
    this.props
      .getTeaTypes(this.props.userID)
      .then(() => this.setState({ loadingStatus: "complete" }));
  }

  render() {
    if (this.state.loadingStatus !== "complete") {
      return (
        <div data-testid="loadingmessage" className="pageloader is-active">
          <span className="title">Loading</span>
        </div>
      );
    } else {
      return (
        <TeaDetails
          tea={this.props.tea}
          teaType={this.props.teaType}
          timerID={this.props.timerID}
          flash={this.state.flash}
          updateFlash={this.updateFlash}
          handleOpenTimer={this.handleOpenTimer}
          handleCloseTimer={this.handleCloseTimer}
        />
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const teatype = selectSingleTeaType(state, ownProps);
  return {
    teaType: teatype && teatype.name,
    tea: state.teas.allTeas[ownProps.match.params.id],
    flash: state.flash,
    userID: state.auth.user.id,
    timerID: state.timer.timerID
  };
};

const mapDispatchToProps = {
  editFlash,
  clearFlash,
  editTea,
  getTeas,
  getTeaTypes,
  setTimerID
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaDetailsContainer);

export const TeaDetailsContainerClass = TeaDetailsContainer;

TeaDetailsContainer.defaultProps = {
  tea: {
    name: "",
    brand: "",
    servings: "",
    id: ""
  },
  teaType: "",
  timerID: "",
  userID: ""
};

TeaDetailsContainer.propTypes = {
  flash: PropTypes.string,
  userID: PropTypes.string.isRequired,
  tea: PropTypes.object.isRequired,
  teaType: PropTypes.string.isRequired,
  timerID: PropTypes.string.isRequired,
  editFlash: PropTypes.func.isRequired,
  setTimerID: PropTypes.func.isRequired,
  clearFlash: PropTypes.func.isRequired,
  getTeas: PropTypes.func.isRequired,
  getTeaTypes: PropTypes.func.isRequired
};
