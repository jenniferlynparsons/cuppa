import React from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

library.add(faStar);

export class StarRating extends React.Component {
  render() {
    return (
      <div data-testid="starrating">
        <label className="label" htmlFor="one">
          1{" "}
          <span className="icon">
            <i className="fas">
              <FontAwesomeIcon icon="star" className="star-inactive" />
            </i>
          </span>
          <input id="one" name="one" type="checkbox" value="1" />
        </label>
        <label className="label" htmlFor="two">
          2
          <input id="two" name="two" type="checkbox" value="2" />
        </label>
        <label className="label" htmlFor="three">
          3
          <input id="three" name="three" type="checkbox" value="3" />
        </label>
        <label className="label" htmlFor="four">
          4
          <input id="four" name="four" type="checkbox" value="4" />
        </label>
        <label className="label" htmlFor="five">
          5
          <input id="five" name="five" type="checkbox" value="5" />
        </label>
      </div>
    );
  }
}
