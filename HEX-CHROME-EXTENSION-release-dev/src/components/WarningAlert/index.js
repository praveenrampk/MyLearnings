import React from "react";
import { Alert } from "react-bootstrap";

export const WarningAlert = ({ message }) => (
  <Alert className="mt-3 mb-4" variant="warning">
    Warning: {message}
  </Alert>
);

export default WarningAlert;
