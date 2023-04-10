import React, { useEffect, useState } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isEmpty, get } from "lodash";

import { frontendRoutes } from "../../../utils/routes";
import { formatAccountID, sendCancelledResponse } from "../../../utils/helpers";
import { tokenOperationsList } from "../../../utils/constants";

import { tokenAssociate, tokenDissociate } from "../../../service/token";

const buttonName = {
  [tokenOperationsList[0].id]: "Add",
  [tokenOperationsList[1].id]: "Remove",
};

export const AddRemoveToken = ({ accDetails, type, trigger, tokenID }) => {
  const [tokenId, setTokenId] = useState("");
  const [token, setToken] = useState({});

  useEffect(() => {
    const windowData = get(window, "custom_data", "");
    if (get(window, "isNewWindow", false)) {
      setTokenId(get(windowData, "tokenId", ""));
      if (get(windowData, "type", "") === "token-dissociate")
        setToken(
          get(accDetails, "tokenData", []).find(
            (i) => i.id === get(windowData, "tokenId", "")
          )
        );
    }
  }, [accDetails]);

  useEffect(() => {
    setTokenId(tokenID)
  }, [tokenID])

  const onFormSubmit = async (event) => {
    event.preventDefault();

    switch (type) {
      case tokenOperationsList[0].id:
        await tokenAssociate({ tokenId: formatAccountID(tokenId.trim()) });
        break;
      case tokenOperationsList[1].id:
        await tokenDissociate({ tokenId: formatAccountID(tokenId.trim()) });
        break;
      default:
    }
  };

  return (
    <Form
      className="d-flex flex-column justify-content-between h-100"
      onSubmit={onFormSubmit}
    >
      {type === tokenOperationsList[0].id && (
        <Form.Group className="form-group mb-4">
          <Form.Control
            type="name"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
          <Form.Label className="bold" htmlFor="name">
            Token ID
          </Form.Label>
          <p className="form-lable-small">Eg. 243534 or 0.0.243534</p>
        </Form.Group>
      )}

      {type === tokenOperationsList[1].id && (
        <Form.Group className="mb-4">
          <Dropdown
            className="inputDropdown"
            onSelect={(e) => {
              setToken(
                get(accDetails, "tokenData", []).find((i) => i.id === e)
              );
              setTokenId(e);
            }}
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
      )}

      <div className="button-section mb-4">
        <Button
          block
          className="btn-exlarge btn btn-primary btn-primary-outline btn-block mb-3"
          variant="primary"
          disabled={isEmpty(tokenId.trim())}
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

export default AddRemoveToken;
