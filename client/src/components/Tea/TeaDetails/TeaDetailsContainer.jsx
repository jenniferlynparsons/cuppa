/* eslint-disable no-console */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteTea, getTeas } from "../../../actions/teaActions";
import { TeaDetails } from "./TeaDetails";
import { editTeaFlash } from "../../../actions/flashActions";

class TeaDetailsContainer extends Component {
  state = {
    teaId: "",
    name: "",
    brand: "",
    teaType: "",
    servings: ""
  };

  clickHandler = (e, status) => {
    this.props.updateFlash(status);
  };

  componentDidMount() {
    this.props.getTeaList(this.props.userID);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.tea.id !== prevState.teaId) {
      this.setState({
        teaId: this.props.tea.id,
        name: this.props.tea.name,
        brand: this.props.tea.brand,
        teaType: this.props.tea.teaType,
        servings: this.props.tea.servings
      });
    }
  }

  render() {
    return (
      <TeaDetails
        tea={this.state}
        flash={this.props.flash}
        onClick={this.clickHandler}
        updateFlash={this.props.updateFlash}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  teas: state.teas,
  tea: state.teas[ownProps.match.params.id],
  flash: state.flash,
  userID: state.auth.user.id
});

const mapDispatchToProps = dispatch => ({
  handleDelete: tea => {
    dispatch(deleteTea(tea));
  },
  updateFlash: status => {
    dispatch(editTeaFlash(status));
  },
  getTeaList: userIDNum => {
    dispatch(getTeas(userIDNum));
  }
});

// TODO figure out the typings mismatch
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TeaDetailsContainer)
);
