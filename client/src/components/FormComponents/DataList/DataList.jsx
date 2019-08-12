import React from "react";

class DataList extends React.Component {
  render() {
    let options = [];
    if (this.props.options && this.props.processOptions) {
      options = this.props.processOptions(this.props.options);
    } else if (this.props.options) {
      options = this.props.options;
    }

    const uniqueOptions = [...new Set(options)];

    return (
      <datalist id={this.props.id}>
        {uniqueOptions.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </datalist>
    );
  }
}

export default DataList;
