import React from "react";

export const InputField = React.memo(props => {
  return (
    <div className="control">
      <input
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
