import React from "react";
import { Link } from "react-router-dom";
import InputField from "../../FormComponents/InputField";

export const TeaEditor = React.memo(props => {
  return (
    <div className="container" data-testid="teaeditor">
      {props.flash.name && (
        <div className="notification is-success" data-testid="flash">
          {props.flash.name} has been succesfully saved.{" "}
          <Link to={"../../tea/" + props.flash.teaID}>View details</Link>
        </div>
      )}

      {!props.errors.incomplete && (
        <div className="notification is-danger" data-testid="incompletenotice">
          Please enter the tea details.
        </div>
      )}

      {!props.errors.teaConflict && (
        <div className="notification is-danger" data-testid="duplicatenotice">
          This tea already exists in our system. Please try again.
        </div>
      )}

      <form onSubmit={props.handleFormSubmit} data-testid="teaeditorform">
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
            value={props.name}
            className="input"
            error={props.errors.name}
            errorMessage={props.errorMessages.name}
            errorClass="input is-danger"
            onChange={props.handleNameChange}
            onBlur={props.handleBlur("name")}
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
            datalist={props.brandsDataList}
            placeholder="Tea Brand"
            value={props.brand}
            className="input"
            error={props.errors.brand}
            errorMessage={props.errorMessages.brand}
            errorClass="input is-danger"
            onChange={props.handleBrandChange}
          />
        </div>
        <div className="field">
          <label className="label" htmlFor="type">
            Type
          </label>
          <div className="control">
            <div
              className={!props.errors.teaType ? "select is-danger" : "select"}
            >
              <select
                data-testid="teaType"
                name="type"
                id="type"
                value={props.teaType}
                disabled={!props.teaTypes.length}
                onChange={props.handleTypeChange}
                onBlur={props.handleTypeChange}
              >
                <option />
                {props.teaTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {!props.errors.teaType && (
            <p className="help is-danger" data-testid="inputerror">
              {props.errorMessages.teaType}
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
            value={props.servings}
            className="input"
            error={props.errors.servings}
            errorMessage={props.errorMessages.servings}
            errorClass="input is-danger"
            onChange={props.handleServingsChange}
            onBlur={props.handleBlur("servings")}
          />
        </div>
        <div className="control">
          <button
            data-testid="submit"
            className="button is-primary"
            onClick={props.handleSubmitButton}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
});
