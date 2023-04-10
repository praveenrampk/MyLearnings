import { Store } from "simple-react-store";

export const store = new Store({});

export const setStateLoading = (loading, showProgressBar = false) =>
  store.updateState((s) => {
    s.loading = loading;
    s.showProgressBar = showProgressBar;
  });

export const setStateAlertData = (alertData, type = "default") => {
  return store.updateState((s) => {
    if (type === "transaction") s.transaction = true;
    s.alertData = alertData;
  });
};

export const setStateAccountDetails = (accDetails) =>
  store.updateState((s) => {
    s.accDetails = accDetails;
  });

export const setStatePublicKey = (publicKey) =>
  store.updateState((s) => {
    s.publicKey = publicKey;
  });

export const getAccDetails = () => store.getState().accDetails;

export const getStatePublicKey = () => store.getState().publicKey;
