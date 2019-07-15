import React from "react";
import { Link } from "react-router-dom";

export class TeaDetails extends React.Component {
  render() {
    return (
      <div className="container content" data-testid="teadetails">
        {this.props.flash === "on" && (
          <div className="notification is-success">
            <button
              data-testid="flash"
              className="delete"
              onClick={() => this.props.updateFlash("off")}
            />
            {this.props.tea.name} has been succesfully updated.
          </div>
        )}
        <h1>{this.props.tea.name}</h1>
        <ul>
          <li>
            <span className="has-text-grey-light">Brand:</span>{" "}
            {this.props.tea.brand}
          </li>
          <li>
            <span className="has-text-grey-light">Type:</span>{" "}
            {this.props.tea.teaType}
          </li>
          <li>
            <span className="has-text-grey-light">Servings:</span>{" "}
            {this.props.tea.servings}
          </li>
        </ul>
        <Link
          data-testid="teaeditlink"
          to={"/update-tea/" + this.props.tea.id}
          className="button"
        >
          Edit
        </Link>
      </div>
    );
  }
}
