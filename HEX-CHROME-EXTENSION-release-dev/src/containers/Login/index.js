import React, { useState } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isEmpty, get } from "lodash";

import { logIn } from "../../service/auth";
import { networkOptions } from "../../utils/constants";
import { frontendRoutes } from "../../utils/routes";

export const Login = ({ history, accountsData }) => {
  const [accountData, setAccountData] = useState(accountsData[0]);
  const [password, setPassword] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState(
    networkOptions.find((i) => i.id === get(accountsData[0], "network", ""))
  );

  const onFormSubmit = async (event) => {
    event.preventDefault();
    await logIn({
      accId: accountData.accountId,
      passphrase: password,
      network: selectedNetwork.id,
    });
    history.push(frontendRoutes.dashboard);
  };

  return (
    <div className="login-page fixedHeight">
      <div className="d-flex flex-column pt-5 pb-4 px-4 h-100">
        <div className="flex-1">
          <div className="d-flex flex-column align-items-center">
            <div className="hexSymbolPurple welcomeLogo margin-auto"></div>
            <h1 className="logo-title mb-0 mt-2">HEX</h1>
            <p className="logo-desc mb-0">Welcome back!</p>
          </div>
          <Form className="m-b-12 mt-4" onSubmit={onFormSubmit}>
            <Form.Group className="mb-4">
              <Dropdown
                className="inputDropdown"
                onSelect={(e) => {
                  const acc = accountsData.find((i) => i.accountId === e);
                  setAccountData(acc);
                  setSelectedNetwork(
                    networkOptions.find((i) => i.id === acc.network)
                  );
                }}
              >
                <Dropdown.Toggle className="dropdown-basic">
                  {isEmpty(accountData)
                    ? "Select an Account"
                    : `${get(accountData, "alias", "No Name")} - ${get(
                        accountData,
                        "accountId",
                        "N/A"
                      )}`}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {accountsData.map((a) => (
                    <Dropdown.Item
                      key={get(a, "accountId", "")}
                      eventKey={get(a, "accountId", "")}
                    >
                      {get(a, "alias", "No Name")} - {get(a, "accountId", "")}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

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
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Label className="mt-1" htmlFor="password">
                Enter Password
              </Form.Label>
            </Form.Group>

            <Button
              block
              className="btn-exlarge btn-primary-outline"
              variant="primary"
              type="submit"
            >
              Login
            </Button>
          </Form>
        </div>

        <div className="button-section text-center">
          <p className="footer-desc mt-2 mb-1">Restore account?</p>
          <Link to={frontendRoutes.home} className="footer-title mt-2 mb-0">
            Import using account seed phrase
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
