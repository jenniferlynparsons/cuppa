import React from "react";
import { connect } from "react-redux";
import {
  nameSchema,
  brandSchema,
  teaTypeSchema,
  servingsSchema
} from "../../../lib/validationSchemas";
import { addTea, editTea, getTeas } from "../../../actions/teaActions";
import { getTeaTypes } from "../../../actions/teaTypeActions";
import { editTeaFlash } from "../../../actions/flashActions";
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
    userID: this.props.userID,
    currentTea: this.props.currentTea || "",
    id: this.props.currentTea ? this.props.currentTea.id : "",
    name: this.props.currentTea ? this.props.currentTea.name : "",
    brand: this.props.currentTea ? this.props.currentTea.brand : "",
    teaType: this.props.currentTea ? this.props.currentTea.teaType : "",
    teaTypes: this.props.teaTypes ? this.props.teaTypes : "",
    servings: this.props.currentTea ? this.props.currentTea.servings : "",
    edit: !!this.props.currentTea,
    brands: [],
    brandsDataList: [],
    errors: {
      name: true,
      brand: true,
      teaType: true,
      servings: true,
      incomplete: true,
      teaConflict: true
    },
    errorMessages: {
      name: "Please enter a tea name",
      brand: "Please enter a tea brand",
      teaType: "Please choose a tea type",
      servings: "Please enter the number of servings available"
    }
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
      servings: Number(event.currentTarget.value)
    });
  };

  handleSubmitButton = () => {
    this.setState(state => ({
      touched: {
        ...state.touched
      }
    }));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const namevalid = nameSchema.isValidSync(this.state);
    const brandvalid = brandSchema.isValidSync(this.state);
    const teaTypevalid = teaTypeSchema.isValidSync(this.state);
    const servingsvalid = servingsSchema.isValidSync(this.state);

    const teaData = {
      userID: this.state.userID,
      id: this.state.id,
      name: this.state.name,
      brand: this.state.brand,
      teaType: this.state.teaType,
      servings: this.state.servings
    };

    if (namevalid && brandvalid && teaTypevalid && servingsvalid) {
      if (this.state.edit === true) {
        this.props.editTea(teaData);
        this.props.editTeaFlash("on");
        this.props.history.push("/tea/" + this.state.id);
      } else {
        this.props.addTea(teaData);
        this.setState({
          flash: {
            name: this.state.name,
            id: this.state.id
          },
          touched: {
            name: false,
            servings: false
          },
          id: "",
          userID: this.props.userID,
          name: "",
          brand: "",
          teaType: "",
          teaTypes: this.props.teaTypes,
          servings: "",
          edit: false,
          errors: {
            name: true,
            brand: true,
            teaType: true,
            servings: true,
            incomplete: true,
            teaConflict: true
          }
        });
      }
    } else {
      this.setState(state => ({
        errors: {
          ...state.errors,
          name: namevalid,
          brand: brandvalid,
          teaType: teaTypevalid,
          servings: servingsvalid,
          incomplete: false
        }
      }));
    }
  };

  componentDidMount() {
    this.props.getTeas(this.props.userID);
    this.props.getTeaTypes(this.props.userID);
    if (this.props.serverErrors && this.props.serverErrors.teaConflict) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          teaConflict: false
        }
      }));
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.currentTea && !prevProps.currentTea) ||
      (this.props.currentTea &&
        this.props.currentTea.id !== prevProps.currentTea.id)
    ) {
      this.setState({
        id: this.props.currentTea.id,
        name: this.props.currentTea.name,
        brand: this.props.currentTea.brand,
        teaType: this.props.currentTea.teaType,
        servings: this.props.currentTea.servings,
        edit: true,
        brandsDataList: this.props.teas.ids.map(id => {
          return this.props.teas.allTeas[id].brand;
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
        errors={this.state.errors}
        errorMessages={this.state.errorMessages}
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
    teas: state.teas,
    userID: state.auth.user.id,
    currentTea: state.teas.allTeas[ownProps.match.params.id],
    serverErrors: state.auth.errors
  };
};

const mapDispatchToProps = {
  editTea,
  addTea,
  editTeaFlash,
  getTeas,
  getTeaTypes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaEditorContainer);

export const TeaEditorContainerClass = TeaEditorContainer;
