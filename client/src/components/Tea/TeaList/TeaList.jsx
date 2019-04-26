import React from "react";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

library.add(faAngleDown);

export class TeaList extends React.Component {
  render() {
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
                    this.props.handleSortClick(
                      "name",
                      this.props.teas,
                      this.props.sortOrder
                    )
                  }
                >
                  <span className="icon">
                    <i className="fas fa-angle-down">
                      <FontAwesomeIcon icon="angle-down" />
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
                    this.props.handleSortClick(
                      "brand",
                      this.props.teas,
                      this.props.sortOrder
                    )
                  }
                >
                  <span className="icon">
                    <i className="fas fa-angle-down">
                      <FontAwesomeIcon icon="angle-down" />
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
                    this.props.handleSortClick(
                      "teaType",
                      this.props.teas,
                      this.props.sortOrder
                    )
                  }
                >
                  <span className="icon">
                    <i className="fas fa-angle-down">
                      <FontAwesomeIcon icon="angle-down" />
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
                    this.props.handleSortClick(
                      "servings",
                      this.props.teas,
                      this.props.sortOrder
                    )
                  }
                >
                  <span className="icon">
                    <i className="fas fa-angle-down">
                      <FontAwesomeIcon icon="angle-down" />
                    </i>
                  </span>
                </button>
              </td>
              <td />
              <td />
            </tr>
          </thead>
          <tbody>
            {this.props.teas.teaIDs.map(teaID => {
              const tea = this.props.teas.allTeas[teaID];

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
