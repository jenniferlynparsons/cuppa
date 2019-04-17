/* eslint-disable no-console */
import React from "react";
import { Link } from "react-router-dom";
import Datalist from "../../Datalist";

export const TeaEditor = props => {
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

      <form onSubmit={e => props.handleFormSubmit(e)}>
        <div className="field">
          <label htmlFor="name">
            Tea Name
            <div className="control">
              <input
                className="input"
                // className={
                //   props.shouldMarkError("name") ? "input is-danger" : "input"
                // }
                type="text"
                id="name"
                onChange={props.handleNameChange}
                value={props.name}
                placeholder="Tea Name"
                onBlur={props.handleBlur("name")}
              />
            </div>
            {/* {props.shouldMarkError("name") ? (
              <p className="help is-danger">Add a Tea Name</p>
            ) : (
              ""
            )} */}
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
                onChange={props.handleBrandChange}
                value={props.brand}
                placeholder="Tea Brand"
              />
              <Datalist
                id="brands"
                options={props.teas}
                processOptions={props.getBrandsFromTeas}
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
              <input
                className="input"
                // className={
                //   props.shouldMarkError("servings")
                //     ? "input is-danger"
                //     : "input"
                // }
                type="number"
                id="servings"
                onChange={props.handleServingsChange}
                value={props.servings}
                placeholder="Servings Available"
                onBlur={props.handleBlur("servings")}
              />
            </div>
            {/* {props.shouldMarkError("servings") ? (
              <p className="help is-danger">Add a Number of Servings</p>
            ) : (
              ""
            )} */}
          </label>
        </div>
        <div className="control">
          <button
            className="button is-primary"
            // className={isDisabled ? "button is-disabled" : "button is-primary"}
            onClick={e => props.handleSubmitButton(e)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
