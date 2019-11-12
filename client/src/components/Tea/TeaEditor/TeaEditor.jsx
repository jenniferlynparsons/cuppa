import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { validationComplete } from "../../../lib/validationComplete";
import StarRating from "../../StarRating";
import InputField from "../../FormComponents/InputField";

export class TeaEditor extends React.Component {
  render() {
    return (
      <div className="container" data-testid="teaeditor">
        {this.props.flash.name && (
          <p className="notification is-success" data-testid="flash">
            {this.props.flash.name} has been succesfully saved.{" "}
            <Link to={"../../tea/" + this.props.flash.id}>View details</Link>
          </p>
        )}

        {!validationComplete(this.props.inputValidation) && (
          <div
            className="notification is-danger"
            data-testid="incompletenotice"
          >
            Please enter the tea details.
          </div>
        )}

        {this.props.serverErrors && this.props.serverErrors.duplicate && (
          <div className="notification is-danger" data-testid="duplicatenotice">
            This tea already exists in our system. Please try again.
          </div>
        )}

        <form onSubmit={this.props.onFormSubmit} data-testid="teaeditorform">
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
              value={this.props.activeTea.name}
              className="input"
              valid={this.props.inputValidation.name}
              errorMessage={this.props.errorMessages.name}
              errorClass="is-danger"
              onChange={this.props.onNameChange}
              onBlur={this.props.onBlur("name")}
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
              value={this.props.activeTea.brand}
              className="input"
              valid={this.props.inputValidation.brand}
              errorMessage={this.props.errorMessages.brand}
              errorClass="is-danger"
              onChange={this.props.onBrandChange}
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="type">
              Type
            </label>
            <div className="control">
              <div
                className={[
                  "select",
                  this.props.inputValidation.teaType ? "" : "is-danger"
                ].join(" ")}
              >
                <select
                  data-testid="teaType"
                  name="type"
                  id="type"
                  value={this.props.activeTea.teaType}
                  disabled={!this.props.teaTypes.length}
                  onChange={this.props.onTypeChange}
                  onBlur={this.props.onTypeChange}
                >
                  <option />
                  {this.props.teaTypes.map(teaType => {
                    return (
                      <option key={teaType.id} value={teaType.id}>
                        {teaType.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {!this.props.inputValidation.teaType && (
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
              value={this.props.activeTea.servings}
              min={0}
              className="input"
              valid={this.props.inputValidation.servings}
              errorMessage={this.props.errorMessages.servings}
              errorClass="is-danger"
              onChange={this.props.onServingsChange}
              onBlur={this.props.onBlur("servings")}
            />
          </div>
          <div className="field">
            <StarRating
              rating={this.props.activeTea.rating}
              onRatingClick={this.props.onRatingClick}
            />
          </div>
          <div className="control extra-margin">
            <button data-testid="submit" className="button is-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

TeaEditor.propTypes = {
  flash: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string
  }),
  inputValidation: PropTypes.shape({
    name: PropTypes.bool,
    brand: PropTypes.bool,
    teaType: PropTypes.bool,
    servings: PropTypes.bool
  }),
  serverErrors: PropTypes.shape({
    duplicate: PropTypes.string
  }),
  activeTea: PropTypes.shape({
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    teaType: PropTypes.string.isRequired,
    servings: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    rating: PropTypes.string.isRequired
  }),
  brandsDataList: PropTypes.object,
  errorMessages: PropTypes.shape({
    name: PropTypes.string,
    brand: PropTypes.string,
    teaType: PropTypes.string,
    servings: PropTypes.string
  }),
  teaTypes: PropTypes.array,
  onBlur: PropTypes.func.isRequired,
  onBrandChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onServingsChange: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  onRatingClick: PropTypes.func.isRequired
};
