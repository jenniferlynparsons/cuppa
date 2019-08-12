import React from "react";

class InputField extends React.Component {
  render() {
    return (
      <>
        <div className="control" data-testid="inputfield">
          <input
            data-testid={this.props.datatestid}
            className={[
              this.props.className,
              this.props.valid ? "" : this.props.errorClass
            ].join(" ")}
            id={this.props.id}
            name={this.props.name}
            type={this.props.type}
            list={this.props.list}
            placeholder={this.props.placeholder}
            value={this.props.value}
            min={this.props.min}
            max={this.props.max}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
          />
          {this.props.datalist}
        </div>
        {!this.props.valid && this.props.errorMessage && (
          <p className="help is-danger" data-testid="inputerror">
            {this.props.errorMessage}
          </p>
        )}
      </>
    );
  }
}

export default InputField;
