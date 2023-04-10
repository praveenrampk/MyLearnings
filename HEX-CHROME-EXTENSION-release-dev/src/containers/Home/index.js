/* global chrome */
import { get } from "lodash-es";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { frontendRoutes } from "../../utils/routes";

export const Home = ({ history }) => {
  const [extensionPage, setExtensionPage] = useState(false);
  const openCreateWallet = () => {
    if (get(window, "isNewWindow", false))
      history.push(frontendRoutes.createWallet);
    else
      chrome.runtime.sendMessage({
        type: "create-wallet",
      });
  };

  const openConnectHardwareWallet = () => {
    if (get(window, "isNewWindow", false))
      history.push(frontendRoutes.hardwareWallet);
    else
      chrome.runtime.sendMessage({
        type: "hardware-wallet",
        expanded: true,
      });
  };

  useEffect(() => {
    let isHostMounted = true;
    const fetchHost = async () => {
      const queryInfo = {
        active: true,
        lastFocusedWindow: true,
      };
      chrome.tabs &&
        chrome.tabs.query(queryInfo, (tabs) => {
          if (!chrome.runtime.lastError) {
            try {
              const url = new URL(tabs[0].url);
              if (isHostMounted) {
                url.protocol === "chrome-extension:" && setExtensionPage(true);
              }
            } catch (err) {
              console.log(err.message);
            }
          }
        });
    };
    fetchHost();
    return () => {
      isHostMounted = false;
    };
  }, []);

  return (
    <div
      className={`home-page ${
        extensionPage ? "fixedHeight" : "pt-4"
      } d-flex align-items-center`}
    >
      <div className="container">
        <div className="text-center">
          <div className="icon iconL-90 hexPurple pr-0 mr-0" />
          <h1 className="logo-title mb-0 mt-2">HEX</h1>
          <p className="logo-desc mb-0">
            Decentralize <br /> Everything
          </p>
        </div>
        <div className="w-100 d-flex flex-column align-items-center mt-4">
          <Link className="w-100" to="/import/private-key">
            <Button
              block
              className="btn-primary btn-primary-outline btn-exlarge"
            >
              IMPORT USING PRIVATE KEYdisabled
            </Button>
          </Link>
          <Link className="w-100 my-3" to="/import/seed-phrase">
            <Button
              block
              className="btn-primary btn-primary-outline btn-exlarge"
            >
              IMPORT USING SEED PHRASE
            </Button>
          </Link>

          <Button
            block
            className="btn-primary btn-primary-outline btn-exlarge"
            onClick={openCreateWallet}
          >
            CREATE A NEW WALLET
          </Button>

          <Button
            block
            className="mt-3 btn-primary btn-primary-outline btn-exlarge"
            onClick={openConnectHardwareWallet}
          >
            CONNECT HARDWARE WALLET
          </Button>
        </div>
        <Link className="btn btn-link primary w-100 mt-4" to="/login">
          LOG IN
        </Link>
      </div>
    </div>
  );
};

export default Home;
