import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { get } from "lodash";

import { frontendRoutes } from "../../utils/routes";
import { unlock } from "../../service/crypto";
import { copy } from "../../utils/helpers";
import { getDataFromChromeSyncStorage } from "../../service/storage";

import Loader from "../../components/Loader";
import WarningAlert from "../../components/WarningAlert";
import DangerAlert from "../../components/DangerAlert";
import QRCode from "qrcode.react";

const Export = ({ accDetails }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [loading, setLoading] = useState(false);

  const [action, setAction] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [password, setPassword] = useState("");

  const onCopy = () => {
    setShowTooltip(true);
    const text = `Account ID: ${get(
      accDetails,
      "accountId",
      ""
    )}\nPrivate Key: ${privateKey}`;
    copy(text);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  const onChangePassword = (e) => {
    if (action === "error") setAction("");
    setPassword(e.target.value);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const encryptedData = await getDataFromChromeSyncStorage(null);
      const encrypted = JSON.parse(
        encryptedData[get(accDetails, "accountId", "")]
      );
      const decodedObject = await unlock({ passphrase: password, encrypted });

      setPrivateKey(decodedObject);
      setAction("success");
      setLoading(false);
    } catch (err) {
      setAction("error");
      setLoading(false);
    }
  };

  return (
    <div className="send-token-page headerFixed d-flex flex-column scroll-content">
      <div className="px-4 d-flex flex-column h-100">
        <div className="text-center my-5">
          <h3 className="page-title">Export Private Key</h3>
        </div>
        <div className="send-token-content flex-1">
          <Form className="d-flex flex-column h-100" onSubmit={onFormSubmit}>
            <div className="flex-1">
              {action !== "success" && (
                <Form.Group className="mb-4">
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                  />
                  <Form.Label className="bold" htmlFor="name">
                    Enter your HEX password
                  </Form.Label>
                </Form.Group>
              )}

              {action === "error" && (
                <DangerAlert message={"Incorrect Password"} />
              )}

              {action === "success" && (
                <>
                  <div className="export-qr m-b-32">
                    <QRCode
                      className="m-auto d-block"
                      value={`Account ID: ${get(
                        accDetails,
                        "accountId",
                        ""
                      )}\nPrivate Key: ${privateKey}`}
                    />
                  </div>

                  <Form.Group className="mb-4">
                    <Form.Control
                      type="text"
                      value={get(accDetails, "accountId", "")}
                      readOnly={true}
                    />
                    <Form.Label className="bold" htmlFor="name">
                      Account ID
                    </Form.Label>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Control
                      type="text"
                      value={privateKey}
                      readOnly={true}
                    />
                    <Form.Label className="bold" htmlFor="name">
                      Private Key
                    </Form.Label>
                  </Form.Group>

                  <div className="w-100 text-center">
                    <u
                      className={`mb-2 txt-dark-link cursor-pointer toolTip ${
                        showTooltip && "showText"
                      }`}
                      onClick={onCopy}
                    >
                      (Click here to copy)
                      <span className="text">Copied!</span>
                    </u>
                  </div>

                  <WarningAlert
                    message={
                      "Never disclose this key. Anyone with your private  keys can steal any assets held in your account."
                    }
                  />
                </>
              )}
            </div>

            <div className="button-section mb-4">
              {action !== "success" && (
                <Button
                  className="btn-exlarge btn btn-primary btn-primary-outline btn-block mb-3"
                  variant="primary"
                  type="submit"
                >
                  Continue
                </Button>
              )}
              <Link
                className="btn btn-link primary w-100"
                variant="secondary"
                to={frontendRoutes.dashboard}
              >
                Go to Dashboard
              </Link>
            </div>
          </Form>
        </div>
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default Export;
