/* eslint-disable no-console */
import React from "react";
import uuidv4 from "uuid/v4";
import { connect } from "react-redux";
import { addTea, editTea, getTeas } from "../../../actions/teaActions";
import { editTeaFlash } from "../../../actions/flashActions";
import { TeaEditor } from "./TeaEditor";
import DataList from "../../FormComponents/DataList";

export class TeaEditorContainer extends React.Component {
  state = {
    flash: {
      name: "",
      teaID: ""
    },
    touched: {
      name: false,
      servings: false
    },
    userID: this.props.userID,
    currentTea: this.props.currentTea || "",
    teaID: this.props.currentTea ? this.props.currentTea.id : "",
    name: this.props.currentTea ? this.props.currentTea.name : "",
    brand: this.props.currentTea ? this.props.currentTea.brand : "",
    teaType: this.props.currentTea ? this.props.currentTea.teaType : "",
    servings: this.props.currentTea ? this.props.currentTea.servings : "",
    edit: !!this.props.currentTea,
    brands: [],
    brandsDataList: []
  };

  handleBlur = field => () => {
    this.setState(state => ({
      touched: { ...state.touched, [field]: true }
    }));
  };

  handleNameChange = event => {
    this.setState({
      name: event.currentTarget.value
    });
  };

  handleBrandChange = event => {
    this.setState({
      brand: event.currentTarget.value
    });
  };

  handleTypeChange = event => {
    this.setState({
      teaType: event.currentTarget.value
    });
  };

  handleServingsChange = event => {
    this.setState({
      servings: event.currentTarget.value
    });
  };

  handleSubmitButton = e => {
    if (!this.state.teaID) {
      this.setState({
        teaID: uuidv4()
      });
    }

    this.setState(state => ({
      touched: {
        ...state.touched
      }
    }));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.edit === true) {
      this.props.editTea(this.state);
      this.props.editTeaFlash("on");
      this.props.history.push("/tea/" + this.state.teaID);
    } else {
      this.props.addTea(this.state);
      this.setState({
        flash: {
          name: this.state.name,
          teaID: this.state.teaID
        },
        touched: {
          name: false,
          servings: false
        },
        teaID: "",
        userID: this.props.userID,
        name: "",
        brand: "",
        teaType: "",
        servings: "",
        edit: false
      });
    }
  };

  componentDidMount() {
    this.props.getTeas(this.props.userID);
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.currentTea && !prevProps.currentTea) ||
      (this.props.currentTea &&
        this.props.currentTea.id !== prevProps.currentTea.id)
    ) {
      this.setState({
        teaID: this.props.currentTea.id,
        name: this.props.currentTea.name,
        brand: this.props.currentTea.brand,
        teaType: this.props.currentTea.teaType,
        servings: this.props.currentTea.servings,
        edit: true,
        brandsDataList: this.props.teas.teaIDs.map(teaID => {
          return this.props.teas.allTeas[teaID].brand;
        })
      });
    }
  }

  render() {
    return (
      <TeaEditor
        teaTypes={this.props.teaTypes}
        name={this.state.name}
        brand={this.state.brand}
        brandsDataList={
          <DataList id="brands" options={this.state.brandsDataList} />
        }
        teaType={this.state.teaType}
        servings={this.state.servings}
        flash={this.state.flash}
        handleBlur={this.handleBlur}
        handleNameChange={this.handleNameChange}
        handleBrandChange={this.handleBrandChange}
        handleTypeChange={this.handleTypeChange}
        handleServingsChange={this.handleServingsChange}
        handleSubmitButton={this.handleSubmitButton}
        handleFormSubmit={this.handleFormSubmit}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    teaTypes: state.teaTypes,
    userID: state.auth.user.id,
    currentTea: state.teas.allTeas[ownProps.match.params.id]
  };
};

const mapDispatchToProps = {
  editTea,
  addTea,
  editTeaFlash,
  getTeas
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaEditorContainer);

export const TeaEditorContainerClass = TeaEditorContainer;
