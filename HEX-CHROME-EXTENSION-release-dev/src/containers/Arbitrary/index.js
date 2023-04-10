import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { get, isEmpty } from "lodash";

import {
  binaryArrayToJson,
  sendCancelledResponse,
  sendResponseToBrowser,
} from "../../utils/helpers";

import {
  createTransactionFromByte,
  signTransaction,
} from "../../service/signMessage";
import { arbitraryMessage } from "../../utils/constants";
import { fileGetContents } from "../../service/files";
import { setStateLoading } from "../../store";

const Arbitrary = ({ accDetails }) => {
  const [origin, setOrigin] = useState("");
  const [message, setMessage] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [transaction, setTransaction] = useState(null);
  const [timeStamp, setTimeStamp] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [file, setFile] = useState("");
  useEffect(() => {
    const windowData = get(window, "custom_data", "");
    let mountedComp = true;
    if (
      get(window, "isNewWindow", false) &&
      get(windowData, "type", "") === "sign-hex"
    ) {
      setOrigin(get(windowData, "origin", ""));
      if (isEmpty(get(windowData, "for", ""))) {
        !isEmpty(get(windowData, "message", "")) &&
        isEmpty(get(windowData, "transaction", []))
          ? setMessage(get(windowData, "message", ""))
          : setMessage(arbitraryMessage);
        async function readTheTransaction() {
          const transactionData =
            (!isEmpty(get(windowData, "transaction", [])) ||
              !isEmpty(get(windowData, "message", []))) &&
            (await createTransactionFromByte({
              transactionByte: get(windowData, "transaction", []),
              message: get(windowData, "message", ""),
            }));
          if (mountedComp && transactionData) {
            setTransaction(transactionData.toBytes());
            setMessage(transactionData.transactionMemo);
            setTransactionId(transactionData._transactionIds[0].toString());
            setTimeStamp(
              transactionData._transactionIds[0].validStart.seconds.toString()
            );
          }
        }
        readTheTransaction();
      } else {
        setMessage(
          `Allow this message to approve the file request for token ${get(
            windowData,
            "fileId",
            "N/A"
          )}`
        );
        setFile(get(windowData, "fileId", ""));
      }
    }
    return () => {
      mountedComp = false;
    };
  }, []);

  const onClickSign = async () => {
    if (isEmpty(file)) {
      await signTransaction({
        transaction: transaction,
        submit: canSubmit,
      });
    } else {
      setStateLoading(true);
      let fileData = {};
      const bytes = await fileGetContents({ fileId: file });
      fileData = !isEmpty(bytes) && binaryArrayToJson(bytes);
      sendResponseToBrowser("success", { fileData, type: "fileResponse" });
      setStateLoading(false);
      window.close();
    }
  };

  const onClickCancel = async () => {
    await sendCancelledResponse();
    window.close();
  };

  return (
    <div className="account-signin headerFixed px-4">
      <div
        className="
        signin-header
        py-2
        d-flex
        align-items-center
        justify-content-between
      "
      >
        <div className="w-50">
          <h6 className="pb-1">Account:</h6>
          <div className="d-flex align-items-center">
            <img className="mr-2" src="#" alt="" />
            <p className="text-truncate w-100">
              {get(accDetails, "accountId", "")}
            </p>
            <img className="ml-2" src="#" alt="" />
          </div>
        </div>
        <div className="text-right">
          <h6 className="pb-1">Balance:</h6>
          <p>{get(accDetails, "balance", 0).toFixed(2)} HEX</p>
        </div>
      </div>
      <div className="d-flex align-items-center origin-content justify-content-between pb-3">
        <h6>Origin:</h6>
        <div className="d-flex align-items-center">
          <img className="mr-2" src="#" alt="" />
          <p>{origin}</p>
        </div>
      </div>
      <p className="text-center py-2 border-bottom details-header">
        You are signing
      </p>
      <div className="flex-1 p-0 d-flex flex-column">
        <div className="message-details py-2 scroll-content">
          <h6 className="pb-1">Message:</h6>
          <p>
            {message}
            <br /> <br />
            {!isEmpty(transaction) ? `Keep this Id: ${transactionId}` : null}
          </p>
        </div>
        <p className="py-2 timestemp-header border-bottom">
          Timestamp: {!isEmpty(transaction) ? timeStamp : "N/A"}
        </p>
        {!isEmpty(transaction) && (
          <div className="d-flex justify-content-between mb-1">
            <div className="transactionOption d-flex align-items-center form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={canSubmit}
                id="submitToHex"
                onChange={(val) => {
                  setCanSubmit(!canSubmit);
                }}
              />
              <label className="form-check-label" htmlFor="submitToHex">
                Submit to the Network
              </label>
            </div>
          </div>
        )}
        <Button
          className="btn-exlarge btn btn-primary btn-primary-outline btn-block my-2"
          variant="primary"
          onClick={onClickSign}
        >
          {isEmpty(file) ? "Sign" : "Approve"}
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
  );
};

export default Arbitrary;
