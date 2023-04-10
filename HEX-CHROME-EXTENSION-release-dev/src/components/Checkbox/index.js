import React from "react";

const Checkbox = ({ title, message, value, onChange }) => {
  return (
    <label className="checkbox">
      <span className="checkbox__input">
        <input
          type="checkbox"
          name="checkbox"
          checked={value}
          onChange={onChange}
        />
        <span className="checkbox__control">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              d="M1.73 12.91l6.37 6.37L22.79 4.59"
            />
          </svg>
        </span>
      </span>
      <div>
        <h3 className="checkbox-label">{title}</h3>
        <p className="checkbox-desc mt-1">{message}</p>
      </div>
    </label>
  );
};

export default Checkbox;
