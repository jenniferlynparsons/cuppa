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

  datalist = () => <DataList id="fcriteria" options={this.state.dataList} />;

  handleDeleteClick = tea => {
    this.props.handleDelete(tea);
  };

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

  sortColumnHandler = columnName => {
    return (
      this.state.sortColumn === columnName && this.state.sortOrder === "asc"
    );
  };

  filterChangeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    const dataListOptions = this.state.sortedIDs.map(teaID => {
      return this.props.teas.allTeas[teaID][value];
    });

    this.setState({
      formControls: {
        ...this.state.formControls,
        [name]: value
      },
      dataList: dataListOptions
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
        // this returns NaN to get a falsy value if the Number function doesn't return an integer
        if (Number(this.state.formControls.filterCriteria)) {
          // I am actively leveraging the coercion of the double equals here
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
    return this.props.teas.allTeas ? (
      <TeaCollectionTable
        datalist={this.datalist()}
        columnHeaders={this.columnHeaders}
        allTeas={this.props.teas.allTeas}
        teaIDs={this.state.sortedIDs}
        formControls={this.state.formControls}
        filtered={this.state.filtered}
        handleDeleteClick={this.handleDeleteClick}
        handleSortClick={this.handleSortClick}
        handleFilterClick={this.handleFilterClick}
        handleClearFilterClick={this.handleClearFilterClick}
        filterChangeHandler={this.filterChangeHandler}
        sortColumnHandler={this.sortColumnHandler}
      />
    ) : null;
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
