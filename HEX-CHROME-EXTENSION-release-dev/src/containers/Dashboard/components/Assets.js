/* global chrome */
import React, { useState } from "react";
import {Tooltip, OverlayTrigger} from "react-bootstrap";
import { get, isEmpty } from "lodash";
import { setStateAccountDetails, setStateLoading } from "../../../store";
import { getWrappedSymbol } from "../../../utils/helpers";
import { tokenTypes } from "../../../utils/constants";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {frontendRoutes } from "../../../utils/routes";

const Assets = ({ accDetails, setTokenDetail, accountsData }) => {
  const [tokenType, setTokenType] = useState(tokenTypes[0]);

  const history = useHistory();

  const renderTooltip = props => (
    <Tooltip {...props}> USDC coin has not been associated to your account. Associate to see balance.</Tooltip>
  );

  const isAssociated = (e, token) => {
    e.preventDefault();
    e.stopPropagation();

    const tokenId = get(token,"id","")

    history.push({
      pathname: frontendRoutes.token,
      state: { token: tokenId, operation: 'associate' }
  });
  }

  const onHideToken = async (e, token) => {
    setStateLoading(true);
    e.preventDefault();
    e.stopPropagation();

    const accountId = get(accDetails, "accountId", "");
    const accountDetails = accountsData.find((i) => i.accountId === accountId);

    const hiddenTokens = [
      ...get(accDetails, "hiddenTokens", []),
      get(token, "id", ""),
    ];
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
    <div className="assetContentItems">
      <div className="assetFilter">
        <div className="assetFilterItem d-flex align-items-center justify-content-between w-100 mt-3 mb-2">
          <h3 className="filter-title">Tokens List</h3>
          <Dropdown
            className="filterDropdown"
            onSelect={(e) => setTokenType(tokenTypes.find((i) => i.id === e))}
          >
            <Dropdown.Toggle id="sample-dropdown" className="dropdown-basic">
              {get(tokenType, "label", "")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {tokenTypes.map((f) => (
                <Dropdown.Item
                  key={get(f, "id", "")}
                  eventKey={get(f, "id", "")}
                >
                  {get(f, "label", "")}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {isEmpty(
        get(accDetails, "tokenData", []).filter(
          (t) => !get(accDetails, "hiddenTokens", []).includes(get(t, "id", ""))
        )
      ) ? (
        <p className="text-center py-3 mb-3">No Assets Found</p>
      ) : (
        get(accDetails, "tokenData", [])
          .filter(token => token.type === tokenType.type)
          .map((token, i) => {
            if (
              get(accDetails, "hiddenTokens", []).includes(get(token, "id", ""))
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
                    {get(token, "flag", false) ?
                    <OverlayTrigger placement="left" overlay={renderTooltip}>
                      <div
                        className="icon icon-plus iconXS-20 mr-6 dark-mode-img"
                        onClick={(e) => isAssociated(e, token)}>
                      </div>
                    </OverlayTrigger>
                    : 
                    <div
                      title={"Hide Token"}
                      className="icon iconVisibilityOff iconXS-20 mr-6 dark-mode-img"
                      onClick={(e) => onHideToken(e, token)}
                    ></div>
                    }
                  </h3>
                  <p className="mt-1 mb-0 hexAssetAmount  d-flex align-items-center justify-content-between">
                    <span>{`${get(token, "balance", 0)} 
                  ${get(token, "symbol", "").includes("IPFS") ?
                        getWrappedSymbol(get(token, "symbol", "").replace("IPFS://", "")) :
                        get(token, "symbol", "")}`}
                    </span>
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
  );
};

export default Assets;
