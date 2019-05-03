import React from "react";

export class TableFilter extends React.Component {
  render() {
    return (
      <div className="columns is-pulled-right">
        <div className="field column">
          <label className="label">Filter By</label>
          <div className="control">
            <div className="select">
              <select>
                {this.props.columnHeaders.map(colHeaderObj => {
                  return <option>{colHeaderObj.colTitle}</option>;
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="field column">
          <label className="label">Filter</label>
          <div className="control">
            <input className="input" type="text" placeholder="Text input" />
          </div>
        </div>
      </div>
    );
  }
}

export default TableFilter;
