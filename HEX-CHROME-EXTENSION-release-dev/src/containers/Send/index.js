import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Dropdown, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isEmpty, get, isArray, some, find, isEqual } from "lodash";

import { tokenTypes, tradingFee } from "../../utils/constants";
import { transferBatch } from "../../service/transfer";
import { formatAccountID, sendCancelledResponse } from "../../utils/helpers";
import { frontendRoutes } from "../../utils/routes";

import ModalFeeDetail from "../ModalFeeDetail";
import ToggleSwitch from "../../components/ToggleSwitch";
import InfoAlert from "../../components/InfoAlert";

export const SendBatch = ({ accDetails }) => {
  const [isTriggered, setIsTriggered] = useState(false);
  const [feeDetails, setFeeDetails] = useState([]);
  const [memo, setMemo] = useState("");
  const [seeMemo, setSeeMemo] = useState(false);
  const [hbarTransactions, setHbarTransactions] = useState([]);
  const [token, setToken] = useState([]);
  const [tokenTransactions, setTokenTransactions] = useState([]);

  useEffect(() => {
    const windowData = get(window, "custom_data", "");
    setIsTriggered(get(windowData, "trigger", false));

    if (
      get(window, "isNewWindow", false) &&
      get(windowData, "type", "") === "send-batch"
    ) {
      isArray(get(windowData, "hbars", {}))
        ? setHbarTransactions(get(windowData, "hbars", []))
        : setHbarTransactions([get(windowData, "hbars", {})]);

      isArray(get(windowData, "tokens", {}))
        ? setTokenTransactions(get(windowData, "tokens", []))
        : setTokenTransactions([get(windowData, "tokens", {})]);
    }
  }, []);

  useEffect(() => {
    let mountedComp = true;
    const tempData = [];
    tokenTransactions.forEach((tokenTransfer, index) => {
      if (mountedComp) {
        const tokenAvailabe = get(accDetails, "tokenData", []).find((i) => {
          return i.id === formatAccountID(get(tokenTransfer, "tokenId", ""));
        });
        !isEmpty(tokenAvailabe) && tempData.push(tokenAvailabe);
      }
    });
    setToken(tempData);

    return () => {
      mountedComp = false;
    };
  }, [accDetails, tokenTransactions]);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    setFeeDetails([
      {
        label: "Payer",
        value: get(accDetails, "accountId", ""),
      },
      {
        label: "Transactions",
        value: hbarTransactions.map((data) => ({
          ...data,
          transferTo: formatAccountID(get(data, "transferTo", "")),
        })),
      },
      {
        label: "Token-Transfers",
        value: tokenTransactions.map((data) => ({
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
    transferBatch({
      hbars: hbarTransactions.map((data) => ({
        ...data,
        transferTo: formatAccountID(get(data, "transferTo", "")),
      })),
      tokens: tokenTransactions.map((data) => ({
        ...data,
        transferTo: formatAccountID(get(data, "transferTo", "")),
        tokenId: formatAccountID(get(data, "tokenId", "")),
        amount: data.tokenType.type === tokenTypes[2].type ? 1 : data.amount,
      })),
      memo,
    });
  };

  return (
    <div className="send-hbar-page scroll-content headerFixed px-4">
      <div className="d-flex flex-column h-100">
        <div className="text-center my-5">
          <h3 className="page-title">Send</h3>
        </div>
        <div className="send-hbar-token-content">
          <InfoAlert message="Only one Hbar transaction can be done using Hardware Wallet" />
          <div className="accordion-container">
            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  variant="link"
                  eventKey="0"
                  className="d-flex align-items-center justify-content-between"
                >
                  <div>Hbars</div>
                  <div>{hbarTransactions.length}</div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <div className="flex-1">
                      {hbarTransactions.map((transaction, index) => (
                        <div
                          key={`transaction-${index}`}
                          className="transactionsSet"
                        >
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              value={transaction.transferTo}
                              onChange={(e) => {
                                let tempData = [...hbarTransactions];
                                tempData[index].transferTo = e.target.value;
                                setHbarTransactions(tempData);
                              }}
                            />
                            <Form.Label className="bold" htmlFor="name">
                              Transfer To
                            </Form.Label>
                            <p className="form-lable-small">
                              Eg. 243534 or 0.0.243534
                            </p>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              value={transaction.amount}
                              onChange={(e) => {
                                let tempData = [...hbarTransactions];
                                tempData[index].amount = e.target.value;
                                setHbarTransactions(tempData);
                              }}
                            />
                            <Form.Label className="bold" htmlFor="name">
                              Amount
                            </Form.Label>
                          </Form.Group>
                          {hbarTransactions.length > 0 && (
                            <Button
                              className="deleteButton mr-0"
                              onClick={() => {
                                setHbarTransactions(
                                  hbarTransactions.filter(
                                    (transaction, subIndex) =>
                                      subIndex !== index
                                  )
                                );
                              }}
                            >
                              Delete
                            </Button>
                          )}
                        </div>
                      ))}
                      <Form.Group className="mb-4 mt-4">
                        <Form.Control
                          type="text"
                          value={get(accDetails, "balance", 0)}
                          readOnly={true}
                        />
                        <Form.Label className="bold" htmlFor="name">
                          HBAR Balance
                        </Form.Label>
                      </Form.Group>

                      <div className="d-flex justify-content-end mb-2 mt-4">
                        <Button
                          className="btn-addTransaction btn-block"
                          onClick={() => {
                            setHbarTransactions([
                              ...hbarTransactions,
                              { amount: "", transferTo: "" },
                            ]);
                          }}
                        >
                          Add Hbar Transaction
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <Accordion defaultActiveKey="1">
              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  variant="link"
                  eventKey="1"
                  className="d-flex align-items-center justify-content-between"
                >
                  <div>Tokens</div>
                  <div>{tokenTransactions.length}</div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <div className="flex-1">
                      {tokenTransactions.map((eachTransaction, index) => (
                        <div
                          key={`token-transfer-${index}`}
                          className="transactionsSet"
                        >
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              value={eachTransaction.transferTo}
                              onChange={(e) => {
                                let tempData = [...tokenTransactions];
                                tempData[index] = {
                                  ...tempData[index],
                                  transferTo: e.target.value,
                                };
                                setTokenTransactions(tempData);
                              }}
                            />
                            <Form.Label className="bold" htmlFor="name">
                              Transfer To
                            </Form.Label>
                            <p className="form-lable-small">
                              Eg. 243534 or 0.0.243534
                            </p>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Dropdown
                              className="networkDropdown inputDropdown"
                              onSelect={(e) => {
                                let tokenType = tokenTypes.find((i) => i.id === e)
                                let tempTransactions = [...tokenTransactions];
                                tempTransactions[index] = {
                                  ...tempTransactions[index],
                                  tokenType: tokenType,
                                };
                                setTokenTransactions(tempTransactions);
                              }}
                            >
                              <Dropdown.Toggle id="sample-dropdown" className="dropdown-basic">
                                {get(
                                  tokenTransactions[index].tokenType,
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

                          {tokenTransactions[index].tokenType && <Form.Group className="mb-4">
                            <Dropdown
                              className="inputDropdown"
                              onSelect={(e) => {
                                let tempData = [...token];
                                let tempTransactions = [...tokenTransactions];
                                tempData[index] = get(
                                  accDetails,
                                  "tokenData",
                                  []
                                ).find((i) => i.id === e);
                                tempTransactions[index] = {
                                  ...tempTransactions[index],
                                  tokenId: e,
                                };
                                setTokenTransactions(tempTransactions);
                                setToken(tempData);
                              }}
                            >
                              <Dropdown.Toggle className="dropdown-basic">
                                {isEmpty(token[index])
                                  ? "Select a Token"
                                  : `${get(
                                    token[index],
                                    "name",
                                    "N/A"
                                  )} - ${get(token[index], "id", "N/A")}`}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                {get(accDetails, "tokenData", [])
                                  .filter(t => t.type === tokenTransactions[index].tokenType.type)
                                  .map((t) => (
                                    <Dropdown.Item
                                      key={get(t, "id", "")}
                                      eventKey={get(t, "id", "")}
                                    >
                                      {`${get(t, "name", "N/A")} - ${get(
                                        t,
                                        "id",
                                        "N/A"
                                      )}`}
                                    </Dropdown.Item>
                                  ))}
                              </Dropdown.Menu>
                            </Dropdown>
                          </Form.Group>}

                          {!isEmpty(token[index]) && <>
                            {(tokenTransactions[index].tokenType.type === tokenTypes[2].type &&
                              token[index].maxSupply > 0) &&
                              <Form.Group className="mb-3">
                                <Form.Control
                                  type="number"
                                  value={eachTransaction.serialNo}
                                  onChange={(e) => {
                                    let tempData = [...tokenTransactions];
                                    tempData[index].serialNo = e.target.value;
                                    setTokenTransactions(tempData);
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

                          {(tokenTransactions[index].tokenType &&
                            tokenTransactions[index].tokenType.type !== tokenTypes[2].type) &&
                            <Form.Group className="mb-4">
                              <Form.Control
                                type="number"
                                value={get(eachTransaction, "amount", 0)}
                                onChange={(e) => {
                                  let tempData = [...tokenTransactions];
                                  tempData[index].amount = e.target.value
                                    ? parseFloat(e.target.value)
                                    : "";
                                  setTokenTransactions(tempData);
                                }}
                              />
                              <Form.Label className="bold" htmlFor="name">
                                Amount
                              </Form.Label>
                            </Form.Group>
                          }
                          {tokenTransactions.length > 0 && (
                            <Button
                              className="deleteButton mr-0"
                              onClick={() => {
                                setTokenTransactions(
                                  tokenTransactions.filter(
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
                      <div className="d-flex justify-content-end my-3">
                        <Button
                          className="btn-addTransaction btn-block"
                          onClick={() => {
                            setTokenTransactions([
                              ...tokenTransactions,
                              { amount: "", transferTo: "", tokenId: "", serialNo: "" },
                            ]);
                          }}
                        >
                          Add Token Transaction
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
          {seeMemo && (
            <Form.Group className="my-4">
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
          <div className="d-flex justify-content-end my-3">
            <ToggleSwitch
              label={"Add Memo"}
              value={seeMemo}
              onClick={() => setSeeMemo(!seeMemo)}
            />
          </div>
        </div>
        <Form
          className="d-flex flex-column justify-content-end"
          onSubmit={onFormSubmit}
        >
          <div className="button-section">
            <Button
              className="btn-exlarge btn btn-primary btn-primary-outline btn-block mb-3"
              variant="primary"
              disabled={
                (hbarTransactions.length === 0 &&
                  tokenTransactions.length === 0) ||
                some(
                  hbarTransactions,
                  (member) =>
                    isEmpty(member.transferTo) || member.amount <= parseFloat(0)
                ) ||
                some(
                  tokenTransactions,
                  (member) =>
                    isEmpty(member.transferTo) ||
                    (member.tokenType && member.tokenType.type === tokenTypes[2].type ?
                      isEqual(Number(member.serialNo), 0) :
                      member.amount <= parseFloat(0)) ||
                    isEmpty(
                      find(token, { id: formatAccountID(member.tokenId) })
                    )
                )
              }
              type="submit"
            >
              Send
            </Button>
            {isTriggered ? (
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
      </div>

      <ModalFeeDetail
        details={feeDetails}
        handleClose={() => setFeeDetails([])}
        onConfirm={onConfirm}
      />
    </div>
  );
};

export default SendBatch;
