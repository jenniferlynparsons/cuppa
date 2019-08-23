import React from "react";
import { convertTimeToMinSec } from "../../lib/timeConverter";

export class Timer extends React.Component {
  render() {
    const brewTime = convertTimeToMinSec(this.props.timerTime);
    const progress = Math.abs(
      100 - ((this.props.timerTime / this.props.brewTime) * 100).toFixed(1)
    );
    return (
      <div
        data-testid="timermodal"
        className={
          this.props.showTimer === this.props.id
            ? "modal is-active has-text-centered"
            : "modal has-text-centered"
        }
      >
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.teaName}</p>
          </header>
          <section className="modal-card-body">
            <p className="is-size-3">
              {brewTime.minute}:{brewTime.seconds}
            </p>
            <progress
              className="progress is-primary"
              value={progress}
              max="100"
            >
              {progress}%
            </progress>
          </section>
          <div className="modal-card-foot is-centered">
            <button
              data-testid="starttimer"
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
              data-testid="resumetimer"
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
              data-testid="pausetimer"
              className={this.props.timerOn ? "button is-danger" : "is-hidden"}
              onClick={this.props.handlePauseTimer}
            >
              Pause {this.props.timerOn}
            </button>
            <button
              data-testid="donetimer"
              className={
                !this.props.timerOn && this.props.timerTime === 0
                  ? "button is-primary"
                  : "is-hidden"
              }
              onClick={this.props.handleFinishTimer}
            >
              Done!
            </button>
            <button
              data-testid="canceltimer"
              className={this.props.timerTime !== 0 ? "button" : "is-hidden"}
              onClick={this.props.handleCancelTimer}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}
