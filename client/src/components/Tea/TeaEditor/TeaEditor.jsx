/* eslint-disable no-console */
import React from "react";
import { Link } from "react-router-dom";
import InputField from "../../FormComponents/InputField";

export const TeaEditor = React.memo(props => {
  return (
    <div className="container">
      {props.flash.name && (
        <div className="notification is-success">
          {props.flash.name} has been succesfully saved.{" "}
          <Link to={"../../tea/" + props.flash.teaID}>View details</Link>
        </div>
      )}

      <form onSubmit={props.handleFormSubmit}>
        <div className="field">
          <label htmlFor="name">
            Tea Name
            <InputField
              className="input"
              type="text"
              id="name"
              onChange={props.handleNameChange}
              value={props.name}
              placeholder="Tea Name"
              onBlur={props.handleBlur("name")}
            />
          </label>
        </div>
        <div className="field">
          <label htmlFor="brand">
            Tea Brand
            <div className="control">
              <InputField
                className="input"
                type="text"
                id="brand"
                list="brands"
                onChange={props.handleBrandChange}
                value={props.brand}
                placeholder="Tea Brand"
                datalist={props.brandsDataList}
              />
            </div>
          </label>
        </div>
        <div className="field">
          <label htmlFor="type">
            Type
            <div className="control">
              <div className="select">
                <select
                  disabled={!props.teaTypes.length}
                  id="type"
                  value={props.teaType}
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
          </label>
        </div>
        <div className="field">
          <label htmlFor="servings">
            Servings Available
            <div className="control">
              <InputField
                className="input"
                type="number"
                id="servings"
                onChange={props.handleServingsChange}
                value={props.servings}
                placeholder="Servings Available"
                onBlur={props.handleBlur("servings")}
              />
            </div>
          </label>
        </div>
        <div className="control">
          <button
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
