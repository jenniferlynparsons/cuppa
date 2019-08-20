import React from "react";
import { convertTimeToMinSec } from "../../lib/timeConverter";
import { Timer } from "./Timer";
class TimerContainer extends React.Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: this.props.brewTime ? this.props.brewTime : 0,
    timerLength: this.props.brewTime ? this.props.brewTime : 0,
    minutes: 0,
    seconds: 0,
    progress: 0,
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
    this.props.handleCloseTimer();
  };

  handleFinishTimer = () => {
    if (this.state.tea.servings === this.state.originalServings) {
      this.setState(
        {
          tea: { ...this.state.tea, servings: this.state.tea.servings - 1 }
        },
        () => {
          this.resetTimer();
          this.props.handleCloseTimer();
          this.props.handleTimerUpdateQty(this.state.tea);
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
      if (newTime >= 0) {
        const timerBrewTime = convertTimeToMinSec(newTime);
        const progressUpdate = Math.abs(
          100 - ((newTime / this.props.brewTime) * 100).toFixed(1)
        );
        this.setState({
          timerTime: newTime,
          minutes: timerBrewTime.minute,
          seconds: timerBrewTime.seconds,
          progress: progressUpdate
        });
      } else {
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
    const resetBrewTime = convertTimeToMinSec(this.props.brewTime);
    this.setState({
      timerOn: false,
      timerTime: this.props.brewTime,
      progress: 0,
      minutes: resetBrewTime.minute,
      seconds: resetBrewTime.seconds
    });
  };

  componentDidMount() {
    const initialBrewTime = convertTimeToMinSec(this.props.brewTime);

    this.setState({
      tea: this.props.tea,
      originalServings: this.props.tea.servings,
      timerTime: this.props.brewTime,
      timerLength: this.props.brewTime,
      minutes: initialBrewTime.minute,
      seconds: initialBrewTime.seconds
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.tea && this.props.tea !== prevProps.tea) {
      this.setState({
        tea: this.props.tea,
        originalServings: this.props.tea.servings
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
        progress={this.state.progress}
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
