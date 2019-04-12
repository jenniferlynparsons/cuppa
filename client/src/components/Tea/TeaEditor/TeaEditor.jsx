/* eslint-disable no-console */
import React from "react";
import { Link } from "react-router-dom";
import Datalist from "../../Datalist";

export const TeaEditor = props => {
  console.log(props);
  return (
    <div className="container">
      {props.flash.name ? (
        <div className="notification is-success">
          {props.flash.name} has been succesfully saved.{" "}
          <Link to={"../../tea/" + props.flash.id}>View details</Link>
        </div>
      ) : (
        ""
      )}

      <form onSubmit={e => this.handleFormSubmit(e, errors)}>
        <div className="field">
          <label htmlFor="name">
            Tea Name
            <div className="control">
              <input
                className={
                  props.shouldMarkError("name") ? "input is-danger" : "input"
                }
                type="text"
                id="name"
                onChange={this.handleNameChange}
                value={props.name}
                placeholder="Tea Name"
                onBlur={this.handleBlur("name")}
              />
            </div>
            {props.shouldMarkError("name") ? (
              <p className="help is-danger">Add a Tea Name</p>
            ) : (
              ""
            )}
          </label>
        </div>
        <div className="field">
          <label htmlFor="brand">
            Tea Brand
            <div className="control">
              <input
                className="input"
                type="text"
                id="brand"
                list="brands"
                onChange={this.handleBrandChange}
                value={props.brand}
                placeholder="Tea Brand"
              />
              <Datalist
                id="brands"
                options={props.teas}
                processOptions={this.getBrandsFromTeas}
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
                  onChange={this.handleTypeChange}
                  onBlur={this.handleTypeChange}
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
              <input
                className={
                  props.shouldMarkError("servings")
                    ? "input is-danger"
                    : "input"
                }
                type="number"
                id="servings"
                onChange={this.handleServingsChange}
                value={props.servings}
                placeholder="Servings Available"
                onBlur={this.handleBlur("servings")}
              />
            </div>
            {props.shouldMarkError("servings") ? (
              <p className="help is-danger">Add a Number of Servings</p>
            ) : (
              ""
            )}
          </label>
        </div>
        <div className="control">
          <button
            className={isDisabled ? "button is-disabled" : "button is-primary"}
            onClick={e => this.handleSubmitButton(e, errors)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
