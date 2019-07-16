import React from "react";

export class Timer extends React.Component {
  render() {
    let minutes = ("0" + (Math.floor(this.props.timerTime / 60000) % 60)).slice(
      -2
    );
    let seconds = ("0" + (Math.floor(this.props.timerTime / 1000) % 60)).slice(
      -2
    );

    return (
      <div
        className={
          this.props.showTimer
            ? "modal is-active has-text-centered"
            : "modal has-text-centered"
        }
      >
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              {this.props.tea.name} - {this.props.tea.servings}
            </p>
          </header>
          <section className="modal-card-body">
            <p className="is-size-3">
              {minutes}:{seconds}
            </p>
            <progress className="progress is-primary" value="15" max="100">
              15%
            </progress>
          </section>
          <div className="modal-card-foot is-centered">
            <button
              className={
                !this.props.timerOn &&
                this.props.timerTime === this.props.timerLength
                  ? "button is-success"
                  : "is-hidden"
              }
              onClick={this.props.handleStartTimer}
            >
              Start
            </button>

            <button
              className={
                !this.props.timerOn &&
                this.props.timerTime > 0 &&
                this.props.timerTime !== this.props.timerLength
                  ? "button is-success"
                  : "is-hidden"
              }
              onClick={this.props.handleResumeTimer}
            >
              Resume
            </button>

            <button
              className={this.props.timerOn ? "button is-danger" : "is-hidden"}
              onClick={this.props.handlePauseTimer}
            >
              Pause {this.props.timerOn}
            </button>
            <button
              className={
                !this.props.timerOn && this.props.timerTime === 0
                  ? "button is-primary"
                  : "is-hidden"
              }
              onClick={this.props.handleFinishTimer}
            >
              Done!
            </button>
            <button className="button" onClick={this.props.handleCancelTimer}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}
