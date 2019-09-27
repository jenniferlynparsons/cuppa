import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

library.add(faStar);

class StarRating extends React.Component {
  stars = [
    { value: 1, name: "one" },
    { value: 2, name: "two" },
    { value: 3, name: "three" },
    { value: 4, name: "four" },
    { value: 5, name: "five" }
  ];

  render() {
    if (this.props.handleRatingClick) {
      return (
        <div data-testid="starrating">
          <p className="is-size-6 has-text-weight-bold">Rating</p>
          {this.stars.map(star => {
            return (
              <label htmlFor={star.name} key={star.name}>
                <span className="is-hidden" aria-hidden="false">
                  {star.name}
                </span>
                <span className="icon" aria-hidden="true">
                  <i className="fas">
                    <FontAwesomeIcon
                      icon="star"
                      className={[
                        "star",
                        this.props.rating >= star.value ? "active" : ""
                      ].join(" ")}
                    />
                  </i>
                </span>
                <input
                  data-testid={"star" + star.name}
                  id={star.name}
                  name="rating"
                  type="radio"
                  value={star.value}
                  className="is-hidden"
                  aria-hidden="false"
                  onClick={this.props.handleRatingClick}
                />
              </label>
            );
          })}
        </div>
      );
    } else {
      return (
        <div data-testid="starrating" className="is-inline">
          {this.stars.map(star => {
            return (
              <div key={star.name} className="is-inline">
                <span className="is-hidden" aria-hidden="false">
                  {star.name}
                </span>
                <span className="icon" aria-hidden="true">
                  <i className="fas">
                    <FontAwesomeIcon
                      icon="star"
                      className={[
                        "star",
                        this.props.rating >= star.value ? "active" : ""
                      ].join(" ")}
                    />
                  </i>
                </span>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default StarRating;
