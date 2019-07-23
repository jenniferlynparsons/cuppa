import React from "react";
import { convertTimeToMinSec } from "../../lib/timeConverter";
import { Timer } from "./Timer";
class TimerContainer extends React.Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    timerLength: 0,
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
    this.startTimer();
  };

  handlePauseTimer = () => {
    this.stopTimer();
  };

  handleResumeTimer = () => {
    this.startTimer();
  };

  handleCancelTimer = () => {
    this.resetTimer();
    this.props.handleCloseTimer();
  };

  handleFinishTimer = () => {
    if (this.state.tea.servings === this.state.originalServings) {
      this.setState(
        {
          tea: { ...this.state.tea, servings: this.state.tea.servings - 1 }
        },
        () => {
          this.props.handleTimerUpdateQty(this.state.tea);
          this.resetTimer();
          this.props.handleCloseTimer();
        }
      );
    }
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
        const timerBrewTime = convertTimeToMinSec(newTime);
        this.setState({
          timerTime: newTime,
          minutes: timerBrewTime.minute,
          seconds: timerBrewTime.seconds
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
    const resetBrewTime = convertTimeToMinSec(this.props.brewTime);
    this.setState({
      timerOn: false,
      timerTime: this.props.brewTime,
      minutes: resetBrewTime.minute,
      seconds: resetBrewTime.seconds
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.tea && this.props.tea !== prevProps.tea) {
      this.setState({
        tea: this.props.tea,
        originalServings: this.props.tea.servings,
        timerTime: this.props.brewTime
      });
    }
    if (this.props.brewTime && this.props.brewTime !== prevProps.brewTime) {
      const initialBrewTime = convertTimeToMinSec(this.props.brewTime);

      this.setState({
        timerTime: this.props.brewTime,
        timerLength: this.props.brewTime,
        minutes: initialBrewTime.minute,
        seconds: initialBrewTime.seconds
      });
    }
  }

  render() {
    return (
      <Timer
        teaName={this.state.tea.name}
        timerOn={this.state.timerOn}
        timerTime={this.state.timerTime}
        timerLength={this.state.timerLength}
        minutes={this.state.minutes}
        seconds={this.state.seconds}
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
