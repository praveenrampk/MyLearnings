import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { get, isEmpty } from "lodash";
import { getPublicKey } from "../../service/ledger";
import { setStateAlertData, setStatePublicKey } from "../../store";

import Loader from "../../components/Loader";

const operations = [
  {
    id: "import",
    label: "Import Wallet",
    route: "/import/hardware",
  },
  {
    id: "create",
    label: "Create Wallet",
    route: "/create-wallet/hardware",
  },
];

const ConnectHardwareWallet = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(operations[0]);

  const onClickLedger = async () => {
    try {
      setLoading(true);
      const publicKey = await getPublicKey();
      setStatePublicKey(publicKey);
      setLoading(false);

      if (isEmpty(publicKey))
        setStateAlertData({
          title: "Connect Hardware",
          type: "error",
          message: "Check if the Ledger is connected properly.",
        });
      else {
        history.push(get(selectedOperation, "route", ""));
      }
    } catch (err) {
      setStateAlertData({
        title: "Connect Hardware",
        type: "error",
        message: get(err, "message", ""),
      });
    }
  };

  return (
    <div className="connect-hardware fixedHeight headerFixed px-4 scroll-content">
      <div className="d-flex flex-column h-100">
        <div className="text-center mt-4 mb-3">
          <h3 className="page-title">Connect Hardware</h3>
        </div>

        <div>
          <div className="mt-4">
            <h3 className="wallet-import-title">1. Connect Hardware Wallet</h3>
            <p className="wallet-import-desc mt-2">
              Connect your hardware wallet using the micro USB Cable.
            </p>
            <div className="mt-3">
              <div className="icon connectWallet imgWallet"></div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="wallet-import-title">2. Select the app</h3>
            <p className="wallet-import-desc mt-2">
              Unlock your Ledger wallet and open the Hedera™ Hashgraph app now
            </p>
            <div className="mt-3">
              <div className="icon walletDetails imgDetails"></div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="wallet-import-title">
              3. Start using Hardware Wallet
            </h3>
            <p className="wallet-import-desc mt-2">
              Use your hardware wallet like you would with any Hedera account.
              Send HBAR and Tokens, Buy and Sell HEX and Create Fungible and Non
              Fungible tokens.
            </p>
            <div className="mt-3">
              <div className="icon loginWallet imgDetails"></div>
            </div>
          </div>
        </div>
        <div className="readyToConnect text-center border-top mt-3">
          <h3 className="wallet-import-title pt-3">Ready to Connect?</h3>
          <div className="card ready-to-connect py-5 mt-3">
            <div className="icon ledgerLogo imgLedger"></div>
          </div>
          <Dropdown
            className="networkDropdown inputDropdown mt-4 mb-4"
            onSelect={(v) =>
              setSelectedOperation(operations.find((i) => i.id === v))
            }
          >
            <Dropdown.Toggle id="sample-dropdown" className="simple-dropdown">
              {isEmpty(selectedOperation)
                ? "Select Verification Method"
                : get(selectedOperation, "label", "")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {operations.map((item) => (
                <Dropdown.Item key={item.id} eventKey={item.id}>
                  {item.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="py-3">
          <button
            type="button"
            className="btn-primary btn-primary-outline btn-exlarge btn btn-primary btn-block"
            onClick={onClickLedger}
          >
            CONNECT
          </button>
        </div>
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default ConnectHardwareWallet;
