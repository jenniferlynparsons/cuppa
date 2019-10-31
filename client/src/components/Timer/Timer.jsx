import React from "react";
import { PropTypes } from "prop-types";
import { convertTimeToMinSec } from "../../lib/timerHelpers";

export class Timer extends React.Component {
  render() {
    return (
      <div
        data-testid="timermodal"
        className={
          this.props.showTimer
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
              {this.props.minutes}:{this.props.seconds}
            </p>
            <progress
              data-testid="progressbar"
              className="progress is-primary"
              value={this.props.progress}
              max="100"
            >
              {this.props.progress}%
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
              onClick={this.props.onStartTimer}
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
              onClick={this.props.onResumeTimer}
            >
              Resume
            </button>

            <button
              data-testid="pausetimer"
              className={this.props.timerOn ? "button is-danger" : "is-hidden"}
              onClick={this.props.onPauseTimer}
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
              onClick={this.props.onFinishTimer}
            >
              Done!
            </button>
            <button
              data-testid="canceltimer"
              className="button"
              onClick={this.props.onCancelTimer}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  timerTime: PropTypes.number.isRequired,
  brewTime: PropTypes.number.isRequired,
  teaName: PropTypes.string.isRequired,
  timerOn: PropTypes.bool.isRequired,
  handleCancelTimer: PropTypes.func.isRequired,
  handleFinishTimer: PropTypes.func.isRequired,
  handlePauseTimer: PropTypes.func.isRequired,
  handleResumeTimer: PropTypes.func.isRequired,
  handleStartTimer: PropTypes.func.isRequired
};
