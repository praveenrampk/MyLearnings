import React from "react";
import { version } from "../../utils/constants";

const Footer = () => {
  return (
    <div className="footer">
      <p>v{version}</p>
    </div>
  );
};

export default Footer;
