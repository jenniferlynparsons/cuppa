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
    return !this.props.teas.allTeas ? null : (
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
