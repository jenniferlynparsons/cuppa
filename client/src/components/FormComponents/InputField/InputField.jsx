import React from "react";

const InputField = React.memo(props => {
  return (
    <div className="control" data-testid="inputfield">
      <input
        data-testid={props.datatestid}
        className={props.className}
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
  );
});

export default InputField;
