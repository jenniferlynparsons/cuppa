import React from "react";
import InputField from "../../FormComponents/InputField";

export class TeaTypeEditor extends React.Component {
  render() {
    return (
      <div className="container" data-testid="teatypeeditor">
        {this.props.flash.name && (
          <div className="notification is-success" data-testid="flash">
            {this.props.flash.name} has been succesfully saved.
          </div>
        )}

        {!this.props.errors.incomplete && (
          <div
            className="notification is-danger"
            data-testid="incompletenotice"
          >
            Please enter the tea type details.
          </div>
        )}

        {!this.props.errors.teaTypeConflict && (
          <div className="notification is-danger" data-testid="duplicatenotice">
            This tea type already exists in our system. Please try again.
          </div>
        )}

        <form
          onSubmit={this.props.handleFormSubmit}
          data-testid="teatypeeditorform"
        >
          <div className="field">
            <label className="label" htmlFor="name">
              Tea Name
            </label>
            <InputField
              datatestid="name"
              name="name"
              id="name"
              type="text"
              placeholder="Tea Name"
              value={this.props.name}
              className="input"
              error={this.props.errors.name}
              errorMessage={this.props.errorMessages.name}
              errorClass="input is-danger"
              onChange={this.props.handleNameChange}
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
                  error={this.props.errors.brewTimeMin}
                  errorClass="input is-danger is-one-fifth"
                  onChange={this.props.handleBrewTimeMinChange}
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
                  error={this.props.errors.brewTimeSec}
                  errorClass="input is-danger is-one-fifth"
                  onChange={this.props.handleBrewTimeSecChange}
                />
              </div>
            </div>
            {!this.props.errors.brewTime && (
              <p className="help is-danger" data-testid="inputerror">
                {this.props.errorMessages.brewTime}
              </p>
            )}
          </div>
          <div className="control">
            <button
              data-testid="submit"
              className="button is-primary"
              onClick={this.props.handleSubmitButton}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
