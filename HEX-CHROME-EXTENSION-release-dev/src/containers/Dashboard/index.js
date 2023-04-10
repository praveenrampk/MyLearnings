/* global chrome */

import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { isEmpty, get } from "lodash";
import {
  // truncate,
  getKeysByNetwork,
  getData,
  publishToBrowser,
  postData,
} from "../../utils/helpers";
import { activitiesFilters, defaultQueryParams, mirrorNodeType } from "../../utils/constants";
import { backendRoutes, frontendRoutes } from "../../utils/routes";

import ModalTransactionDetail from "../ModalTransactionDetail";
import ModalTokenDetail from "../ModalTokenDetail";
import ModalHostDetail from "../ModalHostDetail";

// import Copy from "../../components/Copy";
import Assets from "./components/Assets";
import Activities from "./components/Activities";

import "./index.scss";
import { setStateAccountDetails } from "../../store";
import {
  updateHostDetails,
  updateHostDetailsInSync,
} from "../../service/accounts/info";

const routeByType = {
  "send-batch": frontendRoutes.sendBatch,
  "token-associate": frontendRoutes.token,
  "token-dissociate": frontendRoutes.token,
  "token-create": frontendRoutes.token,
  "token-send": frontendRoutes.token,
  "token-grantkyc": frontendRoutes.token,
  "token-revokekyc": frontendRoutes.token,
  "token-freeze": frontendRoutes.token,
  "token-unfreeze": frontendRoutes.token,
  "token-mint": frontendRoutes.token,
  "token-burn": frontendRoutes.token,
  "token-wipe": frontendRoutes.token,
  "token-delete": frontendRoutes.token,
  "hbar-swap": frontendRoutes.swap,
  "enable-hex": frontendRoutes.approve,
  "sign-hex": frontendRoutes.signHex,
  dashboard: frontendRoutes.dashboard,
  connectMetamask: frontendRoutes.connectMetamask,
  swap: frontendRoutes.swap,
};

const dashboardTabs = [
  {
    id: "asset",
    title: "Assets",
  },
  {
    id: "activity",
    title: "Activity",
  },
];

export const Dashboard = ({ history, accDetails, accountsData }) => {
  const [selectedTab, setSelectedTab] = useState(dashboardTabs[0].id);

  const [tokenDetail, setTokenDetail] = useState({});

  const [transactionDetail, setTransactionDetail] = useState({});
  const [transactionList, setTransactionList] = useState({});

  const [scrollMessage, setScrollMessage] = useState("");
  const [showScrollUp, setShowScrollUp] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState(activitiesFilters[0]);

  const [isHostConnected, setIsHostConnected] = useState(false);
  const [connectedHost, setConnectedHost] = useState("");
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [hostDetails, setHostDetails] = useState({});
  const [extensionPage, setExtensionPage] = useState(false);

  useEffect(() => {
    if (isEmpty(accDetails)) history.push("/login");
    const windowData = get(window, "custom_data", {});
    const forward = get(window, "shouldForward", false);

    if (!isEmpty(windowData) && forward) {
      window.shouldForward = false;
      history.push(routeByType[get(windowData, "type", "")]);
    }
    setTransactionList(get(accDetails, "transactionData", {}));
  }, [history, accDetails]);

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
                const connectedAcc = [];
                accountsData.forEach((eachAccount) => {
                  get(eachAccount, "approvedHosts", []).find(
                    (host) => host === url.hostname
                  ) &&
                    connectedAcc.push({
                      accountId: get(eachAccount, "accountId", ""),
                      alias: get(eachAccount, "alias", ""),
                    });
                  connectedAcc.find(
                    (acc) => get(acc, "accountId", "") === accDetails.accountId
                  ) && setIsHostConnected(true);
                });

                setConnectedAccounts(connectedAcc);
                setConnectedHost(url.hostname);
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
  }, [accountsData, accDetails, connectedAccounts]);

  useEffect(() => {
    const page = document.getElementById("dashboardPage");
    page.addEventListener("scroll", handleScroll);

    return () => page.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = async () => {
    const page = document.getElementById("dashboardPage");

    if (page.scrollTop > 200) setShowScrollUp(true);
    else setShowScrollUp(false);

    if (
      get(transactionList, "size") === get(transactionList, "totalCount") &&
      !isEmpty(get(transactionList, "data", []))
    ) {
      setScrollMessage("End of transactions");
    }

    if (
      page.scrollTop === page.scrollHeight - page.offsetHeight &&
      selectedTab === dashboardTabs[1].id &&
      get(transactionList, "size") !== get(transactionList, "totalCount") &&
      isEmpty(scrollMessage)
    ) {
      setScrollMessage("Loading...");

      const transactionData = await getTransactionData(selectedFilter);

      setTransactionList(transactionData);
      setScrollMessage("");
    }
  };

  const onTabSwitch = (tabId) => {
    setSelectedTab(tabId);
    setSelectedFilter(activitiesFilters[0]);
    setTransactionList(get(accDetails, "transactionData", {}));
  };

  const onChangeActivitiesFilter = async (id) => {
    setScrollMessage("Loading...");
    setTransactionList({});

    const sf = activitiesFilters.find((k) => k.id === id);
    setSelectedFilter(sf);
    let transactionData;
    if (sf.id !== "swaps") {
      transactionData = await getTransactionData(sf);
    } else {
      transactionData = await getData(backendRoutes.ethTransaction + "?", {
        accountId: get(accDetails, "accountId", "N/A"),
      });
      transactionData.type = "eth_transfer";
    }
    setTransactionList(transactionData);
    setScrollMessage("");
  };

  const getTransactionData = async (sf) => {
    const accountId = get(accDetails, "accountId", "");
    const { hexTokenId } = getKeysByNetwork({
      network: get(accDetails, "network", ""),
    });

    const filterParams = get(sf, "params", {});
    let params = filterParams.hasOwnProperty("query")
      ? { ...filterParams, query: accountId }
      : get(sf, "params", {});

    params = filterParams.hasOwnProperty("accountId")
      ? { ...filterParams, accountId }
      : get(sf, "params", {});

    const { data: transactionData } = await postData(
      backendRoutes.mirrorNodeData,
      {
        url: get(sf, "route", "")
          .replace("{accountId}", accountId)
          .replace("{tokenId}", hexTokenId),
        network: get(accDetails, "network", "testnet"),
        params: {
          ...defaultQueryParams,
          ...params,
          size: get(transactionList, "size", 0) + 10,
          mirrorNodeType: mirrorNodeType[1],
        }
      }
    );
    
    return transactionData;
  };

  const setConnectedHostDetails = () => {
    setHostDetails({
      host: connectedHost,
      accounts: connectedAccounts,
      activeAccount: {
        accountId: get(accDetails, "accountId", ""),
        alias: get(accDetails, "alias", ""),
        connected: isHostConnected,
      },
    });
  };

  const removeHost = async (account) => {
    const accountDetails = accountsData.find(
      (i) => i.accountId === account.accountId
    );
    const updateHosts = [];
    get(accDetails, "approvedHosts", []).forEach((host) => {
      if (!connectedHost.includes(host)) {
        updateHosts.push(host);
      }
    });
    publishToBrowser({
      message: { type: "onAccount", accountId: "", network: "" },
    });
    updateHostDetails(accDetails, updateHostDetails);
    updateHostDetailsInSync(accountDetails, updateHostDetails);
    setStateAccountDetails({
      ...accDetails,
      approvedHosts: updateHosts,
    });
  };

  const onClickSwap = () => {
    if (get(window, "isNewWindow", false)) history.push(frontendRoutes.swap);
    else
      chrome.runtime.sendMessage({
        type: "swap",
        inPage: true,
      });
  };

  return (
    <div
      id="dashboardPage"
      className="dashboardPage headerFixed scroll-content"
    >
      <div className="hexHeaderSection">
        <div className="dashboardTitle text-center">
          <h1 className="mb-0">
            <span className="fw-200 mr-2">Account ID</span>
            {get(accDetails, "accountId", "0.0.0")}
          </h1>
          <p className="mt-2 text-capitalize">
            {get(accDetails, "alias", "No Name")}
          </p>
          {!extensionPage ? (
            <Button
              className="btn-siteSignal"
              onClick={() => setConnectedHostDetails()}
            >
              <span
                className={`mr-2 site-${
                  isHostConnected ? "active" : "inactive"
                }`}
              ></span>
              {isHostConnected ? "Connected" : "Not Connected"}
            </Button>
          ) : null}
          {/* Uncomment Public Key if needed
            <p className="mt-2 mb-0 cursor-pointer d-flex justify-content-center align-items-center">
              <span>{truncate(get(accDetails, "publicKey", "N/A"))}</span>
              <Copy text={get(accDetails, "publicKey", "N/A")} />
            </p> 
          */}
          <p
            className="cursor-pointer mt-2 mb-0 d-flex align-items-center justify-content-center"
            onClick={() =>
              window.open(
                `${
                  getKeysByNetwork({
                    network: get(accDetails, "network", ""),
                  }).transactionHistoryHost
                }/hedera/search?q=${get(accDetails, "accountId", "")}`,
                "_blank"
              )
            }
          >
            Transaction history{" "}
            <span className="ml-1 icon icon-link iconXS-12 dark-mode-img" />
          </p>
        </div>
      </div>

      <div className="hexContentSection d-flex align-items-center flex-column">
        <div className="borderImageLogo borderImageLogo-light d-flex align-items-center justify-content-center">
          <div className="logo-image-text">ℏ</div>
        </div>
        <div className="text-center mt-4 mb-1">
          <h3 className="mb-0 hexContentBalance">
            {get(accDetails, "balance", 0)}
          </h3>
          <p className="mt-1 mb-0 hexContentUsd">
            &#8776; {get(accDetails, "balanceInUSD", 0).toFixed(2)} $
          </p>
        </div>
        <div className="text-center w-100 mt-4">
          <Link to={frontendRoutes.token}>
            <Button className="btn-large btn-light-outline btn-fixed-width">
              TOKEN
            </Button>
          </Link>
          <Link to={frontendRoutes.sendBatch}>
            <Button
              id="send-button"
              className="btn-large btn-light-outline btn-fixed-width mx-3"
            >
              SEND
            </Button>
          </Link>
          <Button
            className="btn-large btn-light-outline btn-fixed-width"
            onClick={onClickSwap}
          >
            SWAP
          </Button>
        </div>
      </div>

      <div className="hexAssetSection">
        <div className="hexAssetSection d-flex align-items-center">
          {dashboardTabs.map((tab) => (
            <h3
              key={get(tab, "id", "")}
              className={`mb-0 text-center w-50 hexAssetTitle ${
                selectedTab === get(tab, "id", "") && "active"
              }`}
              onClick={() => onTabSwitch(get(tab, "id", ""))}
            >
              {get(tab, "title", "")}
            </h3>
          ))}
        </div>

        {selectedTab === dashboardTabs[0].id && (
          <Assets
            accDetails={accDetails}
            setTokenDetail={setTokenDetail}
            accountsData={accountsData}
          />
        )}

        {selectedTab === dashboardTabs[1].id && (
          <Activities
            accountId={get(accDetails, "accountId", "")}
            selectedFilter={selectedFilter}
            transactionList={transactionList}
            onChangeActivitiesFilter={onChangeActivitiesFilter}
            setTransactionDetail={setTransactionDetail}
            scrollMessage={scrollMessage}
            showScrollUp={showScrollUp}
          />
        )}
      </div>

      <ModalTransactionDetail
        transactionDetail={transactionDetail}
        handleClose={() => setTransactionDetail({})}
      />

      <ModalTokenDetail
        tokenDetail={tokenDetail}
        network={get(accDetails, "network", "")}
        handleClose={() => setTokenDetail({})}
      />
      <ModalHostDetail
        hostDetail={hostDetails}
        onRemoveHost={removeHost}
        handleClose={() => setHostDetails({})}
      />
    </div>
  );
};

export default Dashboard;
