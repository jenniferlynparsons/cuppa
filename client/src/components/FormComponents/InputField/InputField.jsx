import React from "react";

class InputField extends React.Component {
  render() {
    return (
      <>
        <div className="control" data-testid="inputfield">
          <input
            data-testid={this.props.datatestid}
            className={
              !this.props.error ? this.props.errorClass : this.props.className
            }
            id={this.props.id}
            name={this.props.name}
            type={this.props.type}
            list={this.props.list}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
          />
          {this.props.datalist}
        </div>
        {!this.props.error && this.props.errorMessage && (
          <p className="help is-danger" data-testid="inputerror">
            {this.props.errorMessage}
          </p>
        )}
      </>
    );
  }
}

export default InputField;
