import React, { useState, useEffect, useCallback } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { isEmpty, get} from "lodash";

import { frontendRoutes } from "../../utils/routes";
import { tokenOperationsList } from "../../utils/constants";

import AddRemoveToken from "./components/AddRemoveToken";
import CreateToken from "./components/CreateToken";
import SendToken from "./components/SendToken";
import GrantRevokeKYC from "./components/GrantRevokeKYC";
import FreezeUnfreezeToken from "./components/FreezeUnfreezeToken";
import MintBurnWipeDeleteToken from "./components/MintBurnWipeDeleteToken";

export const TokenOperations = ({
  accDetails,
  setProgressPercent,
  trigger,
}) => {
  const location = useLocation();
  const [tokenDetails, setTokenDetails] = useState({})
  const [selectedOperation, setSelectedOperation] = useState({});

  useEffect(() => {
    const windowData = get(window, "custom_data", "");
    if (get(window, "isNewWindow", false)) {
      const windowType = [
        "token-associate",
        "token-dissociate",
        "token-create",
        "token-send",
        "token-grantkyc",
        "token-revokekyc",
        "token-freeze",
        "token-unfreeze",
        "token-mint",
        "token-burn",
        "token-wipe",
        "token-delete",
      ];
      setSelectedOperation(
        tokenOperationsList[
          windowType.findIndex((type) => type === get(windowData, "type", ""))
        ]
      );
    }
  }, []);

  const getComponentByOperation = useCallback(() => {
    switch (get(selectedOperation, "id", "")) {
      case get(tokenOperationsList[0], "id", ""):
      case get(tokenOperationsList[1], "id", ""):
        return (
          <AddRemoveToken
            accDetails={accDetails}
            trigger={trigger}
            type={get(selectedOperation, "id", "")}
            tokenID={get(tokenDetails, "tokenId", "")}
          />
        );
      case get(tokenOperationsList[2], "id", ""):
        return (
          <CreateToken
            accDetails={accDetails}
            trigger={trigger}
            setProgressPercent={setProgressPercent}
          />
        );
      case get(tokenOperationsList[3], "id", ""):
        return <SendToken accDetails={accDetails} trigger={trigger} />;
      case get(tokenOperationsList[4], "id", ""):
      case get(tokenOperationsList[5], "id", ""):
        return (
          <GrantRevokeKYC
            accDetails={accDetails}
            trigger={trigger}
            type={get(selectedOperation, "id", "")}
          />
        );
      case get(tokenOperationsList[6], "id", ""):
      case get(tokenOperationsList[7], "id", ""):
        return (
          <FreezeUnfreezeToken
            accDetails={accDetails}
            trigger={trigger}
            type={get(selectedOperation, "id", "")}
          />
        );
      case get(tokenOperationsList[8], "id", ""):
      case get(tokenOperationsList[9], "id", ""):
      case get(tokenOperationsList[10], "id", ""):
      case get(tokenOperationsList[11], "id", ""):
        return (
          <MintBurnWipeDeleteToken
            trigger={trigger}
            accDetails={accDetails}
            type={get(selectedOperation, "id", "")}
          />
        );
      default:
    }
  }, [accDetails, selectedOperation, setProgressPercent, tokenDetails, trigger]);

  useEffect(() => {
    const defaultOption = get(location, "state", {});
    if(Object.keys(defaultOption).length > 0) {
      setTokenDetails({
        tokenId: defaultOption.token,
        tokenOperation: defaultOption.operation
      })
  
      setSelectedOperation(tokenOperationsList[0])
      getComponentByOperation();
    }
 }, [location, getComponentByOperation]);

  return (
    <div className="token-page headerFixed d-flex flex-column scroll-content">
      <div className="px-4 d-flex flex-column h-100">
        <div className="text-center my-5">
          <h3 className="page-title">Token Operations</h3>
        </div>
        <div className="token-content flex-1">
          <div
            className={`d-flex flex-column h-100 ${
              isEmpty(selectedOperation) &&
              "justify-content-between d-flex flex-column"
            }`}
          >
            <Dropdown
              className="inputDropdown mb-4"
              onSelect={(e) =>
                setSelectedOperation(
                  tokenOperationsList.find((i) => i.id === e)
                )
              }
            >
              <Dropdown.Toggle className="dropdown-basic">
                {isEmpty(selectedOperation)
                  ? "Select an operation"
                  : get(selectedOperation, "label", "N/A")}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {tokenOperationsList.map((o) => (
                  <Dropdown.Item
                    key={get(o, "id", "")}
                    eventKey={get(o, "id", "")}
                  >
                    {get(o, "label", "N/A")}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            {getComponentByOperation()}

            {isEmpty(selectedOperation) && (
              <Link to={frontendRoutes.dashboard}>
                <Button
                  className="btn-exlarge btn btn-primary btn-primary-outline btn-block mb-3"
                  variant="primary"
                >
                  Back
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenOperations;
