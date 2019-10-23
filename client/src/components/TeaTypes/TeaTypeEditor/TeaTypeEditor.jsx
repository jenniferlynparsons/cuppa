import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { validationComplete } from "../../../lib/validationComplete";
import InputField from "../../FormComponents/InputField";

export class TeaTypeEditor extends React.Component {
  render() {
    return (
      <div className="container" data-testid="teatypeeditor">
        {this.props.flash.name && (
          <p className="notification is-success" data-testid="flash">
            {this.props.flash.name} has been succesfully saved.{" "}
            <Link to={"/tea-types/"}>View all types.</Link>
          </p>
        )}

        {!validationComplete(this.props.inputValidation) && (
          <div
            className="notification is-danger"
            data-testid="incompletenotice"
          >
            Please enter the tea type details.
          </div>
        )}

        {this.props.serverErrors && this.props.serverErrors.duplicate && (
          <div className="notification is-danger" data-testid="duplicatenotice">
            This tea type already exists in our system. Please try again.
          </div>
        )}

        <form
          onSubmit={this.props.onFormSubmit}
          data-testid="teatypeeditorform"
        >
          <div className="field">
            <label className="label" htmlFor="name">
              Tea Type Name
            </label>
            <InputField
              datatestid="name"
              name="name"
              id="name"
              type="text"
              placeholder="Tea Type Name"
              value={this.props.name}
              className="input"
              valid={this.props.inputValidation.name}
              errorMessage={this.props.errorMessages.name}
              errorClass="is-danger"
              onChange={this.props.onNameChange}
            />
          </div>
          <div className="field">
            <p className="label">Brew Time</p>
            <div className="columns">
              <div className="column is-one-quarter">
                <InputField
                  datatestid="brewtimemin"
                  name="brewTimeMin"
                  id="brewTimeMin"
                  type="number"
                  min="0"
                  max="59"
                  placeholder="Min"
                  value={this.props.brewTimeMin}
                  className="input is-one-fifth"
                  valid={this.props.inputValidation.brewTimeMin}
                  errorClass="input is-danger is-one-fifth"
                  onChange={this.props.onBrewTimeMinChange}
                />
              </div>
              <div className="column is-one-quarter">
                <InputField
                  datatestid="brewtimesec"
                  name="brewTimeSec"
                  id="brewTimeSec"
                  type="number"
                  min="0"
                  max="59"
                  placeholder="Sec"
                  value={this.props.brewTimeSec}
                  className="input is-one-fifth"
                  valid={this.props.inputValidation.brewTimeSec}
                  errorClass="input is-danger is-one-fifth"
                  onChange={this.props.onBrewTimeSecChange}
                />
              </div>
            </div>
            {!this.props.inputValidation.brewTime && (
              <p className="help is-danger" data-testid="inputerror">
                {this.props.errorMessages.brewTime}
              </p>
            )}
          </div>
          <div className="control">
            <button data-testid="submit" className="button is-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

TeaTypeEditor.propTypes = {
  flash: PropTypes.shape({
    name: PropTypes.string
  }),
  inputValidation: PropTypes.shape({
    name: PropTypes.bool,
    brewTimeMin: PropTypes.bool,
    brewTimeSec: PropTypes.bool,
    brewTime: PropTypes.bool
  }),
  serverErrors: PropTypes.shape({
    duplicate: PropTypes.string
  }),
  name: PropTypes.string,
  errorMessages: PropTypes.shape({
    name: PropTypes.string,
    brewTime: PropTypes.string
  }),
  brewTimeMin: PropTypes.string,
  brewTimeSec: PropTypes.string,
  handleBrewTimeMinChange: PropTypes.func.isRequired,
  handleBrewTimeSecChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired
};
