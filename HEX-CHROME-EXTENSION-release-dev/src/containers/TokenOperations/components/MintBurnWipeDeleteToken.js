import React, { useEffect, useState } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isEmpty, get } from "lodash";

import { frontendRoutes } from "../../../utils/routes";
import { tokenOperationsList } from "../../../utils/constants";
import { formatAccountID, sendCancelledResponse } from "../../../utils/helpers";

import {
  tokenBurn,
  tokenDelete,
  tokenMint,
  tokenWipe,
} from "../../../service/token";

import ToggleSwitch from "../../../components/ToggleSwitch";

const buttonName = {
  [tokenOperationsList[8].id]: "Mint",
  [tokenOperationsList[9].id]: "Burn",
  [tokenOperationsList[10].id]: "Wipe",
  [tokenOperationsList[11].id]: "Delete",
};

export const MintBurnWipeDeleteToken = ({ accDetails, type, trigger }) => {
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");

  const [memo, setMemo] = useState("");
  const [seeMemo, setSeeMemo] = useState(false);

  useEffect(() => {
    const windowData = get(window, "custom_data", "");

    if (get(window, "isNewWindow", false)) {
      switch (get(windowData, "type", "")) {
        case "token-mint":
        case "token-burn":
          setToken(
            get(accDetails, "tokenData", []).find(
              (i) => i.id === get(windowData, "tokenId", "")
            )
          );
          setAmount(get(windowData, "amount", ""));
          break;
        case "token-wipe":
          setToken(
            get(accDetails, "tokenData", []).find(
              (i) => i.id === get(windowData, "tokenId", "")
            )
          );
          setAccount(get(windowData, "accountId", ""));
          setAmount(get(windowData, "amount", ""));
          break;
        case "token-delete":
          setToken(
            get(accDetails, "tokenData", []).find(
              (i) => i.id === get(windowData, "tokenId", "")
            )
          );
          break;
        default:
      }
    }
  }, [accDetails]);

  const onFormSubmit = async (event) => {
    event.preventDefault();

    switch (type) {
      case tokenOperationsList[8].id:
        await tokenMint({ tokenId: get(token, "id", ""), amount, memo });
        break;
      case tokenOperationsList[9].id:
        await tokenBurn({ tokenId: get(token, "id", ""), amount, memo });
        break;
      case tokenOperationsList[10].id:
        await tokenWipe({
          tokenId: get(token, "id", ""),
          amount,
          memo,
          account: formatAccountID(account.trim()),
        });
        break;
      case tokenOperationsList[11].id:
        await tokenDelete({ tokenId: get(token, "id", "") });
        break;
      default:
    }
  };

  return (
    <Form className="d-flex flex-column h-100" onSubmit={onFormSubmit}>
      <div className="flex-1">
        <Form.Group className="mb-4">
          <Dropdown
            className="inputDropdown"
            onSelect={(e) =>
              setToken(get(accDetails, "tokenData", []).find((i) => i.id === e))
            }
          >
            <Dropdown.Toggle className="dropdown-basic">
              {isEmpty(token)
                ? "Select a Token"
                : `${get(token, "name", "N/A")} - ${get(token, "id", "N/A")}`}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {get(accDetails, "tokenData", []).map((t) => {
                if (
                  type === tokenOperationsList[11].id &&
                  !isEmpty(get(t, "deletedOn", 0))
                )
                  return null;

                return (
                  <Dropdown.Item
                    key={get(t, "id", "")}
                    eventKey={get(t, "id", "")}
                  >
                    {`${get(t, "name", "N/A")} - ${get(t, "id", "N/A")}`}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        {type === tokenOperationsList[10].id && (
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
            <Form.Label className="bold" htmlFor="name">
              Account ID
            </Form.Label>
            <p className="form-lable-small">Eg. 243534 or 0.0.243534</p>
          </Form.Group>
        )}

        {type !== tokenOperationsList[11].id && (
          <Form.Group className="mb-4">
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value ? parseFloat(e.target.value) : "")
              }
            />
            <Form.Label className="bold" htmlFor="name">
              Amount
            </Form.Label>
          </Form.Group>
        )}

        {!isEmpty(token) && (
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              value={get(token, "supply", 0)}
              readOnly={true}
            />
            <Form.Label className="bold" htmlFor="name">
              Total Supply
            </Form.Label>
          </Form.Group>
        )}

        {seeMemo && (
          <Form.Group>
            <Form.Control
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
            <Form.Label className="bold" htmlFor="name">
              Memo
            </Form.Label>
          </Form.Group>
        )}

        <div className="d-flex justify-content-end mb-3">
          <ToggleSwitch
            label={"Add Memo"}
            value={seeMemo}
            onClick={() => setSeeMemo(!seeMemo)}
          />
        </div>
      </div>

      <div className="button-section mb-4">
        <Button
          className="btn-exlarge btn btn-primary btn-primary-outline btn-block mb-3"
          variant="primary"
          type="submit"
        >
          {buttonName[type]}
        </Button>
        {trigger ? (
          <Button
            className="btn-exlarge btn btn-primary btn-primary-outline btn-block mb-3"
            variant="secondary"
            onClick={async () => {
              await sendCancelledResponse();
              window.close();
            }}
          >
            Cancel
          </Button>
        ) : (
          <Link
            className="btn btn-link primary w-100"
            variant="secondary"
            to={frontendRoutes.dashboard}
          >
            BACK
          </Link>
        )}
      </div>
    </Form>
  );
};

export default MintBurnWipeDeleteToken;
