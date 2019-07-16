import React from "react";
import { Timer } from "./Timer";

class TimerContainer extends React.Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    timerLength: 2100,
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
        tea: { ...this.state.tea, servings: this.state.tea.servings - 1 }
      });
    }

    this.startTimer();
  };

  handlePauseTimer = () => {
    this.stopTimer();
  };

  handleResumeTimer = () => {
    this.startTimer();
  };

  handleCancelTimer = () => {
    this.setState({
      tea: { ...this.state.tea }
    });
    this.resetTimer();
    this.props.handleCloseTimer();
  };

  handleFinishTimer = () => {
    this.props.handleTimerUpdateQty(this.state.tea);
    this.resetTimer();
    this.props.handleCloseTimer();
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };

  resetTimer = () => {
    this.setState({
      timerOn: false,
      timerTime: 0
    });
  };

  componentDidMount() {
    // this.props.tea.brewTime
    this.setState({ timerTime: 2100 });
  }

  render() {
    return (
      <Timer
        tea={this.state.tea}
        timerOn={this.state.timerOn}
        timerTime={this.state.timerTime}
        timerLength={this.state.timerLength}
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
