import React from "react";
import { connect } from "react-redux";
import { deleteTea, getTeas } from "../../../actions/teaActions";
import TeaList from "./TeaList";

export class TeaListContainer extends React.Component {
  state = {
    sortedIDs: [],
    memoizedIDs: {},
    sortColumn: "",
    sortOrder: "",
    formControls: {
      filterCategory: "",
      filterCriteria: ""
    },
    filtered: false
  };

  handleDeleteClick = tea => {
    this.props.handleDelete(tea);
  };

  handleSortClick = (columnName, sortOrder) => {
    const list = this.state.sortedIDs;
    let currentSortState = this.state.memoizedIDs;
    let newSortOrder;

    if (this.state.memoizedIDs.columnName === columnName) {
      newSortOrder = this.state.memoizedIDs[sortOrder];
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

      currentSortState = {
        columnName: columnName,
        asc: newSortOrder,
        desc: revSortOrder
      };
    }
    this.setState({
      sortedIDs: newSortOrder,
      memoizedIDs: currentSortState,
      sortColumn: columnName,
      sortOrder: sortOrder
    });
  };

  filterChangeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      ...this.state.formControls,
      formControls: {
        ...this.state.formControls,
        [name]: value
      }
    });
  };

  handleFilterClick = () => {
    const list = this.props.teas.teaIDs;
    let currentFilterState = this.state.memoizedIDs;
    let newFilterOrder;

    if (
      this.state.formControls.filterCategory !== "" &&
      this.state.formControls.filterCriteria !== ""
    ) {
      newFilterOrder = list.filter(item => {
        return (
          this.props.teas.allTeas[item][this.state.formControls.filterCategory]
            .toLowerCase()
            .search(this.state.formControls.filterCriteria.toLowerCase()) !== -1
        );
      });
      const revSortOrder = [...newFilterOrder].reverse();

      currentFilterState = {
        asc: newFilterOrder,
        desc: revSortOrder
      };

      this.setState({
        sortedIDs: newFilterOrder,
        memoizedIDs: currentFilterState,
        filtered: true
      });
    }
  };

  handleClearFilterClick = () => {
    this.setState({
      sortedIDs: this.props.teas.teaIDs,
      memoizedIDs: this.props.teas.teaIDs,
      formControls: {
        filterCategory: "",
        filterCriteria: ""
      },
      filtered: false
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
      this.setState({
        sortedIDs: this.props.teas.teaIDs,
        memoizedIDs: {},
        sortColumn: "",
        sortOrder: ""
      });
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
        handleFilterClick={this.handleFilterClick}
        handleClearFilterClick={this.handleClearFilterClick}
        filterChangeHandler={this.filterChangeHandler}
        getTeaList={this.props.getTeaList}
        getUser={this.props.getUser}
        sortColumn={this.state.sortColumn}
        sortOrder={this.state.sortOrder}
        formControls={this.state.formControls}
        filtered={this.state.filtered}
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
