/* global chrome */

import { get } from "lodash";

import { getAccountInfo } from "./accounts/info";
import { unlock } from "./crypto";
import { getDataFromChromeSyncStorage } from "./storage";
import {
  setStateAlertData,
  setStateLoading,
  setStateAccountDetails,
} from "../store";
import { getErrorMessage, publishToBrowser } from "../utils/helpers";

export const logIn = async ({ accId, passphrase, network }) => {
  try {
    setStateLoading(true);
    const encryptedData = await getDataFromChromeSyncStorage(null);

    const encrypted = JSON.parse(encryptedData[accId]);
    const decodedObject = await unlock({ passphrase, encrypted });
    const walletType = get(encrypted, "walletType", "software");
    let privateKey = decodedObject;

    if (walletType === "hardware") privateKey = "";

    await getAccountInfo({
      accountId: get(encrypted, "accountId", ""),
      privateKey,
      network,
      passphrase,
      alias: get(encrypted, "alias", ""),
      walletType: walletType,
    });

    setStateLoading(false);
  } catch (err) {
    console.log("Error in accountGetInfo", err);
    setStateAlertData({
      title: "Login",
      type: "error",
      message: getErrorMessage(err.message),
    });
    setStateLoading(false);
  }
};

export const logOut = async () => {
  try {
    setStateLoading(true);
    chrome.storage.local.clear();
    setStateAccountDetails({});
    publishToBrowser({
      message: { type: "onAccount", accountId: "", network: "" },
    });
    setStateLoading(false);
  } catch (err) {
    console.log("Error in logout", err);
    setStateAlertData({
      title: "Log Out",
      type: "error",
      message: getErrorMessage(err.message),
    });
    setStateLoading(false);
  }
};
