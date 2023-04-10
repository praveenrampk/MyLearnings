import React, { useEffect, useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { store, setStateLoading, setStateAccountDetails } from "./store";
import { isEmpty, get } from "lodash";
import {
  getDataFromChromeSyncStorage,
  getDataFromChromeLocalStorage,
} from "./service/storage";
import { frontendRoutes } from "./utils/routes";

import CreateWallet from "./containers/CreateWallet";
import Home from "./containers/Home";
import Dashboard from "./containers/Dashboard";
import ImportWallet from "./containers/ImportWallet";
import Login from "./containers/Login";
import TokenOperations from "./containers/TokenOperations";
import Swap from "./containers/Swap";
import HiddenTokens from "./containers/HiddenTokens";
import Export from "./containers/Export";
import ConnectHardwareWallet from "./containers/ConnectHardwareWallet";
import ConnectMetamask from "./containers/ConnectMetamask";
import Approve from "./containers/Approve";
import SendBatch from "./containers/Send";

import FullPageAlert from "./components/FullPageAlert";
import Loader from "./components/Loader";
import ComingSoon from "./components/ComingSoon";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.scss";
import Arbitrary from "./containers/Arbitrary";

const routeByType = {
  "create-wallet": frontendRoutes.createWallet,
  "hardware-wallet": frontendRoutes.hardwareWallet,
};

function App({ history }) {
  const [loading, setLoading] = useState(false);

  const [showProgressBar, setShowProgressBar] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);

  const [accDetails, setAccountDetails] = useState({});
  const [accountsData, setAccountsData] = useState([]);
  const [alertData, setAlertData] = useState({});
  const [isTriggered, setIsTriggered] = useState(false);
  const [isTransaction, setIsTransaction] = useState(false);

  store.onUpdate(async (state) => {
    const load = get(state, "loading", false);
    setLoading(load);

    const showProgress = get(state, "showProgressBar", false);
    setShowProgressBar(showProgress);

    const alert = get(state, "alertData", {});
    setAlertData(alert);

    const transaction = get(state, "transaction", false);
    setIsTransaction(transaction);

    const accountDetails = get(state, "accDetails", {});
    setAccountDetails(accountDetails);
  });

  useEffect(() => {
    async function fetchData() {
      setStateLoading(true);

      const { accountDetails } = await getDataFromChromeLocalStorage(
        "accountDetails"
      );

      const syncData = await getDataFromChromeSyncStorage(null);
      if (get(syncData, "darkMode", false))
        document.body.classList.add("dark-mode");

      const accountsData = Object.keys(syncData)
        .filter((k) => k.includes("."))
        .map((k) => {
          const d = JSON.parse(syncData[k]);
          return { ...d };
        });
      setAccountsData(accountsData);

      const routeType = get(window, "custom_data.type", "");

      if (["create-wallet", "hardware-wallet"].includes(routeType)) {
        history.push(routeByType[routeType]);
      } else if (!isEmpty(accountDetails)) {
        setStateAccountDetails(JSON.parse(accountDetails));
        history.push(frontendRoutes.dashboard);
      } else if (!isEmpty(syncData)) history.push(frontendRoutes.login);

      setIsTriggered(get(window, "custom_data.trigger", false));

      setStateLoading(false);
    }
    fetchData();
  }, [history]);

  useEffect(() => {
    async function setAccountData() {
      const syncData = await getDataFromChromeSyncStorage(null);
      const accsData = Object.keys(syncData)
        .filter((k) => k.includes("."))
        .map((k) => {
          const d = JSON.parse(syncData[k]);
          return {
            ...d,
          };
        });

      setAccountsData(accsData);
    }
    setAccountData();
  }, [accDetails]);

  return (
    <div className="app">
      {!isEmpty(accDetails) && (
        <Header history={history} accDetails={accDetails} />
      )}

      <Switch>
        {loading && (
          <Loader
            showProgressBar={showProgressBar}
            percentage={progressPercent}
          />
        )}
        {!loading && !isEmpty(alertData) && (
          <FullPageAlert
            history={history}
            isTransaction={isTransaction}
            {...alertData}
            trigger={isTriggered}
            fullHeight={isEmpty(accDetails)}
          />
        )}

        <Route
          exact
          path={frontendRoutes.home}
          component={() => <Home history={history} />}
        />
        <Route
          exact
          path={frontendRoutes.dashboard}
          component={() => (
            <Dashboard
              history={history}
              accDetails={accDetails}
              accountsData={accountsData}
            />
          )}
        />
        <Route
          exact
          path={frontendRoutes.token}
          component={() => (
            <TokenOperations
              accDetails={accDetails}
              trigger={isTriggered}
              setProgressPercent={setProgressPercent}
            />
          )}
        />
        <Route
          exact
          path={frontendRoutes.import}
          component={() => <ImportWallet />}
        />
        <Route
          exact
          path={frontendRoutes.createWallet}
          component={() => <CreateWallet />}
        />
        <Route
          exact
          path={frontendRoutes.swap}
          component={() => (
            <Swap
              history={history}
              accDetails={accDetails}
              trigger={isTriggered}
            />
          )}
        />
        <Route
          exact
          path={frontendRoutes.login}
          component={() => (
            <Login history={history} accountsData={accountsData} />
          )}
        />

        <Route
          exact
          path={frontendRoutes.hiddenTokens}
          component={() => (
            <HiddenTokens accountsData={accountsData} accDetails={accDetails} />
          )}
        />

        <Route
          exact
          path={frontendRoutes.hardwareWallet}
          component={() => <ConnectHardwareWallet history={history} />}
        />

        <Route
          exact
          path={frontendRoutes.connectMetamask}
          component={() => <ConnectMetamask />}
        />

        <Route
          exact
          path={frontendRoutes.comingSoon}
          component={() => <ComingSoon history={history} />}
        />

        <Route
          exact
          path={frontendRoutes.export}
          component={() => <Export accDetails={accDetails} />}
        />
        <Route
          exact
          path={frontendRoutes.approve}
          component={() => (
            <Approve accountsData={accountsData} accDetails={accDetails} />
          )}
        />
        <Route
          exact
          path={frontendRoutes.sendBatch}
          component={() => <SendBatch accDetails={accDetails} />}
        />
        <Route
          exact
          path={frontendRoutes.signHex}
          component={() => <Arbitrary accDetails={accDetails} />}
        />
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
