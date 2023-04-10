import MetaMaskOnboarding from "@metamask/onboarding";
import createMetaMaskProvider from "metamask-extension-provider";

import { get, isEmpty } from "lodash";

import { setStateAlertData } from "../store";

export const startOnboarding = () => {
  const onBoarding = new MetaMaskOnboarding();
  onBoarding.startOnboarding();
};

export const connectMetamask = async () => {
  try {
    const provider = createMetaMaskProvider();
    window.provider = provider;

    const accounts = await provider.request({ method: "eth_requestAccounts" });

    return {
      accounts,
      chainId: provider.chainId,
      provider,
    };
  } catch (err) {
    console.log("Error in connect Metamask", err);
    setStateAlertData({
      title: "Connect Metamask",
      type: "error",
      message: get(err, "message", ""),
    });
  }
};

export const isMetamaskConnected = async () => {
  const provider = createMetaMaskProvider();
  window.provider = provider;
  const accounts = await provider.request({ method: "eth_accounts" });

  return !isEmpty(accounts);
};
