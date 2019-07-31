import React from "react";
import { Link } from "react-router-dom";
import InputField from "../../FormComponents/InputField";

export class TeaEditor extends React.Component {
  render() {
    return (
      <div className="container" data-testid="teaeditor">
        {this.props.flash.name && (
          <p className="notification is-success" data-testid="flash">
            {this.props.flash.name} has been succesfully saved.{" "}
            <Link to={"../../tea/" + this.props.flash.teaID}>View details</Link>
          </p>
        )}

        {!this.props.valid.complete && (
          <div
            className="notification is-danger"
            data-testid="incompletenotice"
          >
            Please enter the tea details.
          </div>
        )}

        {!this.props.valid.duplicateTea && (
          <div className="notification is-danger" data-testid="duplicatenotice">
            This tea already exists in our system. Please try again.
          </div>
        )}

        <form
          onSubmit={this.props.handleFormSubmit}
          data-testid="teaeditorform"
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
              valid={this.props.valid.name}
              errorMessage={this.props.errorMessages.name}
              errorClass="is-danger"
              onChange={this.props.handleNameChange}
              onBlur={this.props.handleBlur("name")}
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="brand">
              Tea Brand
            </label>
            <InputField
              datatestid="brand"
              name="brand"
              id="brand"
              type="text"
              list="brands"
              datalist={this.props.brandsDataList}
              placeholder="Tea Brand"
              value={this.props.brand}
              className="input"
              valid={this.props.valid.brand}
              errorMessage={this.props.errorMessages.brand}
              errorClass="is-danger"
              onChange={this.props.handleBrandChange}
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="type">
              Type
            </label>
            <div className="control">
              <div
                className={
                  !this.props.valid.teaType
                    ? "select is-danger"
                    : "select"
                }
              >
                <select
                  data-testid="teaType"
                  name="type"
                  id="type"
                  value={this.props.teaType}
                  disabled={!this.props.teaTypes.length}
                  onChange={this.props.handleTypeChange}
                  onBlur={this.props.handleTypeChange}
                >
                  <option />
                  {this.props.teaTypes.map(teaType => {
                    return (
                      <option key={teaType} value={teaType}>
                        {teaType}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {!this.props.valid.teaType && (
              <p className="help is-danger" data-testid="inputerror">
                {this.props.errorMessages.teaType}
              </p>
            )}
          </div>
          <div className="field">
            <label className="label" htmlFor="servings">
              Servings Available
            </label>
            <InputField
              datatestid="servings"
              name="servings"
              id="servings"
              type="number"
              placeholder="Servings Available"
              value={this.props.servings}
              className="input"
              valid={this.props.valid.servings}
              errorMessage={this.props.errorMessages.servings}
              errorClass="is-danger"
              onChange={this.props.handleServingsChange}
              onBlur={this.props.handleBlur("servings")}
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
