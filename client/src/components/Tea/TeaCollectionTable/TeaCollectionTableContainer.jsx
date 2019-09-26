import React from "react";
import { connect } from "react-redux";
import {
  filterCategorySchema,
  filterCriteriaSchema
} from "../../../lib/validationSchemas";
import { deleteTea, getTeas } from "../../../actions/teaActions";
import { getTeaTypes } from "../../../actions/teaTypeActions";
import { setTimerID } from "../../../actions/timerActions";
import { TeaCollectionTable } from "./TeaCollectionTable";
import DataList from "../../FormComponents/DataList";

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
    dataList: [],
    inputValidation: {
      filterCategory: true,
      filterCriteria: true
    },
    errorMessages: {
      filterCategory: "Please choose a category",
      filterCriteria: "Please enter a filter term"
    },
    loadingStatus: "inprogress"
  };

  columnHeaders = [
    { colName: "name", colTitle: "Name" },
    { colName: "brand", colTitle: "Brand" },
    { colName: "teaType", colTitle: "Type" },
    { colName: "servings", colTitle: "Servings" },
    { colName: "rating", colTitle: "Rating" }
  ];

  handleDeleteClick = tea => this.props.deleteTea(tea);

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
    this.setState(newState);
  };

  handleSortColumn = columnName =>
    this.state.sortColumn === columnName && this.state.sortOrder === "asc";

  handleFilterDropdownChange = event => {
    const value = event.target.value;

    if (value === "") {
      this.handleClearFilterClick();
    } else {
      const dataListOptions = this.state.sortedIDs.map(
        teaID => this.props.teas.allTeas[teaID][value]
      );

      this.setState({
        formControls: {
          ...this.state.formControls,
          filterCategory: value
        },
        dataList: dataListOptions
      });
    }
  };

  handleFilterInputChange = event => {
    let value = event.target.value;
    this.setState(state => ({
      formControls: {
        ...state.formControls,
        filterCriteria: value
      }
    }));
  };

  handleFilterClick = event => {
    event.preventDefault();
    const list = this.state.sortedIDs;
    let currentFilterState = this.state.memoizedIDs;
    let newFilterOrder;

    const categoryvalid = filterCategorySchema.isValidSync(
      this.state.formControls
    );
    const criteriavalid = filterCriteriaSchema.isValidSync(
      this.state.formControls
    );

    if (categoryvalid && criteriavalid) {
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
        filtered: true,
        inputValidation: {
          filterCategory: categoryvalid,
          filterCriteria: criteriavalid
        }
      });
    } else {
      this.setState(state => ({
        inputValidation: {
          ...state.inputValidation,
          filterCategory: categoryvalid,
          filterCriteria: criteriavalid
        }
      }));
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
      dataList: [],
      inputValidation: {
        filterCategory: true,
        filterCriteria: true
      }
    });
  };

  handleOpenTimer = id => {
    this.props.setTimerID(id);
  };
  handleCloseTimer = () => {
    this.props.setTimerID("");
  };

  componentDidMount() {
    this.props.getTeas(this.props.userID).then(() =>
      this.setState({
        sortedIDs: this.props.teas.teaIDs
      })
    );
    this.props
      .getTeaTypes(this.props.userID)
      .then(() => this.setState({ loadingStatus: "complete" }));
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.teas.teaIDs &&
      this.props.teas.teaIDs !== prevProps.teas.teaIDs
    ) {
      this.setState({
        sortedIDs: this.props.teas.teaIDs
      });
    }
  }

  render() {
    if (this.state.loadingStatus !== "complete") {
      return (
        <div data-testid="loadingmessage" className="pageloader is-active">
          <span className="title">Loading</span>
        </div>
      );
    } else {
      return (
        <TeaCollectionTable
          datalist={<DataList id="fcriteria" options={this.state.dataList} />}
          columnHeaders={this.columnHeaders}
          allTeas={this.props.teas.allTeas}
          teaIDs={this.state.sortedIDs}
          teaTypes={this.props.teaTypes}
          formControls={this.state.formControls}
          filtered={this.state.filtered}
          timerID={this.props.timerID}
          inputValidation={this.state.inputValidation}
          errorMessages={this.state.errorMessages}
          handleDeleteClick={this.handleDeleteClick}
          handleSortClick={this.handleSortClick}
          handleFilterClick={this.handleFilterClick}
          handleClearFilterClick={this.handleClearFilterClick}
          handleFilterDropdownChange={this.handleFilterDropdownChange}
          handleFilterInputChange={this.handleFilterInputChange}
          handleSortColumn={this.handleSortColumn}
          handleOpenTimer={this.handleOpenTimer}
          handleCloseTimer={this.handleCloseTimer}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    teas: state.teas,
    teaTypes: state.teaTypes,
    userID: state.auth.user.id,
    timerID: state.timer.timerID
  };
};

const mapDispatchToProps = {
  deleteTea,
  getTeas,
  getTeaTypes,
  setTimerID
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaCollectionTableContainer);

export const TeaCollectionTableContainerClass = TeaCollectionTableContainer;
