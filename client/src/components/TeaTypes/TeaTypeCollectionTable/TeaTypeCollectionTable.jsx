import React from "react";
import { Link } from "react-router-dom";
import { convertTimeToMinSec } from "../../../lib/timeConverter";

export class TeaTypeCollectionTable extends React.Component {
  render() {
    return (
      <div data-testid="teatypecollection" className="container">
        <Link to={"/new-tea-type"} className="button is-primary">
          Add A New Type
        </Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              {this.props.columnHeaders.map(colHeaderObj => (
                <th key={colHeaderObj.colName}>
                  {colHeaderObj.colTitle + " "}
                </th>
              ))}
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.teaTypeIDs.map(teaTypeID => {
              const teaType = this.props.allTeaTypes[teaTypeID];
              const brewTime = convertTimeToMinSec(teaType.brewTime);
              return (
                <tr key={teaType.id}>
                  <td>{teaType.name}</td>
                  <td>
                    {brewTime.minute}:{brewTime.seconds}
                  </td>
                  <td>
                    <Link
                      to={"/update-tea-type/" + teaType.id}
                      data-testid="editlink"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      data-testid="deletelink"
                      className="button is-danger is-small"
                      onClick={() => this.props.handleDeleteClick(teaType.id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
            {this.props.teaTypeIDs.length === 0 && (
              <tr>
                <td>
                  You don&apos;t have any teas types yet! Why not{" "}
                  <Link to={"/new-tea-type"}>add some</Link>?
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
