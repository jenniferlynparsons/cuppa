import React from "react";

export class TableFilter extends React.Component {
  render() {
    return (
      <div className="columns is-pulled-right">
        <div className="field has-addons">
          <p className="control">
            <span className="select is-small">
              <select>
                {this.props.columnHeaders.map(colHeaderObj => {
                  return <option>{colHeaderObj.colTitle}</option>;
                })}
              </select>
            </span>
          </p>
          <p className="control">
            {/* this should do autocomplete similar to tea brands */}
            <input
              className="input is-small"
              type="text"
              placeholder="Filter Text"
            />
          </p>
          <p className="control">
            <a className="button is-small">Filter</a>
          </p>
        </div>
        {/* should only be visible when filters are applied */}
        <div className="control">
          <button className="button is-primary is-small">Clear Filter</button>
        </div>
      </div>
    );
  }
}

export default TableFilter;
