import React from "react";

const InputField = React.memo(props => {
  return (
    <>
      <div className="control" data-testid="inputfield">
        <input
          data-testid={props.datatestid}
          className={
            props.error == "invalid" ? props.errorClass : props.className
          }
          id={props.id}
          name={props.name}
          type={props.type}
          list={props.list}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        {props.datalist}
      </div>
      {props.error == "invalid" && (
        <p className="help is-danger" data-testid="inputerror">
          {props.errorMessage}
        </p>
      )}
    </>
  );
});

export default InputField;
