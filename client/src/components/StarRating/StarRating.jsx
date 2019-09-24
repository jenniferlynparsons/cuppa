import React from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

library.add(faStar);

export class StarRating extends React.Component {
  render() {
    return (
      <div data-testid="starrating">
        <p className="is-size-6 has-text-weight-bold">Rating</p>
        <label htmlFor="one">
          <span className="is-hidden" aria-hidden="false">
            One
          </span>
          <span className="icon" aria-hidden="true">
            <i className="fas">
              <FontAwesomeIcon icon="star" className="star" />
            </i>
          </span>
          <input
            id="one"
            name="rating"
            type="radio"
            value="one"
            className="is-hidden"
            aria-hidden="false"
          />
        </label>
        <label htmlFor="two">
          <span className="is-hidden" aria-hidden="false">
            Two
          </span>
          <span className="icon" aria-hidden="true">
            <i className="fas">
              <FontAwesomeIcon icon="star" className="star" />
            </i>
          </span>
          <input
            name="rating"
            type="radio"
            value="two"
            className="is-hidden"
            aria-hidden="false"
          />
        </label>
        <label htmlFor="three">
          <span className="is-hidden" aria-hidden="false">
            Three
          </span>
          <span className="icon" aria-hidden="true">
            <i className="fas">
              <FontAwesomeIcon icon="star" className="star" />
            </i>
          </span>
          <input
            name="rating"
            type="radio"
            value="three"
            className="is-hidden"
            aria-hidden="false"
          />
        </label>
        <label htmlFor="four">
          <span className="is-hidden" aria-hidden="false">
            Four
          </span>
          <span className="icon" aria-hidden="true">
            <i className="fas">
              <FontAwesomeIcon icon="star" className="star" />
            </i>
          </span>
          <input
            name="rating"
            type="radio"
            value="four"
            className="is-hidden"
            aria-hidden="false"
          />
        </label>
        <label htmlFor="five">
          <span className="is-hidden" aria-hidden="false">
            Five
          </span>
          <span className="icon" aria-hidden="true">
            <i className="fas">
              <FontAwesomeIcon icon="star" className="star" />
            </i>
          </span>
          <input
            name="rating"
            type="radio"
            value="five"
            className="is-hidden"
            aria-hidden="false"
          />
        </label>
      </div>
    );
  }
}
