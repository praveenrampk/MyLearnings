import React from "react";
import { Alert } from "react-bootstrap";

export const DangerAlert = ({ message }) => (
  <Alert className="mt-3 mb-4" variant="danger">
    Error: {message}
  </Alert>
);

export default DangerAlert;
