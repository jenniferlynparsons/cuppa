import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { teaShape } from "../../../lib/propTypes";
import { editTea } from "../../actions/teaActions";
import { selectSingleTeaType } from "../../selectors";
import { Timer } from "./Timer";

class TimerContainer extends React.Component {
  state = {
    loadingStatus: "inprogress",
    timerOn: false,
    timerStart: 0,
    timerTime: this.props.brewTime ? this.props.brewTime : 0,
    tea: {
      id: this.props.tea ? this.props.tea.id : "",
      servings: this.props.tea ? this.props.tea.servings : ""
    },
    originalServings: this.props.tea ? this.props.tea.servings : ""
  };

  handleStartTimer = () => {
    this.startTimer();
  };

  handlePauseTimer = () => {
    this.stopTimer();
  };

  handleResumeTimer = () => {
    this.startTimer();
  };

  handleCancelTimer = () => {
    this.stopTimer();
    this.resetTimer();
    this.props.onCloseTimer();
  };

  handleFinishTimer = () => {
    if (this.state.tea.servings === this.state.originalServings) {
      this.setState(
        {
          tea: { ...this.state.tea, servings: this.state.tea.servings - 1 }
        },
        () => {
          this.resetTimer();
          this.props.onCloseTimer();
          this.props.editTea(this.state.tea);
        }
      );
    }
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerStart: this.state.timerTime
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 1;
      this.setState({
        timerTime: newTime
      });
      if (newTime === 0) {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
      }
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };

  resetTimer = () => {
    this.setState({
      timerOn: false,
      timerTime: this.props.brewTime
    });
  };

  componentDidMount() {
    this.setState({
      tea: this.props.tea,
      originalServings: this.props.tea.servings,
      timerTime: this.props.brewTime,
      loadingStatus: "complete"
    });
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
        <Timer
          teaName={this.state.tea.name}
          brewTime={this.props.brewTime}
          timerOn={this.state.timerOn}
          timerTime={this.state.timerTime}
          onStartTimer={this.handleStartTimer}
          onPauseTimer={this.handlePauseTimer}
          onResumeTimer={this.handleResumeTimer}
          onCancelTimer={this.handleCancelTimer}
          onFinishTimer={this.handleFinishTimer}
        />
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const tea = state.teas.allTeas[ownProps.timerID];
  const teatype = selectSingleTeaType(state, ownProps);

  return {
    id: ownProps.timerID,
    brewTime: teatype.brewTime,
    teaType: teatype.name,
    tea: tea,
    userID: state.auth.user.id
  };
};

const mapDispatchToProps = {
  editTea
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerContainer);

export const TimerContainerClass = TimerContainer;

TimerContainer.propTypes = {
  brewTime: PropTypes.number.isRequired,
  tea: teaShape.isRequired,
  handleCloseTimer: PropTypes.func.isRequired,
  editTea: PropTypes.func.isRequired
};
