import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { teaShape } from "../../../lib/propTypes";
import { getTeas, editTea } from "../../../actions/teaActions";
import { getTeaTypes } from "../../../actions/teaTypeActions";
import { editFlash, clearFlash } from "../../../actions/flashActions";
import { setModalID } from "../../../actions/modalActions";
import { selectSingleTeaType } from "../../../selectors";
import { TeaDetails } from "./TeaDetails";

class TeaDetailsContainer extends React.Component {
  state = {
    showTimer: false,
    flash: "off",
    loadingStatus: "inprogress"
  };

  updateFlash = status => {
    this.props.editFlash(status);
  };

  handleOpenTimer = id => {
    this.props.setModalID("SET_MODAL_ID", id);
  };

  handleCloseTimer = () => {
    this.props.setModalID("SET_MODAL_ID", "");
  };
  handleTimerUpdateQty = updatedTea => {
    this.props.editTea(updatedTea);
  };

  componentDidMount() {
    this.setState({ flash: this.props.flash });
    this.props.clearFlash();
    this.props.getTeas(this.props.userID);
    this.props.getTeaTypes(this.props.userID).then(() => this.setState({ loadingStatus: "complete" }));
  }

  render() {
    if (this.state.loadingStatus !== "complete") {
      return (
        <div data-testid="loadingmessage" className="pageloader is-active">
          <span className="title">Loading</span>
        </div>
      );
    } else {
      return <TeaDetails tea={this.props.tea} teaType={this.props.teaType} timerID={this.props.modalID} flash={this.state.flash} updateFlash={this.updateFlash} onOpenTimer={this.handleOpenTimer} onCloseTimer={this.handleCloseTimer} />;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const teatype = selectSingleTeaType(state, ownProps);

  return {
    brewTime: teatype && teatype.brewTime,
    teaType: teatype && teatype.name,
    tea: state.teas.allTeas[ownProps.match.params.id],
    flash: state.flash,
    userID: state.auth.user.id,
    timerID: state.modal.modalID
  };
};

const mapDispatchToProps = {
  editFlash,
  clearFlash,
  editTea,
  getTeas,
  getTeaTypes,
  setModalID
};

export default connect(mapStateToProps, mapDispatchToProps)(TeaDetailsContainer);

export const TeaDetailsContainerClass = TeaDetailsContainer;

TeaDetailsContainer.propTypes = {
  flash: PropTypes.string,
  userID: PropTypes.string.isRequired,
  tea: teaShape.isRequired,
  teaType: PropTypes.string.isRequired,
  timerID: PropTypes.string.isRequired,
  editFlash: PropTypes.func.isRequired,
  setModalID: PropTypes.func.isRequired,
  clearFlash: PropTypes.func.isRequired,
  getTeas: PropTypes.func.isRequired,
  getTeaTypes: PropTypes.func.isRequired
};
