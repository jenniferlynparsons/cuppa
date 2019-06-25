import React from "react";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import InputField from "../../FormComponents/InputField";

library.add(faAngleDown, faAngleUp);

export class TeaCollectionTable extends React.PureComponent {
  render() {
    return (
      <div className="container" data-testid="teacollection">
        <div className="columns is-pulled-right">
          <form onSubmit={this.props.handleFilterClick}>
            <div className="field has-addons">
              <div className="control">
                <span className="select is-small">
                  <select
                    name="filterCategory"
                    value={this.props.formControls.filterCategory}
                    onChange={this.props.filterDropdownChangeHandler}
                  >
                    <option key="category" value="">
                      Filter by
                    </option>
                    {this.props.columnHeaders.map(colHeaderObj => (
                      <option
                        data-testid={"filter" + colHeaderObj.colName}
                        key={colHeaderObj.colName}
                        value={colHeaderObj.colName}
                      >
                        {colHeaderObj.colTitle}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
              <InputField
                datatestid="filterinput"
                className="input is-small"
                name="filterCriteria"
                type="text"
                list="fcriteria"
                placeholder="Filter Text"
                value={this.props.formControls.filterCriteria}
                onChange={this.props.filterInputChangeHandler}
                datalist={this.props.datalist}
              />
              <div className="control">
                <button
                  data-testid="filterbutton"
                  type="submit"
                  className="button is-small"
                >
                  Filter
                </button>
              </div>
            </div>
          </form>
          {this.props.filtered && (
            <div className="control">
              <button
                className="button is-primary is-small"
                onClick={this.props.handleClearFilterClick}
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              {this.props.columnHeaders.map(colHeaderObj => (
                <th key={colHeaderObj.colName}>
                  {colHeaderObj.colTitle + " "}
                  <button
                    data-testid={colHeaderObj.colName}
                    className="button is-small"
                    type="button"
                    aria-pressed="false"
                    onClick={() =>
                      this.props.handleSortClick(
                        colHeaderObj.colName,
                        this.props.sortColumnHandler(colHeaderObj.colName)
                          ? "desc"
                          : "asc"
                      )
                    }
                  >
                    <span className="icon">
                      <i className="fas">
                        <FontAwesomeIcon
                          icon={
                            this.props.sortColumnHandler(colHeaderObj.colName)
                              ? "angle-up"
                              : "angle-down"
                          }
                        />
                      </i>
                    </span>
                  </button>
                </th>
              ))}
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
                    <Link to={"tea/" + tea.id} data-testid="detailslink">
                      {tea.name}
                    </Link>
                  </td>
                  <td>{tea.brand}</td>
                  <td>{tea.teaType}</td>
                  <td>{tea.servings}</td>
                  <td>
                    <Link to={"/update-tea/" + tea.id} data-testid="editlink">
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      data-testid="deletelink"
                      className="button is-danger is-small"
                      onClick={() => this.props.handleDeleteClick(tea.id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
            {this.props.teaIDs.length === 0 && (
              <tr>
                {this.props.filtered ? (
                  <td>
                    There are no teas that meet your filter criteria, please try
                    again.
                  </td>
                ) : (
                  <td>
                    You don't have any teas yet! Why not{" "}
                    <Link to={"/new-tea"}>add some</Link>?
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TeaCollectionTable;
