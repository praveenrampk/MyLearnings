/* global chrome */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { get, isEmpty } from "lodash";

import { frontendRoutes } from "../../utils/routes";
import { setStateAccountDetails, setStateLoading } from "../../store";

import ModalTokenDetail from "../ModalTokenDetail";

const HiddenTokens = ({ accDetails, accountsData }) => {
  const [tokenDetail, setTokenDetail] = useState({});

  const onUnhideToken = async (e, token) => {
    setStateLoading(true);
    e.preventDefault();
    e.stopPropagation();

    const accountId = get(accDetails, "accountId", "");
    const accountDetails = accountsData.find((i) => i.accountId === accountId);

    const hiddenTokens = get(accDetails, "hiddenTokens", []).filter(
      (t) => t !== get(token, "id", "")
    );

    chrome.storage.sync.set(
      {
        [accountId]: JSON.stringify({
          ...accountDetails,
          hiddenTokens,
        }),
      },
      function () {}
    );
    chrome.storage.local.set(
      {
        accountDetails: JSON.stringify({
          ...accDetails,
          hiddenTokens,
        }),
      },
      function () {}
    );
    setStateAccountDetails({
      ...accDetails,
      hiddenTokens,
    });
    setStateLoading(false);
  };

  return (
    <div className="hidden-tokens-page headerFixed px-4 scroll-content">
      <div className="d-flex flex-column h-100">
        <div className="text-center mt-4 mb-3">
          <h3 className="page-title">Hidden Tokens</h3>
        </div>
        <div className="buy-hex-content hexAssetSection flex-1 p-0 d-flex flex-column">
          <div className="assetContentItems flex-1">
            {isEmpty(get(accDetails, "hiddenTokens", [])) ? (
              <p className="text-center py-3 mb-3">No Tokens are hidden</p>
            ) : (
              get(accDetails, "tokenData", []).map((token, i) => {
                if (
                  !get(accDetails, "hiddenTokens", []).includes(
                    get(token, "id", "")
                  )
                )
                  return null;

                return (
                  <div
                    id={`${get(token, "id", "")}-${i}`}
                    key={`${get(token, "id", "")}-${i}`}
                    className="assetContentItem d-flex align-items-center"
                    onClick={() => setTokenDetail(token)}
                  >
                    <div className="d-flex">
                      <div className="assetImage borderImageLogo d-flex align-items-center justify-content-center">
                        <div className="hexSymbolPurple"></div>
                      </div>
                    </div>
                    <div className="ml-3 w-100">
                      <h3 className="mb-0 hexAssetName d-flex align-items-center justify-content-between">
                        <span>{get(token, "name", "N/A")}</span>
                        <div
                          title={"Unhide Token"}
                          className="icon iconVisibility iconXS-20 mr-0 dark-mode-img"
                          onClick={(e) => onUnhideToken(e, token)}
                        ></div>
                      </h3>
                      <p className="mt-1 mb-0 hexAssetAmount  d-flex align-items-center justify-content-between">
                        <span>{`${get(token, "balance", 0)} ${get(
                          token,
                          "symbol",
                          ""
                        )}`}</span>
                        {!isEmpty(get(token, "deletedOn", 0)) && (
                          <span
                            title={"Deleted Token"}
                            className="icon trash iconXS-20 mr-0 dark-mode-img"
                          ></span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <Link
            className="w-100"
            variant="secondary"
            to={frontendRoutes.dashboard}
          >
            <Button
              className="btn-exlarge btn-primary-outline w-100 my-4"
              variant="secondary"
            >
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <ModalTokenDetail
        tokenDetail={tokenDetail}
        network={get(accDetails, "network", "")}
        handleClose={() => setTokenDetail({})}
      />
    </div>
  );
};

export default HiddenTokens;
