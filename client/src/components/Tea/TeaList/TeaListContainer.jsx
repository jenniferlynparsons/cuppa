import React from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { deleteTea, getTeas } from "../../../actions/teaActions";
import TeaList from "./TeaList";

export class TeaListContainer extends React.Component {
  state = {
    loading: true
  };

  handleDeleteClick = tea => {
    this.props.handleDelete(tea);
  };

  teaList = teasExist => {
    if (isEmpty(teasExist)) {
      return <div />;
    } else {
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
  };

  componentDidMount() {
    this.props.getTeaList(this.props.userID);
  }

  componentDidUpdate(prevProps) {
    if (this.props.teas !== prevProps.teas) {
      this.setState({ loading: false });
    }
  }

  render() {
    return this.teaList(this.props.teas);
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
