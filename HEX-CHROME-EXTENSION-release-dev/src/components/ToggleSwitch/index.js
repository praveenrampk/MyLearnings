import React from "react";

const ToggleSwitch = ({ label, value, onClick }) => {
  return (
    <div className="py-2">
      <div className="toggle-checkbox d-flex">
        <input
          type="checkbox"
          id="switch"
          checked={value}
          readOnly={true}
        ></input>
        <label htmlFor="switch" onClick={onClick}></label>
        <span className="checkbox-label cursor-pointer ml-2" onClick={onClick}>
          {label}
        </span>
      </div>
    </div>
  );
};

export default ToggleSwitch;
