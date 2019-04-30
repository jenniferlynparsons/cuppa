import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

library.add(faAngleDown, faAngleUp);

export class TableColumnHeader extends React.Component {
  sortColumn = () => {
    return (
      this.props.sortColumn === this.props.columnName &&
      this.props.sortOrder === "asc"
    );
  };

  render() {
    const columnName =
      this.props.columnName === "teaType"
        ? "Type"
        : this.props.columnName.charAt(0).toUpperCase() +
          this.props.columnName.slice(1);

    return (
      <th>
        {columnName + " "}
        <button
          className="button is-small"
          type="button"
          aria-pressed="false"
          onClick={() =>
            this.props.handleSortClick(
              this.props.columnName,
              this.sortColumn() ? "desc" : "asc"
            )
          }
        >
          <span className="icon">
            <i className="fas">
              <FontAwesomeIcon
                icon={this.sortColumn() ? "angle-up" : "angle-down"}
              />
            </i>
          </span>
        </button>
      </th>
    );
  }
}

export default TableColumnHeader;
