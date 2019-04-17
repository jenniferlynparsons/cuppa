/* eslint-disable no-console */
import React from "react";
import { Link } from "react-router-dom";

export const TeaDetails = props => {
  return (
    <div className="container content">
      {props.flash ? (
        <div className="notification is-success">
          <button className="delete" onClick={e => props.onClick(e, false)} />
          {props.tea.name} has been succesfully updated.
        </div>
      ) : (
        ""
      )}
      <h1>{props.tea.name}</h1>
      <ul>
        <li>
          <span className="has-text-grey-light">Brand:</span> {props.tea.brand}
        </li>
        <li>
          <span className="has-text-grey-light">Type:</span> {props.tea.teaType}
        </li>
        <li>
          <span className="has-text-grey-light">Servings:</span>{" "}
          {props.tea.servings}
        </li>
      </ul>
      <Link
        to={"/update-tea/" + props.tea.teaId}
        className="button"
        onClick={e => props.onClick(e, false)}
      >
        Edit
      </Link>
    </div>
  );
};
