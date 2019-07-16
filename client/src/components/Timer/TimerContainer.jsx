import React from "react";
import { Timer } from "./Timer";

class TimerContainer extends React.Component {
  state = {
    showStartButton: true,
    showPauseButton: false,
    showResumeButton: false,
    showDoneButton: false,
    tea: {
      teaID: this.props.tea ? this.props.tea.id : "",
      name: this.props.tea ? this.props.tea.name : "",
      brand: this.props.tea ? this.props.tea.brand : "",
      teaType: this.props.tea ? this.props.tea.teaType : "",
      servings: this.props.tea ? this.props.tea.servings : ""
    },
    originalServings: this.props.tea ? this.props.tea.servings : ""
  };

  handleStartTimer = () => {
    if (this.state.tea.servings === this.state.originalServings) {
      this.setState({
        tea: { ...this.state.tea, servings: this.state.tea.servings - 1 },
        showStartButton: false,
        showResumeButton: false,
        showPauseButton: true
      });
    } else {
      this.setState({
        showStartButton: false,
        showResumeButton: false,
        showPauseButton: true
      });
    }
  };

  handlePauseTimer = () => {
    this.setState({
      showPauseButton: false,
      showResumeButton: true
    });
  };

  handleResumeTimer = () => {
    this.setState({
      showPauseButton: true,
      showResumeButton: false
    });
  };

  handleCancelTimer = () => {
    this.setState({
      tea: { ...this.state.tea, servings: this.state.originalServings },
      showStartButton: true,
      showPauseButton: false,
      showResumeButton: false,
      showDoneButton: false
    });
    this.props.handleCloseTimer();
  };

  handleFinishTimer = () => {
    this.props.handleCloseTimer();
    this.props.handleTimerUpdateQty(this.state.tea);
  };

  render() {
    return (
      <Timer
        tea={this.state.tea}
        showStartButton={this.state.showStartButton}
        showPauseButton={this.state.showPauseButton}
        showResumeButton={this.state.showResumeButton}
        showDoneButton={this.state.showDoneButton}
        showTimer={this.props.showTimer}
        handleStartTimer={this.handleStartTimer}
        handlePauseTimer={this.handlePauseTimer}
        handleResumeTimer={this.handleResumeTimer}
        handleCancelTimer={this.handleCancelTimer}
        handleFinishTimer={this.handleFinishTimer}
      />
    );
  }
}

export default TimerContainer;
