import React from "react";

export class GenericComponent extends React.PureComponent {
  render() {
    return (
      <div data-testid="generic">
        <h1>Hello, World!</h1>
      </div>
    );
  }
}
