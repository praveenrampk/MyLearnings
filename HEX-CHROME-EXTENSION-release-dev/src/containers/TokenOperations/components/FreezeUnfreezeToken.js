import React, { useEffect, useState } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isEmpty, get } from "lodash";

import { formatAccountID, sendCancelledResponse } from "../../../utils/helpers";
import { frontendRoutes } from "../../../utils/routes";
import { tokenOperationsList } from "../../../utils/constants";

import { tokenFreeze, tokenUnfreeze } from "../../../service/token";

import ToggleSwitch from "../../../components/ToggleSwitch";

const buttonName = {
  [tokenOperationsList[6].id]: "Freeze",
  [tokenOperationsList[7].id]: "Unfreeze",
};

export const FreezeUnfreezeToken = ({ accDetails, type, trigger }) => {
  const [token, setToken] = useState("");
  const [account, setAccount] = useState("");

  const [memo, setMemo] = useState("");
  const [seeMemo, setSeeMemo] = useState(false);

  useEffect(() => {
    const windowData = get(window, "custom_data", "");

    if (
      get(window, "isNewWindow", false) &&
      (get(windowData, "type", "") === "token-freeze" ||
        get(windowData, "type", "") === "token-unfreeze")
    ) {
      setToken(
        get(accDetails, "tokenData", []).find(
          (i) => i.id === get(windowData, "tokenId", "")
        )
      );
      setAccount(get(windowData, "accountId", ""));
    }
  }, [accDetails]);

  const onFormSubmit = async (event) => {
    event.preventDefault();

    switch (type) {
      case tokenOperationsList[6].id:
        await tokenFreeze({
          tokenId: formatAccountID(get(token, "id", "")),
          account: formatAccountID(account.trim()),
          memo,
        });
        break;
      case tokenOperationsList[7].id:
        await tokenUnfreeze({
          tokenId: formatAccountID(get(token, "id", "")),
          account: formatAccountID(account.trim()),
          memo,
        });
        break;
      default:
    }
  };

  return (
    <Form className="d-flex flex-column h-100" onSubmit={onFormSubmit}>
      <div className="flex-1">
        <Form.Group className="mb-2">
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
              {get(accDetails, "tokenData", []).map((t) => (
                <Dropdown.Item
                  key={get(t, "id", "")}
                  eventKey={get(t, "id", "")}
                >
                  {`${get(t, "name", "N/A")} - ${get(t, "id", "N/A")}`}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

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
            Back
          </Link>
        )}
      </div>
    </Form>
  );
};

export default FreezeUnfreezeToken;
