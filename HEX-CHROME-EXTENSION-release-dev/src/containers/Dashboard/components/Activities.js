import React from "react";
import { Dropdown } from "react-bootstrap";
import { get, isEmpty } from "lodash";

import { getHbarValueFromTinyHbars } from "../../../utils/helpers";
import { activitiesFilters } from "../../../utils/constants";

const Activities = ({
  accountId,
  selectedFilter,
  transactionList,
  scrollMessage,
  onChangeActivitiesFilter,
  setTransactionDetail,
  showScrollUp,
}) => {
  return (
    <div className="assetContentItems">
      <div className="assetFilter">
        <div className="assetFilterItem d-flex align-items-center justify-content-between w-100 mt-3 mb-2">
          <h3 className="filter-title">Activities List</h3>
          <Dropdown
            className="filterDropdown"
            onSelect={(e) => onChangeActivitiesFilter(e)}
          >
            <Dropdown.Toggle id="sample-dropdown" className="dropdown-basic">
              {get(selectedFilter, "title", "")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {activitiesFilters.map((f) => (
                <Dropdown.Item
                  key={get(f, "id", "")}
                  eventKey={get(f, "id", "")}
                >
                  {get(f, "title", "")}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {isEmpty(get(transactionList, "data", [])) &&
        scrollMessage !== "Loading..." && (
          <p className="text-center py-3 mb-3">No Activities Found</p>
        )}

      {!isEmpty(get(transactionList, "data", [])) &&
        selectedFilter.id === "swaps" &&
        get(transactionList, "data", []).map((tx, index) => (
          <div
            id={get(tx, "transactionHash", "")}
            key={get(tx, "transactionHash", "")}
            className="assetContentItem d-flex align-items-center"
            onClick={() =>
              setTransactionDetail({
                ...tx,
                txSign: "-",
                txType: "hexTransfers",
                type: "eth_transfer",
              })
            }
          >
            <div className="d-flex">
              <div className="assetImage borderImageLogo d-flex align-items-center justify-content-center">
                <div className="hexSymbolPurple"></div>
              </div>
            </div>
            <div className="ml-3 w-100">
              <h3 className="mb-0 hexAssetName d-flex align-items-center justify-content-between">
                <span>
                  {"+"} {get(tx, "exchangeAmount", "N/A")} {tx.to}
                </span>
                <span
                  className={`payment-type ${
                    get(tx, "status", "") === "pending"
                      ? "pending"
                      : get(tx, "status", "") === "failed"
                      ? "debit"
                      : "credit"
                  }`}
                >
                  {get(tx, "status", "pending")}
                </span>
              </h3>
              <p className="mt-1 mb-0 hexAssetAmount">
                <>
                  <span className="bold">From: </span>
                  {get(tx, "amount", "N/A")} ETH
                  <br />
                  <span className="bold">To: </span>
                  {get(tx, "exchangeAmount", "N/A")} {get(tx, "to", "N/A")}
                </>
              </p>
            </div>
          </div>
        ))}

      {!isEmpty(get(transactionList, "data", [])) &&
        get(transactionList, "type", "") !== "eth_transfer" &&
        get(transactionList, "data", []).map((tx) => {
          const transfers = get(tx, "transfers", []).slice(2);
          const txDetails = transfers.find((k) => k.accountID === accountId);

          let txSign =
            get(tx, "transactionDirection", "") === "Debit" ||
            get(txDetails, "amount", 0) < 0;
          let amount = 0;

          const from = [],
            to = [];
          const txType =
            get(selectedFilter, "id", "") === "hexTransfers" ? "token" : "";

          switch (txType) {
            case "token":
              txSign = get(tx, "amount", 0) < 0;
              amount = `${Math.abs(get(tx, "amount", 0) / 100000)} ${get(
                selectedFilter,
                "tokenName",
                ""
              )}`;
              if (get(tx, "amount", 0) < 0) {
                from.push(get(tx, "accountId", ""));
                to.push(get(tx, "toFromAccount", "")[0]);
              } else {
                from.push(get(tx, "toFromAccount", "")[0]);
                to.push(get(tx, "accountId", ""));
              }
              break;
            default:
              amount = getHbarValueFromTinyHbars(
                Math.abs(get(tx, "amount", 0))
              );
              transfers.forEach((t) => {
                const accountID = get(t, "accountID", "");
                if (get(t, "amount", 0) < 0) {
                  from.push(accountID);
                } else {
                  to.push(accountID);
                }
              });
          }

          return (
            <div
              id={get(tx, "transactionID", "") || get(tx, "transactionId", "")}
              key={get(tx, "transactionID", "") || get(tx, "transactionId", "")}
              className="assetContentItem d-flex align-items-center"
              onClick={() =>
                setTransactionDetail({ ...tx, amount, txType, txSign })
              }
            >
              <div className="d-flex">
                <div className="assetImage borderImageLogo d-flex align-items-center justify-content-center">
                  <div className="hexSymbolPurple"></div>
                </div>
              </div>
              <div className="ml-3 w-100">
                <h3 className="mb-0 hexAssetName d-flex align-items-center justify-content-between">
                  <span>
                    {txSign ? "-" : "+"} {amount}
                  </span>
                  <span
                    className={`payment-type ${txSign ? "debit" : "credit"}`}
                  >
                    {txSign ? "Debit" : "Credit"}
                  </span>
                </h3>
                <p className="mt-1 mb-0 hexAssetAmount">
                  {!isEmpty(get(tx, "transactionDirection", "")) ? (
                    <>
                      <span className="bold">From: </span>
                      {get(tx, "payerID", "N/A")}
                      <br />
                      <span className="bold">To: </span>
                      {get(tx, "accountID", "N/A")}
                    </>
                  ) : (
                    <>
                      <span className="bold">From: </span>
                      {isEmpty(from) ? accountId : from.toString()}
                      <br />
                      <span className="bold">To: </span>
                      {isEmpty(to) ? accountId : to.toString()}
                    </>
                  )}
                  <br />
                  {!isEmpty(get(tx, "consensusTime", "")) &&
                    new Date(get(tx, "consensusTime", 0)).toLocaleString()}
                  {!isEmpty(get(tx, "transferTime", "")) &&
                    new Date(get(tx, "transferTime", 0)).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}

      {!isEmpty(scrollMessage) && (
        <div className="scrollLoading text-center pt-4">
          <b>{scrollMessage}</b>
        </div>
      )}

      {showScrollUp && (
        <div
          className="scrollUp"
          onClick={() =>
            document
              .querySelector(".dashboardTitle")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          &#8593;
        </div>
      )}
    </div>
  );
};

export default Activities;
