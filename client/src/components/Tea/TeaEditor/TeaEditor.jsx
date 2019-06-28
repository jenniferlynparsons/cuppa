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

      <form onSubmit={props.handleFormSubmit} data-testid="teaeditorform">
        <div className="field">
          <label htmlFor="name">
            Tea Name
            <InputField
              datatestid="name"
              name="name"
              id="name"
              type="text"
              placeholder="Tea Name"
              value={props.name}
              className="input"
              onChange={props.handleNameChange}
              onBlur={props.handleBlur("name")}
            />
          </label>
        </div>
        <div className="field">
          <label htmlFor="brand">
            Tea Brand
            <div className="control">
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
                onChange={props.handleBrandChange}
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
                  data-testid="type"
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
          </label>
        </div>
        <div className="field">
          <label htmlFor="servings">
            Servings Available
            <div className="control">
              <InputField
                datatestid="servings"
                name="servings"
                id="servings"
                type="number"
                placeholder="Servings Available"
                value={props.servings}
                className="input"
                onChange={props.handleServingsChange}
                onBlur={props.handleBlur("servings")}
              />
            </div>
          </label>
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
