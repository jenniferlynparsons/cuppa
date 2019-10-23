import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

library.add(faStar);

export class StarSpan extends React.Component {
  render() {
    return (
      <>
        <span className="is-hidden" aria-hidden="false">
          {this.props.star.name}
        </span>
        <span className="icon" aria-hidden="true">
          <i className="fas">
            <FontAwesomeIcon
              icon="star"
              className={[
                "star",
                this.props.rating >= this.props.star.value ? "active" : ""
              ].join(" ")}
            />
          </i>
        </span>
      </>
    );
  }
}

export default StarSpan;
