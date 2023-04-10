import React from "react";
import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { frontendRoutes } from "../../utils/routes";

import "./index.scss";

export const ComingSoon = ({ history }) => {
  const onBack = () => history.push(frontendRoutes.dashboard);

  return (
    <div className="comingSoonPage fixedHeight d-flex flex-column px-4">
      <div className="flex-1 d-flex flex-column align-items-center justify-content-center w-100">
        <div className="mb-2 text-center">
          <i className={`icon mr-0 comingSoonIcon iconXl`}></i>
        </div>
        <p className="alertSubText">
          We are currently working on this feature.
        </p>
      </div>

      <div className="mb-4 w-100">
        <Button
          className="btn-exlarge btn btn-primary btn-primary-outline btn-block mb-3"
          variant="primary"
          onClick={onBack}
        >
          BACK
        </Button>
      </div>
    </div>
  );
};
export default ComingSoon;
