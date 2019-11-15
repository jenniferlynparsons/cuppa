import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { convertTimeToMinSec } from "../../../lib/timerHelpers";
import TeaTypeEditor from "../TeaTypeEditor";

export class TeaTypeCollectionTable extends React.Component {
  render() {
    return (
      <div data-testid="teatypecollection" className="container">
        {this.props.flash === "success" && (
          <p data-testid="flash" className="notification is-success">
            Tea type has been successfully updated.
          </p>
        )}
        <button className="button is-primary" onClick={this.props.onModalOpen}>
          Add A New Type
        </button>

        {this.props.teaTypeID && (
          <TeaTypeEditor teaTypeID={this.props.teaTypeID} />
        )}
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
                    <button
                      data-testid="editlink"
                      className="button is-primary is-small"
                      onClick={() => this.props.onModalOpen(teaType.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      data-testid="deletelink"
                      className="button is-danger is-small"
                      onClick={() => this.props.onDeleteClick(teaType.id)}
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

TeaTypeCollectionTable.propTypes = {
  flash: PropTypes.string.isRequired,
  columnHeaders: PropTypes.array.isRequired,
  teaTypeIDs: PropTypes.array.isRequired,
  teaTypeID: PropTypes.string,
  allTeaTypes: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onModalOpen: PropTypes.func.isRequired
};
