import React from "react";
import { Link } from "react-router-dom";
import TableColumnHeader from "./TableColumnHeader";

export class TeaList extends React.Component {
  render() {
    const columnHeaders = ["name", "brand", "teaType", "servings"];

    return (
      <div className="container">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              {columnHeaders.map(title => {
                return (
                  <TableColumnHeader
                    key={title}
                    handleSortClick={this.props.handleSortClick}
                    sortColumn={this.props.sortColumn}
                    sortOrder={this.props.sortOrder}
                    columnName={title}
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
