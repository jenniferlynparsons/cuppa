import React from "react";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

library.add(faAngleDown, faAngleUp);

export class TeaList extends React.Component {
  render() {
    const handleSortClick = this.props.handleSortClick;
    const sortColumn = this.props.sortColumn;
    const sortOrder = this.props.sortOrder;

    return (
      <div className="container">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <td>
                Name{" "}
                <button
                  className="button is-small"
                  type="button"
                  aria-pressed="false"
                  onClick={() =>
                    handleSortClick(
                      "name",
                      sortColumn === "name" && sortOrder === "asc"
                        ? "desc"
                        : "asc"
                    )
                  }
                >
                  <span className="icon">
                    <i className="fas">
                      <FontAwesomeIcon
                        icon={
                          sortColumn === "name" && sortOrder === "asc"
                            ? "angle-up"
                            : "angle-down"
                        }
                      />
                    </i>
                  </span>
                </button>
              </td>
              <td>
                Brand{" "}
                <button
                  className="button is-small"
                  type="button"
                  aria-pressed="false"
                  onClick={() =>
                    handleSortClick(
                      "brand",
                      sortColumn === "brand" && sortOrder === "asc"
                        ? "desc"
                        : "asc"
                    )
                  }
                >
                  <span className="icon">
                    <i className="fas">
                      <FontAwesomeIcon
                        icon={
                          sortColumn === "brand" && sortOrder === "asc"
                            ? "angle-up"
                            : "angle-down"
                        }
                      />
                    </i>
                  </span>
                </button>
              </td>
              <td>
                Type{" "}
                <button
                  className="button is-small"
                  type="button"
                  aria-pressed="false"
                  onClick={() =>
                    handleSortClick(
                      "teaType",
                      sortColumn === "teaType" && sortOrder === "asc"
                        ? "desc"
                        : "asc"
                    )
                  }
                >
                  <span className="icon">
                    <i className="fas">
                      <FontAwesomeIcon
                        icon={
                          sortColumn === "teaType" && sortOrder === "asc"
                            ? "angle-up"
                            : "angle-down"
                        }
                      />
                    </i>
                  </span>
                </button>
              </td>
              <td>
                Servings{" "}
                <button
                  className="button is-small"
                  type="button"
                  aria-pressed="false"
                  onClick={() =>
                    handleSortClick(
                      "servings",
                      sortColumn === "servings" && sortOrder === "asc"
                        ? "desc"
                        : "asc"
                    )
                  }
                >
                  <span className="icon">
                    <i className="fas">
                      <FontAwesomeIcon
                        icon={
                          sortColumn === "servings" && sortOrder === "asc"
                            ? "angle-up"
                            : "angle-down"
                        }
                      />
                    </i>
                  </span>
                </button>
              </td>
              <td />
              <td />
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
