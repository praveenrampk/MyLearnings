import React, { useEffect, useState } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isEmpty, get, isArray, some, find, isEqual } from "lodash";

import { tradingFee, tokenTypes } from "../../../utils/constants";
import { tokenTransfer } from "../../../service/token";
import { formatAccountID, sendCancelledResponse } from "../../../utils/helpers";
import { frontendRoutes } from "../../../utils/routes";

import ModalFeeDetail from "../../ModalFeeDetail";
import ToggleSwitch from "../../../components/ToggleSwitch";

export const SendToken = ({ accDetails, trigger }) => {
  const [token, setToken] = useState([]);
  const [feeDetails, setFeeDetails] = useState([]);
  const [memo, setMemo] = useState("");
  const [seeMemo, setSeeMemo] = useState(false);
  const [multipleTokenTransfers, setMultipleTokenTransfers] = useState([
    { tokenId: "", transferTo: "", amount: "", serialNo: "" },
  ]);

  useEffect(() => {
    const windowData = get(window, "custom_data", "");
    if (
      get(window, "isNewWindow", false) &&
      get(windowData, "type", "") === "token-send"
    ) {
      if (get(windowData, "trigger", false)) {
        isArray(get(windowData, "transfers", {}))
          ? setMultipleTokenTransfers(
            get(windowData, "transfers", []).map((data) => ({
              ...data,
              transferTo: formatAccountID(get(data, "transferTo", "")),
              tokenId: formatAccountID(get(data, "tokenId", "")),
              amount: data.tokenType.type === tokenTypes[2].type ? 1 : data.amount,
            }))
          )
          : setMultipleTokenTransfers([
            {
              ...get(windowData, "transfers", {}),
              transferTo: formatAccountID(
                get(windowData, "transfers.transferTo", "")
              ),
              tokenId: formatAccountID(
                get(windowData, "transfers.tokenId", "")
              ),
            },
          ]);
      }
    }
  }, [accDetails]);

  useEffect(() => {
    let mountedComp = true;
    const tempData = [];
    multipleTokenTransfers.forEach((tokenTransfer, index) => {
      if (mountedComp) {
        const tokenAvailabe = get(accDetails, "tokenData", []).find((i) => {
          return i.id === get(tokenTransfer, "tokenId", "");
        });
        !isEmpty(tokenAvailabe)
          ? tempData.push(tokenAvailabe)
          : tempData.push("");
      }
    });
    setToken(tempData);

    return () => {
      mountedComp = false;
    };
  }, [accDetails, multipleTokenTransfers]);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    setFeeDetails([
      {
        label: "Payer",
        value: get(accDetails, "accountId", ""),
      },
      {
        label: "Token-Transfers",
        value: multipleTokenTransfers.map((data) => ({
          ...data,
          transferTo: formatAccountID(get(data, "transferTo", "")),
          tokenId: formatAccountID(get(data, "tokenId", "")),
          amount: data.tokenType.type === tokenTypes[2].type ? 1 : data.amount,
        })),
      },
      {
        label: "Trading Fee",
        value: `${(tradingFee / 100000).toString()} ${
          get(accDetails, "walletType", "") === "hardware" ? "Hbar" : "HEX"
          }`,
      },
    ]);
  };

  const onConfirm = async () => {
    await tokenTransfer({
      transfers: multipleTokenTransfers.map((data) => ({
        ...data,
        transferTo: formatAccountID(get(data, "transferTo", "")),
        tokenId: formatAccountID(get(data, "tokenId", "")),
        amount: data.tokenType.type === tokenTypes[2].type ? 1 : data.amount,
      })),
      memo,
    });
  };

  return (
    <>
      <Form className="d-flex flex-column h-100" onSubmit={onFormSubmit}>
        {multipleTokenTransfers.map((eachTransaction, index) => (
          <div key={`token-transfer-${index}`} className="transactionsSet">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={eachTransaction.transferTo}
                onChange={(e) => {
                  let tempData = [...multipleTokenTransfers];
                  tempData[index].transferTo = e.target.value;
                  setMultipleTokenTransfers(tempData);
                }}
              />
              <Form.Label className="bold" htmlFor="name">
                Transfer To
              </Form.Label>
              <p className="form-lable-small">Eg. 243534 or 0.0.243534</p>
            </Form.Group>

            <Form.Group className="mb-4">
              <Dropdown
                className="inputDropdown"
                onSelect={(e) => {
                  let tokenType = tokenTypes.find((i) => i.id === e)
                  let tempTransactions = [...multipleTokenTransfers];
                  tempTransactions[index] = {
                    ...tempTransactions[index],
                    tokenType: tokenType,
                  };
                  setMultipleTokenTransfers(tempTransactions);
                }}
              >
                <Dropdown.Toggle id="sample-dropdown" className="dropdown-basic">
                  {get(
                    multipleTokenTransfers[index].tokenType,
                    "label",
                    "Select A Token Type"
                  )}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {tokenTypes.map((t) => (
                    <Dropdown.Item
                      key={get(t, "id", "")}
                      eventKey={get(t, "id", "")}
                    >
                      {get(t, "label", "")}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            {multipleTokenTransfers[index].tokenType && <Form.Group className="mb-4">
              <Dropdown
                className="inputDropdown"
                onSelect={(e) => {
                  let tempData = [...token];
                  let tempTransactions = [...multipleTokenTransfers];
                  tempData[index] = get(accDetails, "tokenData", []).find(
                    (i) => i.id === e
                    );
                  tempTransactions[index] = {
                    ...tempTransactions[index],
                    tokenId: e,
                  };
                  setMultipleTokenTransfers(tempTransactions);
                  setToken(tempData);
                }}
              >
                <Dropdown.Toggle className="dropdown-basic">
                  {isEmpty(token[index])
                    ? "Select a Token"
                    : `${get(token[index], "name", "N/A")} - ${get(
                      token[index],
                      "id",
                      "N/A"
                      )}`}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {get(accDetails, "tokenData", [])
                    .filter(t => t.type === multipleTokenTransfers[index].tokenType.type)
                    .map((t) => (
                      <Dropdown.Item
                        key={get(t, "id", "")}
                        eventKey={get(t, "id", "")}
                      >
                        {`${get(t, "name", "N/A")} - ${get(t, "id", "N/A")}`}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>}

            {!isEmpty(token[index]) && <>
              {(multipleTokenTransfers[index].tokenType.type === tokenTypes[2].type &&
                token[index].maxSupply > 0) &&
                <Form.Group className="mb-3">
                  <Form.Control
                    type="number"
                    value={eachTransaction.serialNo}
                    onChange={(e) => {
                      let tempData = [...multipleTokenTransfers];
                      tempData[index].serialNo = e.target.value;
                      setMultipleTokenTransfers(tempData);
                    }}
                  />
                  <Form.Label className="bold" htmlFor="name">
                    Serial Number
                  </Form.Label>
                  <p className="form-lable-small">
                    {`Serial Number must be less than ${token[index].maxSupply}`}
                  </p>
                </Form.Group>}
              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  value={get(token[index], "balance", 0)}
                  readOnly={true}
                />
                <Form.Label className="bold" htmlFor="name">
                  Token Balance
                </Form.Label>
              </Form.Group>
            </>}

            {(multipleTokenTransfers[index].tokenType &&
              multipleTokenTransfers[index].tokenType.type !== tokenTypes[2].type) &&
              <Form.Group className="mb-4">
                <Form.Control
                  type="number"
                  value={get(eachTransaction, "amount", 0)}
                  onChange={(e) => {
                    let tempData = [...multipleTokenTransfers];
                    tempData[index].amount = e.target.value
                      ? parseFloat(e.target.value)
                      : "";
                    setMultipleTokenTransfers(tempData);
                  }}
                />
                <Form.Label className="bold" htmlFor="name">
                  Amount
                </Form.Label>
              </Form.Group>
            }
            {multipleTokenTransfers.length > 1 && (
              <Button
                className="deleteButton mr-0"
                onClick={() => {
                  setMultipleTokenTransfers(
                    multipleTokenTransfers.filter(
                      (t, subIndex) => subIndex !== index
                    )
                  );
                }}
              >
                Delete
              </Button>
            )}
          </div>
        ))}
        <div className="d-flex justify-content-end mb-2 mt-4">
          <Button
            className="btn-addTransaction btn-block"
            onClick={() => {
              setMultipleTokenTransfers([
                ...multipleTokenTransfers,
                { tokenId: "", amount: "", transferTo: "", serialNo: "" },
              ]);
            }}
          >
            Add Transaction
          </Button>
        </div>
        <div className="flex-1 mt-2">
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
            disabled={some(
              multipleTokenTransfers,
              (member) =>
                isEmpty(member.transferTo) ||
                (member.tokenType && member.tokenType.type === tokenTypes[2].type ?
                  isEqual(Number(member.serialNo), 0) :
                  member.amount <= parseFloat(0)) ||
                isEmpty(find(token, { id: member.tokenId }))
            )}
          >
            Send
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

      <ModalFeeDetail
        details={feeDetails}
        handleClose={() => setFeeDetails([])}
        onConfirm={onConfirm}
      />
    </>
  );
};

export default SendToken;
