import React from "react";
import PropTypes from "prop-types";

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
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            min={this.props.min}
            max={this.props.max}
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

InputField.defaultProps = {
  className: "input",
  value: ""
};

InputField.propTypes = {
  datatestid: PropTypes.string,
  className: PropTypes.string,
  valid: PropTypes.bool,
  errorClass: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  list: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  datalist: PropTypes.object,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func
};
