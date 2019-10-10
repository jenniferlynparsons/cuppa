import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TimerContainer from "../../Timer";

export class TeaDetails extends React.Component {
  render() {
    return (
      <>
        <div className="container content" data-testid="teadetails">
          {this.props.flash === "success" && (
            <p className="notification is-success">
              <button
                data-testid="flash"
                className="delete"
                onClick={() => this.props.updateFlash("off")}
              />
              {this.props.tea.name} has been succesfully updated.
            </p>
          )}
          <h1>{this.props.tea.name}</h1>
          <ul>
            <li>
              <span className="has-text-grey-light">Brand:</span>{" "}
              {this.props.tea.brand}
            </li>
            <li>
              <span className="has-text-grey-light">Type:</span>{" "}
              {this.props.teaType}
            </li>
            <li>
              <span className="has-text-grey-light">Servings:</span>{" "}
              {this.props.tea.servings}
            </li>
          </ul>

          <button
            data-testid="makecuppalink"
            className="button is-primary"
            disabled={this.props.tea.servings <= 0}
            onClick={() => this.props.handleOpenTimer(this.props.tea.id)}
          >
            Make A Cuppa
          </button>
          <Link
            data-testid="teaeditlink"
            to={"/update-tea/" + this.props.tea.id}
            className="button"
          >
            Edit
          </Link>
        </div>
        {this.props.timerID && (
          <TimerContainer
            timerID={this.props.timerID}
            handleCloseTimer={this.props.handleCloseTimer}
          />
        )}
      </>
    );
  }
}

TeaDetails.defaultProps = {
  tea: {
    name: "",
    brand: "",
    servings: "",
    id: ""
  },
  teaType: "",
  timerID: ""
};

TeaDetails.propTypes = {
  flash: PropTypes.string,
  tea: PropTypes.shape({
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    servings: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  }),
  teaType: PropTypes.string.isRequired,
  timerID: PropTypes.string.isRequired,
  updateFlash: PropTypes.func.isRequired,
  handleOpenTimer: PropTypes.func.isRequired,
  handleCloseTimer: PropTypes.func.isRequired
};
