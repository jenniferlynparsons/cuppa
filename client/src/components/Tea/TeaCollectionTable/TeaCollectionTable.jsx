import React from "react";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import InputField from "../../FormComponents/InputField";

library.add(faAngleDown, faAngleUp);

export class TeaCollectionTable extends React.Component {
  render() {
    return (
      <div data-testid="teacollection" className="container">
        <div className="columns is-pulled-right">
          <form onSubmit={this.props.handleFilterClick}>
            <div className="field has-addons">
              <div className="control">
                <div
                  className={
                    !this.props.valid.filterCategory
                      ? "select is-small is-danger"
                      : "select is-small"
                  }
                >
                  <select
                    data-testid="filterselect"
                    name="filterCategory"
                    value={this.props.formControls.filterCategory}
                    onChange={this.props.handleFilterDropdownChange}
                    onBlur={this.props.handleFilterDropdownChange}
                  >
                    <option key="category" value="">
                      Filter by
                    </option>
                    {this.props.columnHeaders.map(colHeaderObj => (
                      <option
                        key={colHeaderObj.colName}
                        value={colHeaderObj.colName}
                      >
                        {colHeaderObj.colTitle}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <InputField
                datatestid="filterinput"
                name="filterCriteria"
                type="text"
                list="fcriteria"
                datalist={this.props.datalist}
                placeholder="Filter Text"
                value={this.props.formControls.filterCriteria}
                className="input is-small"
                valid={this.props.valid.filterCriteria}
                errorClass="input is-small is-danger"
                onChange={this.props.handleFilterInputChange}
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
            {!this.props.valid.filterCategory && (
              <p className="help is-danger" data-testid="inputerror">
                {this.props.errorMessages.filterCategory}
              </p>
            )}
            {!this.props.valid.filterCriteria && (
              <p className="help is-danger" data-testid="inputerror">
                {this.props.errorMessages.filterCriteria}
              </p>
            )}
          </form>
          {this.props.filtered && (
            <div className="control">
              <button
                data-testid="clearfilterbutton"
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
                    type="button"
                    className="button is-small"
                    aria-pressed="false"
                    onClick={() =>
                      this.props.handleSortClick(
                        colHeaderObj.colName,
                        this.props.handleSortColumn(colHeaderObj.colName)
                          ? "desc"
                          : "asc"
                      )
                    }
                  >
                    <span className="icon">
                      <i className="fas">
                        <FontAwesomeIcon
                          icon={
                            this.props.handleSortColumn(colHeaderObj.colName)
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
                    You don&apos;t have any teas yet! Why not{" "}
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
