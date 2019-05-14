import React from "react";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { InputField } from "../../FormComponents/InputField";

library.add(faAngleDown, faAngleUp);

export const TeaCollectionTable = React.memo(props => {
  return (
    <div className="container">
      <div className="columns is-pulled-right">
        <form onSubmit={props.handleFilterClick}>
          <div className="field has-addons">
            <div className="control">
              <span className="select is-small">
                <select
                  name="filterCategory"
                  value={props.formControls.filterCategory}
                  onChange={props.filterDropdownChangeHandler}
                >
                  <option key="category" value="">
                    Filter by
                  </option>
                  {props.columnHeaders.map(colHeaderObj => (
                    <option
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
              className="input is-small"
              name="filterCriteria"
              type="text"
              list="fcriteria"
              placeholder="Filter Text"
              value={props.formControls.filterCriteria}
              onChange={props.filterInputChangeHandler}
              datalist={props.datalist}
            />
            <div className="control">
              <button type="submit" className="button is-small">
                Filter
              </button>
            </div>
          </div>
        </form>
        {props.filtered && (
          <div className="control">
            <button
              className="button is-primary is-small"
              onClick={props.handleClearFilterClick}
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            {props.columnHeaders.map(colHeaderObj => (
              <th key={colHeaderObj.colName}>
                {colHeaderObj.colTitle + " "}
                <button
                  className="button is-small"
                  type="button"
                  aria-pressed="false"
                  onClick={() =>
                    props.handleSortClick(
                      colHeaderObj.colName,
                      props.sortColumnHandler(colHeaderObj.colName)
                        ? "desc"
                        : "asc"
                    )
                  }
                >
                  <span className="icon">
                    <i className="fas">
                      <FontAwesomeIcon
                        icon={
                          props.sortColumnHandler(colHeaderObj.colName)
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
          {props.teaIDs.map(teaID => {
            const tea = props.allTeas[teaID];
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
                    onClick={() => props.handleDeleteClick(tea.id)}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
          {props.teaIDs.length === 0 && (
            <tr>
              {props.filtered ? (
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
});
