import React from "react";
import { Modal, Button } from "react-bootstrap";

import { isEmpty, get } from "lodash";
import { getHbarValueFromTinyHbars } from "../../utils/helpers";
import { truncate } from "../../utils/helpers";
import Copy from "../../components/Copy";
import { ethereumNetworks } from "../../utils/constants";

const ModalTransactionDetail = ({ transactionDetail, handleClose }) => {
  return (
    <Modal
      className="modalTransactionDetails"
      show={!isEmpty(transactionDetail)}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Transaction Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isEmpty(get(transactionDetail, "transactionHash", "")) && (
          <div className="transactionDetails py-2 row">
            <div className="detailLabel col-5">Transaction Hash</div>
            <div className="detailValue col-7 d-flex align-items-center">
              {truncate(get(transactionDetail, "transactionHash", "N/A"), 15)}
              <Copy text={get(transactionDetail, "transactionHash", "N/A")} />
            </div>
          </div>
        )}

        {!isEmpty(get(transactionDetail, "transactionID", "")) && (
          <div className="transactionDetails py-2 row">
            <div className="detailLabel col-5">Transaction ID</div>
            <div className="detailValue col-7">
              {get(transactionDetail, "transactionID", "N/A")}
            </div>
          </div>
        )}

        {!isEmpty(get(transactionDetail, "transactionId", "")) && (
          <div className="transactionDetails py-2 row">
            <div className="detailLabel col-5">Transaction ID</div>
            <div className="detailValue col-7">
              {get(transactionDetail, "transactionId", "N/A")}
            </div>
          </div>
        )}

        {!isEmpty(get(transactionDetail, "nodeID", "")) && (
          <div className="transactionDetails py-2 row">
            <div className="detailLabel col-5">Node</div>
            <div className="detailValue col-7">
              {get(transactionDetail, "nodeID", "N/A")}
            </div>
          </div>
        )}

        {get(transactionDetail, "type", "") !== "eth_transfer" && (
          <div className="transactionDetails py-2 row">
            <div className="detailLabel col-5">Payer ID</div>
            <div className="detailValue col-7">
              {!isEmpty(get(transactionDetail, "payerID", "")) &&
                get(transactionDetail, "payerID", "N/A")}

              {get(transactionDetail, "txType", "") === "token" &&
                (get(transactionDetail, "txSign", "")
                  ? get(transactionDetail, "accountId", "")
                  : get(transactionDetail, "toFromAccount[0]", ""))}
            </div>
          </div>
        )}

        {get(transactionDetail, "type", "") !== "eth_transfer" &&
          (!isEmpty(get(transactionDetail, "accountID", "")) ||
            !isEmpty(get(transactionDetail, "accountId", ""))) && (
            <div className="transactionDetails py-2 row">
              <div className="detailLabel col-5">Receiver ID</div>
              <div className="detailValue col-7">
                {!isEmpty(get(transactionDetail, "accountID", "")) &&
                  get(transactionDetail, "accountID", "N/A")}

                {get(transactionDetail, "txType", "") === "token" &&
                  (get(transactionDetail, "txSign", "")
                    ? get(transactionDetail, "toFromAccount[0]", "")
                    : get(transactionDetail, "accountId", ""))}
              </div>
            </div>
          )}

        {!isEmpty(get(transactionDetail, "consensusTime", "")) && (
          <div className="transactionDetails py-2 row">
            <div className="detailLabel col-5">Conensus Time</div>
            <div className="detailValue col-7">
              {new Date(
                get(transactionDetail, "consensusTime", 0)
              ).toLocaleString()}
            </div>
          </div>
        )}

        {!isEmpty(get(transactionDetail, "transferTime", "")) && (
          <div className="transactionDetails py-2 row">
            <div className="detailLabel col-5">Transfer Time</div>
            <div className="detailValue col-7">
              {new Date(
                get(transactionDetail, "transferTime", 0)
              ).toLocaleString()}
            </div>
          </div>
        )}

        {!isEmpty(get(transactionDetail, "status", "")) && (
          <div className="transactionDetails py-2 row">
            <div className="detailLabel col-5">Status</div>
            <div className="detailValue col-7">
              {get(transactionDetail, "status", "N/A")}
            </div>
          </div>
        )}

        {(!isEmpty(get(transactionDetail, "transactionDirection", "")) ||
          !isEmpty(get(transactionDetail, "typeLabel", ""))) && (
          <div className="transactionDetails py-2 row">
            <div className="detailLabel col-5">Type</div>
            <div className="detailValue col-7">
              {!isEmpty(get(transactionDetail, "transactionDirection", ""))
                ? get(transactionDetail, "transactionDirection", "N/A")
                : get(transactionDetail, "typeLabel", "N/A")}
            </div>
          </div>
        )}

        {get(transactionDetail, "type", "") === "eth_transfer" && (
          <div className="transactionDetails py-2 row">
            <div className="detailLabel col-5">Exchange Amount</div>
            <div className="detailValue col-7">
              {get(transactionDetail, "exchangeAmount", "")}{" "}
              {get(transactionDetail, "to", "")}
            </div>
          </div>
        )}

        {get(transactionDetail, "type", "") === "eth_transfer" && (
          <div className="transactionDetails py-2 row">
            <div className="detailLabel col-5">Network</div>
            <div className="detailValue col-7">
              {ethereumNetworks[get(transactionDetail, "chainId", "")]}
            </div>
          </div>
        )}

        <div className="transactionDetails py-2 row">
          <div className="detailLabel col-5">Memo</div>
          <div className="detailValue col-7">
            {isEmpty(get(transactionDetail, "memo", ""))
              ? "N/A"
              : get(transactionDetail, "memo", "N/A")}
          </div>
        </div>

        <div className="transactionDetails py-2 row">
          <div className="detailLabel col-5">Amount</div>
          <div className="detailValue col-7">
            {get(transactionDetail, "amount", 0)}{" "}
            {get(transactionDetail, "type", "") === "eth_transfer" ? "ETH" : ""}
          </div>
        </div>

        {!isEmpty(get(transactionDetail, "transfers", [])) && (
          <div className="transactionDetails py-2 row">
            <div className="detailLabel col-5">All Transfers</div>
            <div className="detailValue col-7">
              {get(transactionDetail, "transfers", []).map((t) => (
                <div key={get(t, "accountID", "")}>
                  <span>{get(t, "accountID", "")}</span> =
                  <span className="bold">
                    {getHbarValueFromTinyHbars(get(t, "amount", 0))}
                  </span>
                  <br />
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-primary modal-btn" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTransactionDetail;
