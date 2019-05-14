/* eslint-disable no-console */
import React from "react";
import { Link } from "react-router-dom";
import DataList from "../../DataList";

export class TeaEditor extends React.Component {
  render() {
    return (
      <div className="container">
        {this.props.flash.name && (
          <div className="notification is-success">
            {this.props.flash.name} has been succesfully saved.{" "}
            <Link to={"../../tea/" + this.props.flash.teaID}>View details</Link>
          </div>
        )}

        <form onSubmit={this.props.handleFormSubmit}>
          <div className="field">
            <label htmlFor="name">
              Tea Name
              <div className="control">
                <input
                  className="input"
                  // className={
                  //   this.props.shouldMarkError("name") ? "input is-danger" : "input"
                  // }
                  type="text"
                  id="name"
                  onChange={this.props.handleNameChange}
                  value={this.props.name}
                  placeholder="Tea Name"
                  onBlur={this.props.handleBlur("name")}
                />
              </div>
              {/* {this.props.shouldMarkError("name") ? (
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
                  onChange={this.props.handleBrandChange}
                  value={this.props.brand}
                  placeholder="Tea Brand"
                />
                <DataList
                  id="brands"
                  options={this.props.teas}
                  processOptions={this.props.getBrandsFromTeas}
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
                    disabled={!this.props.teaTypes.length}
                    id="type"
                    value={this.props.teaType}
                    onChange={this.props.handleTypeChange}
                    onBlur={this.props.handleTypeChange}
                  >
                    <option />
                    {this.props.teaTypes.map(type => (
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
                  //   this.props.shouldMarkError("servings")
                  //     ? "input is-danger"
                  //     : "input"
                  // }
                  type="number"
                  id="servings"
                  onChange={this.props.handleServingsChange}
                  value={this.props.servings}
                  placeholder="Servings Available"
                  onBlur={this.props.handleBlur("servings")}
                />
              </div>
              {/* {this.props.shouldMarkError("servings") ? (
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

export default TeaEditor;
