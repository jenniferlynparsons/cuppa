import React from "react";
import { connect } from "react-redux";
import { deleteTea, getTeas } from "../../../actions/teaActions";
import TeaList from "./TeaList";

export class TeaListContainer extends React.Component {
  state = {
    sortedIDs: [],
    memoizedIDs: {},
    sortColumn: "",
    sortOrder: ""
  };

  handleDeleteClick = tea => {
    this.props.handleDelete(tea);
  };

  handleSortClick = (columnName, sortOrder) => {
    const list = this.props.teas.teaIDs;
    let currentState = this.state.memoizedIDs;
    let newSortOrder;

    if (this.state.memoizedIDs[columnName]) {
      newSortOrder = this.state.memoizedIDs[columnName][sortOrder];
    } else {
      newSortOrder = list.sort((a, b) => {
        if (
          this.props.teas.allTeas[a][columnName] >
          this.props.teas.allTeas[b][columnName]
        ) {
          return 1;
        }
        if (
          this.props.teas.allTeas[a][columnName] <
          this.props.teas.allTeas[b][columnName]
        ) {
          return -1;
        }
        return 0;
      });

      const revSortOrder = [...newSortOrder].reverse();

      currentState[columnName] = { asc: newSortOrder, desc: revSortOrder };
    }
    this.setState({
      ...this.state,
      sortedIDs: newSortOrder,
      memoizedIDs: currentState,
      sortColumn: columnName,
      sortOrder: sortOrder
    });
  };

  componentDidMount() {
    this.props.getTeaList(this.props.userID);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.teas.teaIDs &&
      this.props.teas.teaIDs !== prevProps.teas.teaIDs
    ) {
      this.setState({ sortedIDs: this.props.teas.teaIDs, memoizedIDs: {} });
    }
  }

  render() {
    return !this.props.teas.allTeas ? null : (
      <TeaList
        userID={this.props.userID}
        allTeas={this.props.teas.allTeas}
        teaIDs={this.state.sortedIDs}
        teaTypes={this.props.teaTypes}
        handleDeleteClick={this.handleDeleteClick}
        handleSortClick={this.handleSortClick}
        getTeaList={this.props.getTeaList}
        getUser={this.props.getUser}
        sortColumn={this.state.sortColumn}
        sortOrder={this.state.sortOrder}
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaListContainer);
