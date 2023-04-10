import React from "react";
import { ProgressBar as ProgBar } from "react-bootstrap";

export const ProgressBar = ({ now }) => (
  <ProgBar className="custom-progress-bar" animated now={now} />
);

export default ProgressBar;
