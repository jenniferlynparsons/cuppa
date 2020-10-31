import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { deleteTeaType, getTeaTypes } from "../../../actions/teaTypeActions";
import { editFlash, clearFlash } from "../../../actions/flashActions";
import { setModalID } from "../../../actions/modalActions";
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

  handleDeleteClick = teaType =>
    this.props.deleteTeaType(this.props.userID, teaType);

  handleModalOpen = id => {
    this.props.setModalID(id);
  };

  componentDidMount() {
    this.setState({ flash: this.props.flash });
    this.props.clearFlash();
    this.props.getTeaTypes(this.props.userID);
    this.setState({
      allTeaTypes: this.props.allTeaTypes,
      teaTypeIDs: this.props.teaTypeIDs
    });
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.teaTypeIDs &&
        this.props.teaTypeIDs !== prevProps.teaTypeIDs) ||
      this.props.teaTypeID !== prevProps.teaTypeID
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
          teaTypeID={this.props.teaTypeID}
          onDeleteClick={this.handleDeleteClick}
          onModalOpen={this.handleModalOpen}
        />
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    allTeaTypes: state.teaTypes.allTeaTypes,
    teaTypeIDs: state.teaTypes.teaTypeIDs,
    teaTypeID: state.modal.modalID,
    userID: state.auth.user.id,
    flash: state.flash
  };
};

const mapDispatchToProps = {
  editFlash,
  clearFlash,
  deleteTeaType,
  getTeaTypes,
  setModalID
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaTypeCollectionTableContainer);

export const TeaTypeCollectionTableContainerClass = TeaTypeCollectionTableContainer;

TeaTypeCollectionTableContainer.propTypes = {
  flash: PropTypes.string,
  userID: PropTypes.string.isRequired,
  allTeaTypes: PropTypes.object.isRequired,
  teaTypeIDs: PropTypes.array.isRequired,
  teaTypeID: PropTypes.string,
  deleteTeaType: PropTypes.func.isRequired,
  clearFlash: PropTypes.func.isRequired,
  getTeaTypes: PropTypes.func.isRequired,
  setModalID: PropTypes.func.isRequired
};
