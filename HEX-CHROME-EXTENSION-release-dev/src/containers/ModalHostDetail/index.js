import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { isEmpty, get } from "lodash";

const ModalHostDetail = ({ hostDetail, handleClose, onRemoveHost }) => {
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [activeAccount, setActiveAccount] = useState({});

  useEffect(() => {
    setConnectedAccounts(get(hostDetail, "accounts", []));
    setActiveAccount(get(hostDetail, "activeAccount", {}));
  }, [hostDetail]);

  return (
    <Modal
      className="modalSiteDetails"
      show={!isEmpty(hostDetail)}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="siteHeader">
          <div className="siteTitle">{get(hostDetail, "host", "")}</div>
          <div className="siteSubTitle">
            {activeAccount.connected
              ? `You have ${connectedAccounts.length} accounts connected to this site.`
              : "HEX is not connected to this site. To connect lookout for connection in this site"}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {activeAccount.connected &&
          connectedAccounts.map((account, index) => (
            <div
              key={index + ""}
              style={{
                display: "flex",
                alignItems: "center",
                borderWidth: 0.5,
                height: 30,
                justifyContent: "space-between",
              }}
            >
              <div className="siteDescription d-flex align-items-center">
                <div className="siteImage borderSiteLogo d-flex align-items-center justify-content-center">
                  <div className="hexSymbolPurple"></div>
                </div>
                <div className="ml-2">
                  {account.alias}(...
                  {account.accountId.substr(account.accountId.length - 3)})
                </div>
                {account.accountId === activeAccount.accountId ? (
                  <span className="active ml-2">active</span>
                ) : null}
              </div>
              <div
                title={"Deleted Site"}
                className="icon trash iconXS-20 mr-0 dark-mode-img"
                onClick={() => onRemoveHost(account)}
              ></div>
            </div>
          ))}
      </Modal.Body>
    </Modal>
  );
};
export default ModalHostDetail;
