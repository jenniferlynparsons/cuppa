import React from "react";
import { connect } from "react-redux";
import { editTea } from "../../actions/teaActions";
import { StarRating } from "./StarRating";

class StarRatingContainer extends React.Component {
  state = {
    tea: {
      id: this.props.tea ? this.props.tea.id : "",
      rating: this.props.tea ? this.props.tea.rating : "",
      originalRating: ""
    }
  };

  handleRatingClick = () => {
    if (this.state.tea.rating === this.state.originalRating) {
      this.setState(
        {
          tea: { ...this.state.tea, rating: this.state.tea.rating }
        },
        () => {
          this.props.editTea(this.state.tea);
        }
      );
    }
  };

  componentDidMount() {
    this.setState();
  }

  render() {
    return <StarRating rating={this.state.tea.rating} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tea: state.teas.allTeas[ownProps.teaID]
  };
};

const mapDispatchToProps = {
  editTea
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StarRatingContainer);

export const StarRatingContainerClass = StarRatingContainer;
