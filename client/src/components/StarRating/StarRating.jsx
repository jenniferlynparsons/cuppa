import React from "react";
import StarSpan from "./StarSpan";

class StarRating extends React.Component {
  stars = [
    { value: 1, name: "one" },
    { value: 2, name: "two" },
    { value: 3, name: "three" },
    { value: 4, name: "four" },
    { value: 5, name: "five" }
  ];

  render() {
    if (this.props.onRatingClick) {
      return (
        <div data-testid="starrating">
          <p className="is-size-6 has-text-weight-bold">Rating</p>
          {this.stars.map(star => {
            return (
              <label htmlFor={star.name} key={star.name}>
                <StarSpan rating={this.props.rating} star={star} />

                <input
                  data-testid={"star" + star.name}
                  id={star.name}
                  name="rating"
                  type="radio"
                  value={star.value}
                  className="is-hidden"
                  aria-hidden="false"
                  onClick={this.props.onRatingClick}
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
                <StarSpan rating={this.props.rating} star={star} />
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default StarRating;
