import { get } from "lodash";

import { getAccountInfo } from "./info";
import { lock } from "../crypto";
import {
  getStatePublicKey,
  setStateAlertData,
  setStateLoading,
} from "../../store";
import { postData, getErrorMessage, getBackendUrl } from "../../utils/helpers";
import { backendRoutes } from "../../utils/routes";

export const generateQRcode = async ({ email, method }) => {
  try {
    const response = await postData(backendRoutes.tfa, {
      email,
      method,
    });

    if (get(response, "code", 200) !== 200) {
      throw new Error(get(response, "message", ""));
    }

    return get(response, "data", {});
  } catch (err) {
    console.log("Error in GenerateQRcode", err);
    setStateAlertData({
      title: "Create New Account",
      type: "error",
      message: getErrorMessage(err.message),
    });
  }
};

export const createCaptcha = async () => {
  try {
    let response = await fetch(
      `${getBackendUrl()}${backendRoutes.createCaptcha}`,
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await response.json();

    if (get(response, "code", 200) !== 200) {
      throw new Error(get(response, "message", ""));
    }
    return get(response, "data", {});
  } catch (err) {
    console.log("Error in Captcha", err);
    setStateAlertData({
      title: "Create New Account",
      type: "error",
      message: getErrorMessage(err.message),
    });
  }
};

export const verifyCaptcha = async (data) => {
  try {
    const response = await postData(backendRoutes.verifyCaptcha, data);
    if (get(response, "code", 200) !== 200) {
      throw new Error(get(response, "message", ""));
    }
    return get(response, "data", {});
  } catch (err) {
    console.log("Error in Captcha", err);
    setStateAlertData({
      title: "Create New Account",
      type: "error",
      message: getErrorMessage(err.message),
    });
  }
};

export const createNewAccount = async (data) => {
  try {
    setStateLoading(true);

    const walletType =
      get(data, "walletType", "") !== "hardware"
        ? "software"
        : get(data, "walletType", "");

    const response = await postData(backendRoutes.accountCreate, {
      network: get(data, "network", ""),
      publicKey: getStatePublicKey(),
      walletType,
    });

    if (get(response, "code", 200) !== 200) {
      throw new Error(get(response, "message", ""));
    }

    const accountId = get(response, "data.accountId", "");
    const privateKey = get(response, "data.privateKey", "");

    await lock({
      ...data,
      secretKey: privateKey,
      accountId,
      walletType,
    });
    await getAccountInfo({
      ...data,
      accountId,
      privateKey,
      walletType,
    });

    setStateAlertData({
      page: "createdWallet",
      privateKey,
      accountId,
      walletType,
      type: get(response, "status", ""),
      mnemonic: get(response, "data.mnemonic", ""),
      message: get(response, "data.message", ""),
      publicKey: get(response, "data.publicKey"),
    });

    setStateLoading(false);
  } catch (err) {
    console.log("Error in create new account", err);
    setStateAlertData({
      title: "Create Wallet",
      type: "error",
      message: getErrorMessage(err.message),
    });
    setStateLoading(false);
  }
};
