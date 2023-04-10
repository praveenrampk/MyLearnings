/* global chrome */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { get } from "lodash";

import { frontendRoutes } from "../../utils/routes";
import { logOut } from "../../service/auth";
import { reloadAccountInfo } from "../../service/accounts/info";

import "./index.scss";

const Header = ({ history, accDetails }) => {
  const [reload, setReload] = useState(false);

  const onLogOut = () => {
    logOut();
    history.push(frontendRoutes.home);
  };

  const onReload = async () => {
    if (reload) return;
    setReload(true);
    await reloadAccountInfo();
    setReload(false);
  };

  const onDarkModeChange = () => {
    const body = document.body;
    body.classList.toggle("dark-mode");
    chrome.storage.sync.set(
      { darkMode: body.classList.contains("dark-mode") },
      function () {}
    );
  };

  const onExpandView = () => {
    if (get(window, "isNewWindow", false))
      history.push(frontendRoutes.dashboard);
    else
      chrome.runtime.sendMessage({
        type: "dashboard",
        expanded: true,
      });
  };

  const onConnectMetamask = () => {
    if (get(window, "isNewWindow", false))
      history.push(frontendRoutes.connectMetamask);
    else
      chrome.runtime.sendMessage({
        type: "connectMetamask",
      });
  };

  return (
    <div className="dashboardHeader d-flex align-items-center justify-content-between">
      <Link to={frontendRoutes.dashboard}>
        <div className="hexSymbolPurple headerLogo dark-mode-img"></div>
      </Link>

      <div
        className="d-flex align-items-center headerButton cursor-pointer"
        onClick={onReload}
      >
        <span
          className={`mr-2 ${get(accDetails, "network", "testnet")} `}
        ></span>
        HEDERA<sup>TM</sup> &nbsp;
        {get(accDetails, "network", "testnet").toUpperCase()}
        <div
          className={`icon iconReload iconXS-12 dark-mode-img mr-0 ml-2 ${
            reload && "reload"
          }`}
        />
      </div>

      <Dropdown className="settingsDropdown">
        <Dropdown.Toggle
          id="sample-dropdown"
          className="d-flex align-items-center"
        >
          <i className="icon icon-menu iconS mr-0 dark-mode-img"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={onExpandView}>Expand View</Dropdown.Item>
          <Dropdown.Item onClick={onConnectMetamask}>
            Connect Metamask
          </Dropdown.Item>
          <Dropdown.Item onClick={() => history.push(frontendRoutes.export)}>
            Export Private Key
          </Dropdown.Item>
          <Dropdown.Item onClick={onDarkModeChange}>
            Toggle Dark Mode
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(frontendRoutes.hiddenTokens)}
          >
            View Hidden Tokens
          </Dropdown.Item>
          <Dropdown.Item onClick={onLogOut}>Log out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Header;
