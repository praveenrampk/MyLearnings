import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { capitalize } from "lodash";

import { frontendRoutes } from "../../utils/routes";
import { setStateAlertData } from "../../store";
import { copy } from "../../utils/helpers";

import "./index.scss";

const icons = {
  success: "successIcon",
  error: "errorIcon",
  pending: "infoIcon",
};

export const FullPageAlert = ({
  history,
  fullHeight,
  title,
  type,
  message,
  page,
  accountId,
  privateKey,
  mnemonic,
  walletType,
  trigger,
  isTransaction,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const onBack = () => {
    if (trigger) {
      window.close();
    } else {
      setStateAlertData({});
      history.push(frontendRoutes.dashboard);
    }
  };

  const onCopy = () => {
    setShowTooltip(true);
    const text = `Account ID: ${accountId}\nPrivate Key: ${privateKey}\nMnemonic: ${mnemonic}`;
    copy(text);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  return (
    <div
      className={`alertFullpage d-flex flex-column align-items-center justify-content-center ${
        fullHeight && "fixedHeight"
      }`}
    >
      <div className="flex-1 d-flex flex-column align-items-center justify-content-center w-100 px-4">
        <div className="d-flex flex-column justify-content-between align-items-center h-100 w-100">
          {(page !== "createdWallet" ||
            (page === "createdWallet" && type === "error")) && (
            <>
              <div className="text-center mt-4">
                <p className="page-title">{title}</p>
              </div>
              <div className="flex-1 d-flex align-items-center justify-content-center">
                <div>
                  <div className="mb-2 text-center">
                    <i className={`icon mr-0 iconL-60 ${icons[type]}`}></i>
                  </div>
                  <p className="alertText">{capitalize(type)}</p>
                  {!isTransaction && (
                    <p
                      className="alertSubText"
                      dangerouslySetInnerHTML={{ __html: message }}
                    ></p>
                  )}
                </div>
              </div>
              {isTransaction && (
                <div className="transactionListContainer scroll-content">
                  <Table className="transactionList">
                    <thead>
                      <tr>
                        <th>Crypto</th>
                        <th>Receiver</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {message.map((list, index) => (
                        <tr key={`transaction-${index}`}>
                          <th>{list.tokenId ?? "Hbar"}</th>
                          <td>{list.transferTo}</td>
                          <td colSpan="2">{list.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
              <div className="mb-4 w-100">
                <Button
                  className="btn-exlarge btn btn-primary btn-primary-outline btn-block mb-3"
                  variant="primary"
                  onClick={onBack}
                >
                  {trigger ? "CLOSE" : "BACK"}
                </Button>
              </div>
            </>
          )}

          {page === "createdWallet" && type !== "error" && (
            <>
              <div className="mt-4">
                <i className={`icon mr-0 successIcon iconL-60`}></i>
              </div>
              <div className="mt-3">
                <p className="page-title">Created Wallet !</p>
              </div>
              <Form className="flex-1 w-100 mt-3">
                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    defaultValue={accountId}
                    readOnly={true}
                  />
                  <Form.Label htmlFor="name">Account ID</Form.Label>
                </Form.Group>

                {walletType !== "hardware" && (
                  <>
                    <Form.Group className="mb-4">
                      <Form.Control
                        type="text"
                        defaultValue={privateKey}
                        readOnly={true}
                      />
                      <Form.Label htmlFor="name">Private Key</Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        defaultValue={mnemonic}
                        readOnly={true}
                      />
                      <Form.Label htmlFor="name">Mnemonic</Form.Label>
                    </Form.Group>
                  </>
                )}
              </Form>

              <p className="p-2 text-center">
                Kindly store the above credentials in a safe space.
                <u
                  className={`ml-2 txt-dark-link cursor-pointer toolTip ${
                    showTooltip && "showText"
                  }`}
                  onClick={onCopy}
                >
                  (Click here to copy)
                  <span className="text">Copied!</span>
                </u>
              </p>

              <div className="button-section w-100 d-flex align-items-center justify-content-end p-2">
                <Button
                  className="btn-exlarge btn-primary-outline w-100 my-4"
                  variant="primary"
                  onClick={onBack}
                >
                  Go to Dashboard
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullPageAlert;
