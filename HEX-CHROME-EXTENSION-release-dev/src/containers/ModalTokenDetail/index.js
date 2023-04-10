import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { isEmpty, get } from "lodash";

import {
  getKeysByNetwork,
  binaryArrayToJson,
  downloadURI,
} from "../../utils/helpers";

import { fileGetContents, getFileFromIpfs } from "../../service/files";

import Loader from "../../components/Loader";
import DangerAlert from "../../components/DangerAlert";
import { tokenTypes } from "../../utils/constants";

const ModalTokenDetail = ({ tokenDetail, handleClose, network }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileData, setFileData] = useState({});

  useEffect(() => {
    setFileData({});
    setError({});
  }, [tokenDetail]);

  const getNFTFileContents = async () => {
    setLoading(true);
    
    if (get(tokenDetail, "symbol", "N/A").includes("HEDERA://")) {
      const bytes = await fileGetContents({
        fileId: get(tokenDetail, "symbol", "N/A").replace("HEDERA://", ""),
      });
      const data = binaryArrayToJson(bytes);
      if (isEmpty(data)) setError("Cannot retrieve NFT data");
      setFileData(data);
      setLoading(false);
    }
    else {
      const data = await getFileFromIpfs(get(tokenDetail, "symbol", "N/A").replace("IPFS://", ""));
      setFileData(data); 
      setLoading(false);
    }
  };

  const onSymbolClick = () => {
    if (!get(tokenDetail, "symbol", "N/A").includes("HEDERA")) return;
    const { transactionHistoryHost } = getKeysByNetwork({ network });

    window.open(
      `${transactionHistoryHost}/hedera/search?q=${get(
        tokenDetail,
        "symbol",
        "N/A"
      )}`,
      "_blank"
    );
  };

  const onDownload = () => {
    downloadURI(get(fileData, "file", ""), get(tokenDetail, "name", ""));
  };

  return (
    <Modal
      className="modalTokenDetails"
      show={!isEmpty(tokenDetail)}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Token Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="tokenDetails py-2 row">
          <div className="detailLabel col-5">Token Name</div>
          <div className="detailValue col-7">
            {get(tokenDetail, "name", "N/A")}
          </div>
        </div>

        <div className="tokenDetails py-2 row">
          <div className="detailLabel col-5">Token ID</div>
          <div className="detailValue col-7">
            {get(tokenDetail, "id", "N/A")}
          </div>
        </div>

        <div className="tokenDetails py-2 row">
          <div className="detailLabel col-5">Symbol</div>
          <div
            className={`detailValue col-7 d-flex align-items-center 
            ${get(tokenDetail, "symbol", "N/A").includes("HEDERA://") &&
              "cursor-pointer"
              }`}
            onClick={onSymbolClick}
          >
            {get(tokenDetail, "symbol", "N/A")}{" "}
            {get(tokenDetail, "symbol", "N/A").includes("HEDERA") && (
              <span className="ml-1 icon icon-link iconXS-12 dark-mode-img" />
            )}
          </div>
        </div>

        <div className="tokenDetails py-2 row">
          <div className="detailLabel col-5">Decimals</div>
          <div className="detailValue col-7 d-flex align-items-center">
            {get(tokenDetail, "decimals", 0)}
          </div>
        </div>

        <div className="tokenDetails py-2 row">
          <div className="detailLabel col-5">Total Supply</div>
          <div className="detailValue col-7">
            {get(tokenDetail, "supply", "N/A")}
          </div>
        </div>

        <div className="tokenDetails py-2 row">
          <div className="detailLabel col-5">Balance</div>
          <div className="detailValue col-7">
            {get(tokenDetail, "balance", "N/A")}
          </div>
        </div>

        <div className="tokenDetails py-2 row">
          <div className="detailLabel col-5">Treasury Account</div>
          <div className="detailValue col-7">
            {get(tokenDetail, "treasury", "N/A")}
          </div>
        </div>

        <div className="tokenDetails py-2 row">
          <div className="detailLabel col-5">Created On</div>
          <div className="detailValue col-7 d-flex align-items-center">
            {new Date(get(tokenDetail, "createdOn", 0)).toLocaleString()}
          </div>
        </div>

        {!isEmpty(get(tokenDetail, "deletedOn", 0)) && (
          <div className="tokenDetails py-2 row">
            <div className="detailLabel col-5">Deleted On</div>
            <div className="detailValue col-7 d-flex align-items-center">
              {new Date(get(tokenDetail, "deletedOn", 0)).toLocaleString()}
            </div>
          </div>
        )}

        <div className="tokenDetails py-2 row">
          <div className="detailLabel col-5">Expiry Date</div>
          <div className="detailValue col-7 d-flex align-items-center">
            {new Date(get(tokenDetail, "expiry", 0)).toLocaleString()}
          </div>
        </div>

        <div className="tokenDetails py-2 row">
          <div className="detailLabel col-5">Auto Renew Account</div>
          <div className="detailValue col-7 d-flex align-items-center">
            {get(tokenDetail, "autoRenewAccount", 0)}
          </div>
        </div>

        {get(tokenDetail, "type", "N/A") === tokenTypes[1].type && isEmpty(fileData) && (
          <div
            className="tokenDetails cursor-pointer py-2 pr-3 d-flex align-items-center justify-content-end"
            onClick={getNFTFileContents}
          >
            <span className="icon download iconXS-22 mr-2"></span>
            <span className="detailLabel">View File Data</span>
          </div>
        )}

        {!isEmpty(fileData) && (
          <>
            <div className="tokenDetails py-2 row">
              <div className="detailLabel col-5">Template Name</div>
              <div className="detailValue col-7 d-flex align-items-center">
                {get(fileData, "templateName", 0)}
              </div>
            </div>

            {get(fileData, "properties", []).map((p, i) => (
              <div className="tokenDetails py-2 row" key={`property-${i}`}>
                <div className="detailLabel col-5">{get(p, "name", "")}</div>
                <div className="detailValue col-7 d-flex align-items-center">
                  {get(p, "value", "")}
                </div>
              </div>
            ))}

            <div className="preview-file mb-3">
              {get(fileData, "file", "").includes("image") && (
                <img alt="preview pic" src={get(fileData, "file", "")} />
              )}

              {get(fileData, "file", "").includes("video") && (
                <video controls>
                  <source src={get(fileData, "file", "")} />
                  Your browser does not support HTML5 video.
                </video>
              )}
            </div>

            <div
              className="tokenDetails py-2 d-flex align-items-center justify-content-end pr-3 cursor-pointer"
              onClick={() => onDownload()}
            >
              <span className="icon download iconXS-22 mr-2"></span>
              <span className="detailLabel">Download</span>
            </div>
          </>
        )}

        {!isEmpty(error) && <DangerAlert message={error} />}

        {loading && <Loader />}
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-primary modal-btn" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTokenDetail;
