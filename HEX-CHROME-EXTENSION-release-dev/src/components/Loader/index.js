import React from "react";
import { get } from "lodash";
import { getAccDetails } from "../../store";
import ProgressBar from "../ProgressBar";
import "./index.scss";

export const Loader = ({ showProgressBar, percentage }) => {
  const accDetails = getAccDetails();
  return (
    <div className="loader d-flex flex-column">
      <div className="loader-inside icon hexPurple mr-0"></div>

      {get(accDetails, "walletType", "hardware") === "hardware" && (
        <p className="px-5 py-3 text-center">
          If you are using a hardware wallet, watch out for prompts.
        </p>
      )}

      {showProgressBar && <ProgressBar now={percentage} />}
    </div>
  );
};

export default Loader;
