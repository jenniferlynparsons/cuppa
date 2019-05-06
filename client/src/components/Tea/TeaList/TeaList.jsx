import React from "react";
import { Link } from "react-router-dom";
import TableColumnHeader from "./TableColumnHeader";
import TableFilter from "./TableFilter";

export class TeaList extends React.Component {
  render() {
    const columnHeaders = [
      { colName: "name", colTitle: "Name" },
      { colName: "brand", colTitle: "Brand" },
      { colName: "teaType", colTitle: "Type" },
      { colName: "servings", colTitle: "Servings" }
    ];

    return (
      <div className="container">
        <TableFilter
          columnHeaders={columnHeaders}
          filterChangeHandler={this.props.filterChangeHandler}
          handleFilterClick={this.props.handleFilterClick}
          handleClearFilterClick={this.props.handleClearFilterClick}
          formControls={this.props.formControls}
        />
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              {columnHeaders.map(colHeaderObj => {
                return (
                  <TableColumnHeader
                    key={colHeaderObj.colName}
                    handleSortClick={this.props.handleSortClick}
                    sortColumn={this.props.sortColumn}
                    sortOrder={this.props.sortOrder}
                    columnName={colHeaderObj.colName}
                    columnTitle={colHeaderObj.colTitle}
                  />
                );
              })}
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.teaIDs.map(teaID => {
              const tea = this.props.allTeas[teaID];
              return (
                <tr key={tea.id}>
                  <td>
                    <Link to={"tea/" + tea.id}>{tea.name}</Link>
                  </td>
                  <td>{tea.brand}</td>
                  <td>{tea.teaType}</td>
                  <td>{tea.servings}</td>
                  <td>
                    <Link to={"/update-tea/" + tea.id}>Edit</Link>
                  </td>
                  <td>
                    <button
                      className="button is-danger is-small"
                      onClick={() => this.props.handleDeleteClick(tea.id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TeaList;
