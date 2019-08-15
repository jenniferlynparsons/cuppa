import React from "react";
import { connect } from "react-redux";
import { deleteTeaType, getTeaTypes } from "../../../actions/teaTypeActions";
import { editFlash, clearFlash } from "../../../actions/flashActions";
import { TeaTypeCollectionTable } from "./TeaTypeCollectionTable";

export class TeaTypeCollectionTableContainer extends React.Component {
  state = {
    allTeaTypes: {},
    teaTypeIDs: [],
    flash: "off"
  };
  columnHeaders = [
    { colName: "name", colTitle: "Name" },
    { colName: "brewTime", colTitle: "Brew Time" }
  ];

  handleDeleteClick = teaType => this.props.deleteTeaType(teaType);

  componentWillMount() {
    this.setState({ flash: this.props.flash });
    this.props.clearFlash();
  }

  componentDidMount() {
    this.props.getTeaTypes(this.props.userID);
    this.setState({
      allTeaTypes: this.props.allTeaTypes,
      teaTypeIDs: this.props.teaTypeIDs
    });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.teaTypeIDs &&
      this.props.teaTypeIDs !== prevProps.teaTypeIDs
    ) {
      this.setState({
        allTeaTypes: this.props.allTeaTypes,
        teaTypeIDs: this.props.teaTypeIDs
      });
    }
  }

  render() {
    return (
      this.props.allTeaTypes && (
        <TeaTypeCollectionTable
          flash={this.state.flash}
          columnHeaders={this.columnHeaders}
          allTeaTypes={this.state.allTeaTypes}
          teaTypeIDs={this.state.teaTypeIDs}
          handleDeleteClick={this.handleDeleteClick}
        />
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    allTeaTypes: state.teaTypes.allTeaTypes,
    teaTypeIDs: state.teaTypes.teaTypeIDs,
    userID: state.auth.user.id,
    flash: state.flash
  };
};

const mapDispatchToProps = {
  editFlash,
  clearFlash,
  deleteTeaType,
  getTeaTypes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaTypeCollectionTableContainer);

export const TeaTypeCollectionTableContainerClass = TeaTypeCollectionTableContainer;
