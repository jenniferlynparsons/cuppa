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
              onBlur={this.props.handleBlur("name")}
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="brewTime">
              Brew Time
            </label>
            <InputField
              datatestid="brewtime"
              name="brewTime"
              id="brewTime"
              type="text"
              placeholder="Tea brewTime"
              value={this.props.brewTime}
              className="input"
              error={this.props.errors.brewTime}
              errorMessage={this.props.errorMessages.brewTime}
              errorClass="input is-danger"
              onChange={this.props.handlebrewTimeChange}
            />
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
