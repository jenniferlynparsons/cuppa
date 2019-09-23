import React from "react";
import teabag from "../../assets/open-tea-bag.jpg";

class ErrorBoundary extends React.Component {
  state = { error: null };

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    console.log("--- Error ---");
    console.log(error);
    console.log(errorInfo);
    console.log("--------------");
  }
  render() {
    if (this.state.error) {
      return (
        <div className="container content">
          <h1>We&apos;re sorry. Something&apos;s gone wrong.</h1>
          <img src={teabag} alt="A tea bag with its contents spilled out" />
        </div>
      );
    } else {
      //when there's not an error, render children untouched
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
