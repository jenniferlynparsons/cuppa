import React from "react";

export class Timer extends React.Component {
  render() {
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
            <p className="is-size-3">2:27</p>
            <progress className="progress is-primary" value="15" max="100">
              15%
            </progress>
          </section>
          <div className="modal-card-foot is-centered">
            <button
              className={
                this.props.showStartButton ? "button is-success" : "is-hidden"
              }
              onClick={this.props.handleStartTimer}
            >
              {this.props.showStartButton ? "Start" : ""}
            </button>

            <button
              className={
                this.props.showResumeButton ? "button is-success" : "is-hidden"
              }
              onClick={this.props.handleResumeTimer}
            >
              {this.props.showResumeButton ? "Resume" : ""}
            </button>

            <button
              className={
                this.props.showPauseButton ? "button is-danger" : "is-hidden"
              }
              onClick={this.props.handlePauseTimer}
            >
              Pause
            </button>
            <button
              className={
                this.props.showDoneButton ? "button is-primary" : "is-hidden"
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
