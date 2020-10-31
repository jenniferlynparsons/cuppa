import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { teaShape } from "../../../lib/propTypes";
import {
  nameSchema,
  brandSchema,
  teaTypeSchema,
  servingsSchema
} from "../../../lib/validationSchemas";
import { addTea, editTea, getTeas } from "../../../actions/teaActions";
import { getTeaTypes } from "../../../actions/teaTypeActions";
import { editFlash } from "../../../actions/flashActions";
import { selectTeaTypes } from "../../../selectors/teaTypeSelectors";
import { TeaEditor } from "./TeaEditor";
import DataList from "../../FormComponents/DataList";

export class TeaEditorContainer extends React.Component {
  state = {
    flash: {
      name: "",
      id: ""
    },
    touched: {
      name: false,
      servings: false
    },
    activeTea: {
      id: this.props.currentTea ? this.props.currentTea.id : "",
      name: this.props.currentTea ? this.props.currentTea.name : "",
      brand: this.props.currentTea ? this.props.currentTea.brand : "",
      teaType: this.props.currentTea ? this.props.currentTea.teaType : "",
      teaTypes: this.props.teaTypes ? this.props.teaTypes : "",
      servings: this.props.currentTea ? this.props.currentTea.servings : "",
      rating: this.props.currentTea ? this.props.currentTea.rating : ""
    },
    inputValidation: {
      name: true,
      brand: true,
      teaType: true,
      servings: true,
      duplicate: true
    },
    errorMessages: {
      name: "Please enter a tea name",
      brand: "Please enter a tea brand",
      teaType: "Please choose a tea type",
      servings: "Please enter the number of servings available"
    },
    loadingStatus: "inprogress"
  };

  initialState = this.state;

  handleBlur = field => () => {
    this.setState(state => ({
      touched: { ...state.touched, [field]: true }
    }));
  };

  handleNameChange = event => {
    let newVal = event.currentTarget.value;
    this.setState(state => ({
      activeTea: { ...state.activeTea, name: newVal }
    }));
  };

  handleBrandChange = event => {
    let newVal = event.currentTarget.value;
    this.setState(state => ({
      activeTea: { ...state.activeTea, brand: newVal }
    }));
  };

  handleTypeChange = event => {
    let newVal = event.currentTarget.value;
    this.setState(state => ({
      activeTea: { ...state.activeTea, teaType: newVal }
    }));
  };

  handleServingsChange = event => {
    let newVal = event.currentTarget.value;
    this.setState(state => ({
      activeTea: {
        ...state.activeTea,
        servings: Number(newVal)
      }
    }));
  };

  handleRatingClick = event => {
    let newVal = event.currentTarget.value;
    this.setState(state => ({
      activeTea: { ...state.activeTea, rating: newVal }
    }));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const namevalid = nameSchema.isValidSync(this.state.activeTea);
    const brandvalid = brandSchema.isValidSync(this.state.activeTea);
    const teaTypevalid = teaTypeSchema.isValidSync(this.state.activeTea);
    const servingsvalid = servingsSchema.isValidSync(this.state.activeTea);

    const teaData = {
      userID: this.props.userID,
      id: this.state.activeTea.id,
      name: this.state.activeTea.name,
      brand: this.state.activeTea.brand,
      teaType: this.state.activeTea.teaType,
      servings: this.state.activeTea.servings,
      rating: this.state.activeTea.rating
    };

    if (namevalid && brandvalid && teaTypevalid && servingsvalid) {
      if (this.props.edit === true) {
        this.props
          .editTea(this.props.userID, teaData)
          .then(() => this.props.editFlash("success"))
          .then(() =>
            this.props.history.push("/tea/" + this.state.activeTea.id)
          );
      } else {
        this.props.addTea(this.props.userID, teaData).then(() =>
          this.setState({
            ...this.initialState,
            loadingStatus: "complete"
          })
        );
      }
    } else {
      this.setState(state => ({
        inputValidation: {
          ...state.inputValidation,
          name: namevalid,
          brand: brandvalid,
          teaType: teaTypevalid,
          servings: servingsvalid
        }
      }));
    }
  };

  componentDidMount() {
    this.props.getTeas(this.props.userID);
    this.props
      .getTeaTypes(this.props.userID)
      .then(() => this.setState({ loadingStatus: "complete" }));
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.currentTea && !prevProps.currentTea) ||
      (this.props.currentTea &&
        this.props.currentTea.id !== prevProps.currentTea.id)
    ) {
      this.setState({
        activeTea: {
          id: this.props.currentTea.id,
          name: this.props.currentTea.name,
          brand: this.props.currentTea.brand,
          teaType: this.props.currentTea.teaType,
          servings: this.props.currentTea.servings,
          rating: this.props.currentTea.rating
        }
      });
    }
    if (
      (this.props.updatedTea && !prevProps.updatedTea) ||
      (this.props.updatedTea &&
        this.props.updatedTea.id !== prevProps.updatedTea.id)
    ) {
      this.setState({
        flash: {
          name: this.props.updatedTea.name,
          id: this.props.updatedTea.id
        }
      });
    }
    if (this.props.serverErrors && !prevProps.serverErrors) {
      this.setState(state => ({
        inputValidation: {
          ...state.inputValidation,
          duplicate: false
        },
        flash: { name: "", id: "" }
      }));
    }
  }

  render() {
    if (this.state.loadingStatus !== "complete") {
      return (
        <div className="pageloader">
          <span className="title">Loading</span>
        </div>
      );
    } else {
      return (
        <TeaEditor
          teaTypes={this.props.teaTypes}
          activeTea={this.state.activeTea}
          brandsDataList={
            <DataList id="brands" options={this.state.brandsDataList} />
          }
          flash={this.state.flash}
          inputValidation={this.state.inputValidation}
          errorMessages={this.state.errorMessages}
          onBlur={this.handleBlur}
          onNameChange={this.handleNameChange}
          onBrandChange={this.handleBrandChange}
          onTypeChange={this.handleTypeChange}
          onServingsChange={this.handleServingsChange}
          onRatingClick={this.handleRatingClick}
          onFormSubmit={this.handleFormSubmit}
        />
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    teaTypes: selectTeaTypes(state.teaTypes),
    teas: state.teas,
    userID: state.auth.user.id,
    currentTea: state.teas.allTeas[ownProps.match.params.id],
    updatedTea: state.teas.updatedTea,
    edit: state.teas.allTeas[ownProps.match.params.id] ? true : false,
    serverErrors: state.errors.serverErrors
  };
};

const mapDispatchToProps = {
  editTea,
  addTea,
  editFlash,
  getTeas,
  getTeaTypes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaEditorContainer);

export const TeaEditorContainerClass = TeaEditorContainer;

TeaEditorContainer.propTypes = {
  userID: PropTypes.string.isRequired,
  currentTea: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  teaTypes: PropTypes.array,
  history: PropTypes.object,
  edit: PropTypes.bool,
  updatedTea: teaShape,
  brandList: PropTypes.array,
  serverErrors: PropTypes.object,
  editTea: PropTypes.func.isRequired,
  editFlash: PropTypes.func.isRequired,
  addTea: PropTypes.func.isRequired,
  getTeas: PropTypes.func.isRequired,
  getTeaTypes: PropTypes.func.isRequired
};
