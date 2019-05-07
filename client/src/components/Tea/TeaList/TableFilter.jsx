import React from "react";

export class TableFilter extends React.Component {
  render() {
    return (
      <div className="columns is-pulled-right">
        <form onSubmit={() => this.props.handleFilterClick(event)}>
          <div className="field has-addons">
            <p className="control">
              <span className="select is-small">
                <select
                  name="filterCategory"
                  value={this.props.formControls.filterCategory}
                  onChange={() => this.props.filterChangeHandler(event)}
                >
                  <option key="category" value="">
                    Filter by
                  </option>
                  {this.props.columnHeaders.map(colHeaderObj => {
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
                placeholder="Filter Text"
                value={this.props.formControls.filterCriteria}
                onChange={() => this.props.filterChangeHandler(event)}
              />
            </p>
            <p className="control">
              <button type="submit" className="button is-small">
                Filter
              </button>
            </p>
          </div>
        </form>
        {this.props.filtered ? (
          <div className="control">
            <button
              className="button is-primary is-small"
              onClick={() => this.props.handleClearFilterClick()}
            >
              Clear Filter
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default TableFilter;
