import React from "react";

export class EmptyTeaList extends React.Component {
  render() {
    return (
      <tr>
        {this.props.filtered ? (
          <td>
            There are no teas that meet your filter criteria, please try again.
          </td>
        ) : (
          <td>You don't have any teas yet! Why not add some?</td>
        )}
      </tr>
    );
  }
}

export default EmptyTeaList;
