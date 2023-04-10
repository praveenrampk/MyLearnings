import React, { useState } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { get, isEmpty } from "lodash";
import importAccount from "../../service/accounts/import";
import { networkOptions } from "../../utils/constants";
import { formatAccountID } from "../../utils/helpers";

import { frontendRoutes } from "../../utils/routes";

const secretKeyLabel = {
  "seed-phrase": "Seed Phrase",
  "private-key": "Private Key",
  hardware: "Hardware",
};

export const ImportWallet = ({ history, match }) => {
  const [accountId, setAccountId] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [password, setPassword] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState({});
  const [alias, setAlias] = useState("");

  const onFormSubmit = async (event) => {
    event.preventDefault();
    await importAccount({
      passphrase: password,
      secretKey,
      accountId: formatAccountID(accountId.trim()),
      keyType: get(match, "params.keyType", ""),
      network: selectedNetwork.id,
      alias: isEmpty(alias) ? "No Name" : alias,
    });
    history.push(frontendRoutes.dashboard);
  };

  return (
    <div className="import-wallet-page fixedHeight d-flex flex-column p-4">
      <div className="text-center m-b-32">
        <h3 className="page-title text-center">Import Wallet</h3>
        <p className="page-desc mt-2">
          Using {secretKeyLabel[get(match, "params.keyType", "")]}
        </p>
      </div>
      <div className="import-wallet-content flex-1">
        <Form className="d-flex flex-column h-100" onSubmit={onFormSubmit}>
          <div className="flex-1">
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
              />
              <Form.Label htmlFor="name">Account ID</Form.Label>
              <p className="form-lable-small">Eg. 243534 or 0.0.243534</p>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
              <Form.Label htmlFor="name">Wallet Name</Form.Label>
            </Form.Group>

            {get(match, "params.keyType", "") !== "hardware" && (
              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                />
                <Form.Label htmlFor="name">
                  Enter {secretKeyLabel[get(match, "params.keyType", "")]}
                </Form.Label>
              </Form.Group>
            )}

            <Form.Group className="mb-4">
              <Dropdown
                className="networkDropdown inputDropdown"
                onSelect={(v) =>
                  setSelectedNetwork(networkOptions.find((i) => i.id === v))
                }
              >
                <Dropdown.Toggle
                  id="sample-dropdown"
                  className="dropdown-basic"
                >
                  {isEmpty(selectedNetwork)
                    ? "Select Network"
                    : get(selectedNetwork, "label", "")}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {networkOptions.map((item) => (
                    <Dropdown.Item key={item.id} eventKey={item.id}>
                      {item.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Label htmlFor="name">Create Password</Form.Label>
            </Form.Group>
          </div>
          <div className="button-section">
            <Button
              className="btn-exlarge btn-block btn-primary-outline"
              variant="primary"
              type="submit"
            >
              Confirm
            </Button>
            <Link
              className="btn btn-link primary w-100 mt-3"
              variant="secondary"
              to={frontendRoutes.home}
            >
              Back
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(ImportWallet);
