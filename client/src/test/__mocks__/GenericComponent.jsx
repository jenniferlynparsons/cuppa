import React, { Component } from "react";

export class GenericComponent extends Component {
  render() {
    return (
      <div data-test-id="generic">
        <h1>Hello, World!</h1>
      </div>
    );
  }
}
