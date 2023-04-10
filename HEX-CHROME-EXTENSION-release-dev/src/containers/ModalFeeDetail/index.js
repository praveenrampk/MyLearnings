import React, { useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";

import { isEmpty, get } from "lodash";
import Popovers from "../../components/Popover";
import ToggleSwitch from "../../components/ToggleSwitch";

const ModalFeeDetail = ({ details, onConfirm, handleClose }) => {
  const [seeFees, setSeeFees] = useState(false);

  return (
    <Modal
      className="modalFeeDetails"
      show={!isEmpty(details)}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Fee Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {details.map((d) => {
          if (
            ["Trading Fee", "Total"].includes(get(d, "label", "")) &&
            !seeFees
          )
            return null;
          return (
            <div
              key={get(d, "label", "")}
              className={`feeDetails ${
                ["Transactions", "Token-Transfers"].includes(
                  get(d, "label", "")
                )
                  ? ""
                  : "d-flex align-items-center"
              } py-2 ${
                ["Trading Fee"].includes(get(d, "label", ""))
                  ? "justify-content-end"
                  : ""
              }`}
            >
              <div className={`detailLabel d-flex align-items-center pr-2`}>
                {get(d, "label", "") === "Trading Fee" && (
                  <Popovers
                    placement="top"
                    message={"A Trading fee is charged for all transactions"}
                  />
                )}
                {get(d, "label", "")} :{" "}
                {get(d, "value", []).length === 0 ? "N/A" : ""}
              </div>
              {["Transactions", "Token-Transfers"].includes(
                get(d, "label", "")
              ) &&
                get(d, "value", []).length > 0 && (
                  <div className="feeDetails py-2">
                    <Table striped bordered responsive="sm">
                      <thead>
                        <tr className="detailLabel">
                          {get(d, "label", "") === "Token-Transfers" && (
                            <th className="detailLabel">Token Id</th>
                          )}
                          <th className="detailValue">Receiver</th>
                          <th className="detailValue">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {get(d, "value", []).map((eachTransaction, index) => {
                          return (
                            <tr
                              key={`transacton-${index}`}
                              className="detailValue"
                            >
                              {get(d, "label", "") === "Token-Transfers" && (
                                <td>{get(eachTransaction, "tokenId", "")}</td>
                              )}
                              <td>{get(eachTransaction, "transferTo", "")}</td>
                              <td>{get(eachTransaction, "amount", "")}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                )}
              {!["Transactions", "Token-Transfers"].includes(
                get(d, "label", "")
              ) && <div className="detailValue">{get(d, "value", "N/A")}</div>}
            </div>
          );
        })}
        <div className="d-flex justify-content-end">
          <ToggleSwitch
            label={"See Fees"}
            value={seeFees}
            onClick={() => setSeeFees(!seeFees)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-primary modal-btn" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalFeeDetail;
