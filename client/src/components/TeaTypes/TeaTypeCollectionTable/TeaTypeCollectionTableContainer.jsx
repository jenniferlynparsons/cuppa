import React from "react";
import { connect } from "react-redux";
import { deleteTeaType, getTeaTypes } from "../../../actions/teaTypeActions";
import { TeaTypeCollectionTable } from "./TeaTypeCollectionTable";

export class TeaTypeCollectionTableContainer extends React.Component {
  columnHeaders = [
    { colName: "name", colTitle: "Name" },
    { colName: "brewTime", colTitle: "Brew Time" }
  ];

  handleDeleteClick = teaType => this.props.deleteTeaType(teaType);

  componentDidMount() {
    this.props.getTeaTypes(this.props.userID);
  }

  render() {
    return (
      this.props.teaTypes.allTeaTypes && (
        <TeaTypeCollectionTable
          columnHeaders={this.columnHeaders}
          allTeaTypes={this.props.teaTypes.allTeaTypes}
          teaTypeIDs={this.props.teaTypes.teaTypeIDs}
          handleDeleteClick={this.handleDeleteClick}
        />
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    teaTypes: state.teaTypes,
    userID: state.auth.user.id
  };
};

const mapDispatchToProps = {
  deleteTeaType,
  getTeaTypes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaTypeCollectionTableContainer);

export const TeaTypeCollectionTableContainerClass = TeaTypeCollectionTableContainer;
