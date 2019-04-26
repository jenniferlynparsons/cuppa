import React from "react";
import { connect } from "react-redux";
import { deleteTea, getTeas, sortTeaOrder } from "../../../actions/teaActions";
import TeaList from "./TeaList";

export class TeaListContainer extends React.Component {
  handleDeleteClick = tea => {
    this.props.handleDelete(tea);
  };

  handleSortClick = (columnName, teas, sortOrder) => {
    this.props.sortTeas(columnName, teas, sortOrder);
  };

  componentDidMount() {
    this.props.getTeaList(this.props.userID);
  }

  render() {
    return !this.props.teas.allTeas ? null : (
      <TeaList
        userID={this.props.userID}
        teas={this.props.teas}
        teaTypes={this.props.teaTypes}
        handleDeleteClick={this.handleDeleteClick}
        handleSortClick={this.handleSortClick}
        getTeaList={this.props.getTeaList}
        getUser={this.props.getUser}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    teas: state.teas,
    teaTypes: state.teaTypes,
    userID: state.auth.user.id
  };
};

const mapDispatchToProps = dispatch => ({
  handleDelete: teaID => {
    dispatch(deleteTea(teaID));
  },
  getTeaList: userID => {
    dispatch(getTeas(userID));
  },
  sortTeas: (columnName, teas, sortOrder) => {
    dispatch(sortTeaOrder(columnName, teas, sortOrder));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaListContainer);
