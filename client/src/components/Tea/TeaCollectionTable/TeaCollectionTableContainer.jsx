import React from "react";
import { connect } from "react-redux";
import { deleteTea, getTeas } from "../../../actions/teaActions";
import TeaCollectionTable from "./TeaCollectionTable";
import DataList from "../../DataList";

export class TeaCollectionTableContainer extends React.Component {
  state = {
    sortedIDs: [],
    memoizedIDs: {},
    sortColumn: "",
    sortOrder: "",
    formControls: {
      filterCategory: "",
      filterCriteria: ""
    },
    filtered: false,
    dataList: []
  };

  columnHeaders = [
    { colName: "name", colTitle: "Name" },
    { colName: "brand", colTitle: "Brand" },
    { colName: "teaType", colTitle: "Type" },
    { colName: "servings", colTitle: "Servings" }
  ];

  handleDeleteClick = tea => this.props.handleDelete(tea);

  handleSortClick = (columnName, sortOrder) => {
    let newState = {
      sortColumn: columnName,
      sortOrder: sortOrder
    };

    if (this.state.memoizedIDs.columnName === columnName) {
      newState["sortedIDs"] = this.state.memoizedIDs[sortOrder];
    } else {
      let newSortOrder = this.state.sortedIDs.sort((a, b) => {
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

      newState["sortedIDs"] = newSortOrder;

      newState["memoizedIDs"] = {
        columnName: columnName,
        asc: newSortOrder,
        desc: revSortOrder
      };
    }
    this.setState({
      ...newState
    });
  };

  sortColumnHandler = columnName =>
    this.state.sortColumn === columnName && this.state.sortOrder === "asc";

  filterDropdownChangeHandler = event => {
    const dataListOptions = this.state.sortedIDs.map(
      teaID => this.props.teas.allTeas[teaID][event.target.value]
    );

    this.setState({
      formControls: {
        ...this.state.formControls,
        filterCategory: event.target.value
      },
      dataList: dataListOptions
    });
  };

  filterInputChangeHandler = event => {
    this.setState({
      formControls: {
        ...this.state.formControls,
        filterCriteria: event.target.value
      }
    });
  };

  handleFilterClick = event => {
    event.preventDefault();
    const list = this.state.sortedIDs;
    let currentFilterState = this.state.memoizedIDs;
    let newFilterOrder;

    if (
      this.state.formControls.filterCategory !== "" &&
      this.state.formControls.filterCriteria !== ""
    ) {
      newFilterOrder = list.filter(item => {
        if (Number(this.state.formControls.filterCriteria)) {
          return (
            this.props.teas.allTeas[item][
              this.state.formControls.filterCategory
            ] == this.state.formControls.filterCriteria
          );
        } else {
          return (
            this.props.teas.allTeas[item][
              this.state.formControls.filterCategory
            ]
              .toLowerCase()
              .search(this.state.formControls.filterCriteria.toLowerCase()) !==
            -1
          );
        }
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
      filtered: false,
      dataList: []
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
        sortOrder: "",
        formControls: {
          filterCategory: "",
          filterCriteria: ""
        },
        filtered: false
      });
    }
  }

  render() {
    return (
      this.props.teas.allTeas && (
        <TeaCollectionTable
          datalist={<DataList id="fcriteria" options={this.state.dataList} />}
          columnHeaders={this.columnHeaders}
          allTeas={this.props.teas.allTeas}
          teaIDs={this.state.sortedIDs}
          formControls={this.state.formControls}
          filtered={this.state.filtered}
          handleDeleteClick={this.handleDeleteClick}
          handleSortClick={this.handleSortClick}
          handleFilterClick={this.handleFilterClick}
          handleClearFilterClick={this.handleClearFilterClick}
          filterDropdownChangeHandler={this.filterDropdownChangeHandler}
          filterInputChangeHandler={this.filterInputChangeHandler}
          sortColumnHandler={this.sortColumnHandler}
        />
      )
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
)(TeaCollectionTableContainer);
