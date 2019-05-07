import React from "react";
import Datalist from "../../Datalist";

export const TableFilter = props => {
  return (
    <div className="columns is-pulled-right">
      <form onSubmit={() => props.handleFilterClick(event)}>
        <div className="field has-addons">
          <p className="control">
            <span className="select is-small">
              <select
                name="filterCategory"
                value={props.formControls.filterCategory}
                onChange={() => props.filterChangeHandler(event)}
              >
                <option key="category" value="">
                  Filter by
                </option>
                {props.columnHeaders.map(colHeaderObj => {
                  return (
                    <option
                      key={colHeaderObj.colName}
                      value={colHeaderObj.colName}
                    >
                      {colHeaderObj.colTitle}
                    </option>
                  );
                })}
              </select>
            </span>
          </p>
          <p className="control">
            {/* this should do autocomplete similar to tea brands */}
            <input
              className="input is-small"
              name="filterCriteria"
              type="text"
              list="fcriteria"
              placeholder="Filter Text"
              value={props.formControls.filterCriteria}
              onChange={() => props.filterChangeHandler(event)}
            />
            <Datalist
              id="fcriteria"
              options={props.teaIDs}
              optionalArgs={props.formControls.filterCategory}
              processOptions={props.getOptionsFromTeas}
            />
          </p>
          <p className="control">
            <button type="submit" className="button is-small">
              Filter
            </button>
          </p>
        </div>
      </form>
      {props.filtered ? (
        <div className="control">
          <button
            className="button is-primary is-small"
            onClick={() => props.handleClearFilterClick()}
          >
            Clear Filter
          </button>
        </div>
      ) : null}
    </div>
  );
};
