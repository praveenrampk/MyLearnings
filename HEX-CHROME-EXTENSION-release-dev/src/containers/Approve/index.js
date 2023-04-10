import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { get } from "lodash";

import { setStateAccountDetails } from "../../store";
import {
  sendCancelledResponse,
  sendResponseToBrowser,
} from "../../utils/helpers";
import {
  updateHostDetails,
  updateHostDetailsInSync,
} from "../../service/accounts/info";

const ApproveHEX = ({ accDetails, accountsData }) => {
  const [host, setHost] = useState("");

  useEffect(() => {
    const windowData = get(window, "custom_data", "");

    if (
      get(window, "isNewWindow", false) &&
      get(windowData, "type", "") === "enable-hex"
    ) {
      setHost(get(windowData, "domain", ""));
    }
  }, [accDetails, accountsData]);

  const onClickApprove = async () => {
    const windowData = get(window, "custom_data", "");
    const accountId = get(accDetails, "accountId", "");
    const network = get(accDetails, "network", "");
    const accountDetails = accountsData.find((i) => i.accountId === accountId);
    const approvedHosts = [
      ...get(accDetails, "approvedHosts", []),
      get(windowData, "domain", ""),
    ];

    await updateHostDetails(accDetails, approvedHosts);
    await updateHostDetailsInSync(accountDetails, approvedHosts);
    setStateAccountDetails({
      ...accDetails,
      approvedHosts,
    });
    if (get(windowData, "trigger", false)) {
      await sendResponseToBrowser(true, {
        message: "HEX Connected to the Site",
        type: "onAccount",
        accountId,
        network,
      });
      window.close();
    }
  };

  const onClickCancel = async () => {
    await sendCancelledResponse();
    window.close();
  };

  return (
    <div className="approve-host-page headerFixed px-4 scroll-content">
      <div className="d-flex flex-column h-100">
        <div className="text-center mt-4 mb-3">
          <div className="approve pageTitle">Connect Request</div>
        </div>
        <div className="buy-hex-content hexAssetSection flex-1 p-0 d-flex flex-column">
          <div className="connection-section mt-3">
            <div className="connection-website">
              <img
                src={`https://www.google.com/s2/favicons?sz=32&domain_url=${host}`}
                alt="host"
              />
            </div>
            <div className="connection-dividers">
              <div className="connection-status"></div>
            </div>
            <div className="connection-headera">
              <div className="icon iconL hexPurple mr-0" />
            </div>
          </div>
          <div className="m-auto text-center">
            <div className="modalSiteDetails">
              <div className="siteHeader">
                <div className="siteTitle mb-2">
                  <span>{host.replace(".com", "")}</span> would like to connect
                  to HEX !
                </div>
                <div className="siteSubTitle mb-2">
                  This site is requesting access to view your current account
                  id. Always make sure you trust the sites you interact with.
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button
              className="btn-exlarge btn btn-primary btn-primary-outline btn-block mb-3"
              variant="primary"
              onClick={onClickApprove}
            >
              Approve
            </Button>
            <Button
              className="btn-exlarge btn btn-primary btn-primary-outline btn-block mb-3"
              variant="primary"
              onClick={onClickCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveHEX;
