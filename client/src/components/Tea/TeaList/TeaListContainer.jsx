import React from "react";
import { connect } from "react-redux";
import { deleteTea, getTeas } from "../../../actions/teaActions";
import TeaList from "./TeaList";

export class TeaListContainer extends React.Component {
  handleDeleteClick = tea => {
    this.props.handleDelete(tea);
  };

  componentDidMount() {
    this.props.getTeaList(this.props.userID);
  }

  render() {
    return (
      <TeaList
        userID={this.props.userID}
        teas={this.props.teas}
        teaTypes={this.props.teaTypes}
        handleDelete={this.props.handleDelete}
        getTeaList={this.props.getTeaList}
        getUser={this.props.getUser}
      />
    );
  }
}

const mapStateToProps = state => ({
  teas: state.teas,
  teaTypes: state.teaTypes,
  userID: state.auth.user.id
});

const mapDispatchToProps = dispatch => ({
  handleDelete: tea => {
    dispatch(deleteTea(tea));
  },
  getTeaList: userID => {
    dispatch(getTeas(userID));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaListContainer);
