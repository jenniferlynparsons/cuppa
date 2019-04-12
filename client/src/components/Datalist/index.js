import React from "react";
import { uniq } from "lodash";

export class Datalist extends React.Component {

  render() {
    let options = [];

    if (this.props.options && this.props.processOptions) {
      options = this.props.processOptions(this.props.options);
    } else if (this.props.options) {
      options = this.props.options;
    };

    return (
      <datalist id={this.props.id}>
        {uniq(options).map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </datalist>
    )
  }
}

export default Datalist;