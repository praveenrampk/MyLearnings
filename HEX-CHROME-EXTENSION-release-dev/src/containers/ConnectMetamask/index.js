import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { get } from "lodash";

import { ethereumNetworks } from "../../utils/constants";
import { frontendRoutes } from "../../utils/routes";
import {
  startOnboarding,
  connectMetamask,
  isMetamaskConnected,
} from "../../service/metamask";

const ConnectMetamask = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [metamaskDetails, setMetamaskDetails] = useState({});

  useEffect(() => {
    let mountedComp = true;
    isMetamaskConnected().then((data) => {
      if (mountedComp && data) onClickConnect();
    });
    return () => {
      mountedComp = false;
    };
  }, []);

  const onClickConnect = async () => {
    const details = await connectMetamask();
    setMetamaskDetails(details);
    setIsConnected(true);

    details.provider.on("chainChanged", (chainId) => {
      setMetamaskDetails({
        ...details,
        chainId,
      });
    });
  };

  return (
    <div className="connect-metamask-page headerFixed px-4 scroll-content">
      <div className="d-flex flex-column h-100">
        <div className="text-center mt-4 mb-3">
          <h3 className="page-title">Connect Metamask</h3>
        </div>
        <div className="buy-hex-content hexAssetSection flex-1 p-0 d-flex flex-column">
          <div className="m-auto text-center">
            <div className="icon metamask iconXXl mr-0"></div>
            {!isConnected ? (
              <p>
                If you haven't installed metamask yet,{" "}
                <u onClick={startOnboarding}>click here to install it.</u>
              </p>
            ) : (
              <>
                <p className="mb-2">Metamask is Connected !</p>
                <p>
                  The current network is{" "}
                  {ethereumNetworks[get(metamaskDetails, "chainId", "default")]}
                </p>
              </>
            )}
          </div>

          {!isConnected && (
            <Button
              className="btn-exlarge btn btn-primary btn-primary-outline btn-block mb-3"
              variant="primary"
              onClick={onClickConnect}
            >
              Connect
            </Button>
          )}
          <Link
            className="btn btn-link primary w-100"
            variant="secondary"
            to={frontendRoutes.dashboard}
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConnectMetamask;
