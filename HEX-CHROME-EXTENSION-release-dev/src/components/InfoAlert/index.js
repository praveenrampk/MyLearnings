import React from "react";
import { Alert } from "react-bootstrap";

export const InfoAlert = ({ children, message }) => (
  <Alert className="mt-3 mb-4" variant="info">
    Info: {message || children}
  </Alert>
);

export default InfoAlert;
