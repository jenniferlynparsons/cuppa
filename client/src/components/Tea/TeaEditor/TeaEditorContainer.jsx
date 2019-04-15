/* eslint-disable no-console */
import React from "react";
import uuidv4 from "uuid/v4";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { find, isEmpty } from "lodash";
import { addTea, editTea, getTeas } from "../../../actions/teaActions";
import { editTeaFlash } from "../../../actions/flashActions";
import { TeaEditor } from "./TeaEditor";

export class TeaEditorContainer extends React.Component {
  state = {
    flash: {
      name: "",
      teaId: ""
    },
    touched: {
      name: false,
      servings: false
    },
    userID: this.props.userID,
    currentTea: this.props.currentTea || "",
    teaId: this.props.currentTea.id || "",
    name: this.props.currentTea.name || "",
    brand: this.props.currentTea.brand || "",
    teaType: this.props.currentTea.teaType || "",
    servings: this.props.currentTea.servings || "",
    edit: !isEmpty(this.props.currentTea),
    brands: []
  };

  // validate = (name, servings) => {
  //   return {
  //     name: name.length === 0,
  //     servings: servings.length === 0
  //   };
  // };

  handleBlur = field => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  handleNameChange = event => {
    this.setState({
      ...this.state,
      name: event.currentTarget.value
    });
  };

  handleBrandChange = event => {
    this.setState({
      ...this.state,
      brand: event.currentTarget.value
    });
  };

  handleTypeChange = event => {
    this.setState({
      ...this.state,
      teaType: event.currentTarget.value
    });
  };

  handleServingsChange = event => {
    this.setState({
      ...this.state,
      servings: event.currentTarget.value
    });
  };

  handleSubmitButton = e => {
    if (!this.state.teaId) {
      this.setState({
        ...this.state,
        teaId: uuidv4()
      });
    }

    this.setState({
      touched: {
        ...this.state.touched
      }
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // if ((errors.servings || errors.name) === false) {
    this.props.handleSubmit(this.state);
    if (this.state.edit === true) {
      this.props.updateFlash(true);
      this.props.history.push("/tea/" + this.state.teaId);
    } else {
      this.setState({
        flash: {
          name: this.state.name,
          teaId: this.state.teaId
        },
        touched: {
          name: false,
          servings: false
        },
        teaId: "",
        userID: this.props.userID,
        name: "",
        brand: "",
        teaType: "",
        servings: "",
        edit: false
      });
    }
    // }
  };

  getBrandsFromTeas = teas => {
    return teas.map(tea => tea.brand);
  };

  componentDidMount() {
    this.props.getTeaList(this.props.userID);
  }

  render() {
    // const errors = this.validate(this.state.name, this.state.servings);
    // // // TODO refine validation on form submit
    // const isDisabled = Object.keys(errors).some(x => errors[x]);
    // const shouldMarkError = field => {
    //   const hasError = errors[field];
    //   const shouldShow = this.state.touched[field];

    //   return hasError ? shouldShow : false;
    // };
    return (
      <TeaEditor
        // validate={this.validate}
        // shouldMarkError={this.shouldMarkError}
        // isDisabled={this.isDisabled}
        teaTypes={this.props.teaTypes}
        name={this.state.name}
        brand={this.state.brand}
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
  let currentTeaId = ownProps.match.params.id;
  let currentTea = currentTeaId
    ? find(state.teas, tea => tea.id === currentTeaId) || {}
    : {};
  return {
    teas: state.teas,
    teaTypes: state.teaTypes,
    userID: state.auth.user.id,
    currentTea: currentTea
  };
};

const mapDispatchToProps = dispatch => ({
  handleSubmit: tea => {
    if (tea.edit === true) {
      dispatch(editTea(tea));
    } else {
      dispatch(addTea(tea));
    }
  },
  updateFlash: status => {
    dispatch(editTeaFlash(status));
  },
  getTeaList: userIDNum => {
    dispatch(getTeas(userIDNum));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TeaEditorContainer)
);
