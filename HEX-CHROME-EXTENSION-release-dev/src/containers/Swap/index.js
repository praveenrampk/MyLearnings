import React, { useEffect, useState } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { get, isEmpty } from "lodash";

import { swap } from "../../service/transfer";
import { frontendRoutes } from "../../utils/routes";
import { getKeysByNetwork, sendCancelledResponse } from "../../utils/helpers";
import { getPrices } from "../../service/prices";
import { connectMetamask, isMetamaskConnected } from "../../service/metamask";

import ToggleSwitch from "../../components/ToggleSwitch";
import InfoAlert from "../../components/InfoAlert";
import DangerAlert from "../../components/DangerAlert";
import Loader from "../../components/Loader";
import CountDownClock from "../../components/CountDownClock";

const toList = [
  {
    id: "hex",
    label: "HEX",
    symbol: "HEX",
  },
  {
    id: "hbar",
    label: "HBAR",
    symbol: "HBAR",
  },
];

const fromList = [
  ...toList,
  {
    id: "eth",
    label: "Ethereum",
    symbol: "ETH",
  },
  {
    id: "usdc",
    label: "USDC",
    symbol: "USDC",
  },
];

export const Swap = ({ history, accDetails, trigger }) => {
  const [hexDetails, setHexDetails] = useState({});
  const [usdcDetails, setUsdcDetails] = useState({});
  const [amount, setAmount] = useState("");
  const [exchangeAmount, setExchangeAmount] = useState(0);

  const [memo, setMemo] = useState("");
  const [seeMemo, setSeeMemo] = useState(false);

  const [from, setFrom] = useState(fromList[1]);
  const [to, setTo] = useState(fromList[0]);

  const [prices, setPrices] = useState({});

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [inPage, setInpage] = useState(true);

  useEffect(() => {
    let mountedComp = true;
    setLoading(true);
    getPrices().then((data) => {
      if (mountedComp) {
        setPrices(data);
        setLoading(false);
      }
    });

    return () => {
      mountedComp = false;
    };
  }, []);

  useEffect(() => {
    const windowData = get(window, "custom_data", "");

    const { hexTokenId, usdcTokenId } = getKeysByNetwork({
      network: get(accDetails, "network", ""),
    });
    const hexToken = get(accDetails, "tokenData", []).find((t) => t.id === hexTokenId);
    setHexDetails(hexToken);

    const usdcToken = get(accDetails, "tokenData", []).find((t) => t.id === usdcTokenId);
    setUsdcDetails(usdcToken);

    setInpage(get(windowData, "inPage", false));
    if (
      get(window, "isNewWindow", false) &&
      get(windowData, "type", "") === "hbar-swap"
    ) {
      setFrom(
        fromList.find(
          (fromCrypto) =>
            fromCrypto.id === get(windowData, "cryptoFrom", fromList[1].id)
        )
      );
      setTo(
        toList.find(
          (toCrypto) =>
            toCrypto.id === get(windowData, "cryptoTo", fromList[0].id)
        )
      );
      setAmount(get(windowData, "amount", ""));
    }
  }, [accDetails]);

  useEffect(() => {
    setExchangeAmount(
      parseFloat(get(prices[from.id], to.id, "") * amount).toFixed(8)
    );
  }, [from, to, amount, prices]);

  const onTimerEnd = async () => {
    setLoading(true);
    const response = await getPrices();
    setPrices(response);
    setLoading(false);
  };

  const onChangeFrom = (e) => {
    if (error) setError("");
    setFrom(fromList.find((i) => i.id === e));
  };

  const onChangeTo = (e) => {
    if (error) setError("");
    setTo(toList.find((i) => i.id === e));
  };

  const onChangeAmount = (e) => {
    if (error) setError("");
    setAmount(e.target.value ? parseFloat(e.target.value) : "");
  };

  const checkMetamaskNetwork = async (chainId) => {
    const isConnected = await !isMetamaskConnected();
    if (isConnected) {
      setError(
        "Metamask is not connnected ! <a href='/connect/metamask'>Click here to Connect.</a>"
      );
      return true;
    }

    let ret = false;
    let isMainnet;

    if (!chainId) {
      const metamaskDetails = await connectMetamask();
      isMainnet = get(metamaskDetails, "chainId", "") === "0x1";

      metamaskDetails.provider.on("chainChanged", async (chainId) => {
        const networkCheck = await checkMetamaskNetwork(chainId);
        if (!networkCheck) setError({});
      });
    } else {
      isMainnet = chainId === "0x1";
    }

    if (get(accDetails, "network", "") === "mainnet" && !isMainnet) {
      setError(
        "Metamask is connected to one of the test networks. Change to continue."
      );
      ret = true;
    }
    if (get(accDetails, "network", "") === "testnet" && isMainnet) {
      setError("Metamask is connected to Mainnet. Change to continue.");
      ret = true;
    }

    return ret;
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    if (get(to, "id", "") === get(from, "id", "")) {
      setError("From and To cannot be the same.");
      return;
    }

    if (amount <= 0) {
      setError("Amount must be a positive integer.");
      return;
    }

    if (
      (get(from, "id", "") === fromList[2].id ||
        get(to, "id", "") === fromList[2].id) &&
      (await checkMetamaskNetwork())
    )
      return;

    await swap({
      amount,
      memo,
      from: get(from, "id", ""),
      to: get(to, "id", ""),
      exchangeAmount,
    });
  };

  return (
    <div className="swap-page headerFixed px-4 scroll-content">
      <div className="d-flex flex-column h-100">
        <div className="text-center my-5">
          <h3 className="page-title">Swap</h3>
        </div>
        <div className="swap-content flex-1">
          <Form className="d-flex flex-column h-100" onSubmit={onFormSubmit}>
            <div className="flex-1">
              {!isEmpty(error) && <DangerAlert message={error} />}

              <InfoAlert>
                Prices change in{" "}
                <CountDownClock
                  countDownInMilliSeconds={300000}
                  onComplete={onTimerEnd}
                />
                <br />
                Kindly check Gas fee before commiting to a transaction.
              </InfoAlert>

              <Form.Group className="mb-4">
                <div className="bold" htmlFor="name">
                  From
                </div>
                <Dropdown className="inputDropdown" onSelect={onChangeFrom}>
                  <Dropdown.Toggle className="dropdown-basic">
                    {isEmpty(from)
                      ? "Select an option"
                      : get(from, "label", "")}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {fromList.map((c) => (
                      <Dropdown.Item
                        key={get(c, "id", "")}
                        eventKey={get(c, "id", "")}
                      >
                        {get(c, "label", "")}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              <Form.Group className="mb-4">
                <div className="bold" htmlFor="name">
                  To
                </div>
                <Dropdown className="inputDropdown" onSelect={onChangeTo}>
                  <Dropdown.Toggle className="dropdown-basic">
                    {isEmpty(to) ? "Select an option" : get(to, "label", "")}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {toList.map((c) => (
                      <Dropdown.Item
                        key={get(c, "id", "")}
                        eventKey={get(c, "id", "")}
                      >
                        {get(c, "label", "")}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  type="number"
                  step="any"
                  value={amount}
                  placeholder={`in ${get(from, "symbol", "")}`}
                  onChange={onChangeAmount}
                />
                <Form.Label className="bold" htmlFor="name">
                  Amount
                </Form.Label>
              </Form.Group>

              {get(from, "id", "") === "hbar" && (
                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    value={get(accDetails, "balance", 0)}
                    readOnly={true}
                  />
                  <Form.Label className="bold" htmlFor="name">
                    HBAR Balance
                  </Form.Label>
                </Form.Group>
              )}

              {get(from, "id", "") === "hex" && (
                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    value={get(hexDetails, "balance", 0)}
                    readOnly={true}
                  />
                  <Form.Label className="bold" htmlFor="name">
                    HEX Balance
                  </Form.Label>
                </Form.Group>
              )}

              {get(from, "id", "") === "usdc" && (
                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    value={get(usdcDetails, "balance", 0)}
                    readOnly={true}
                  />
                  <Form.Label className="bold" htmlFor="name">
                    USDC Balance
                  </Form.Label>
                </Form.Group>
              )}

              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  value={`${exchangeAmount} ${get(to, "symbol", "")}`}
                  readOnly={true}
                />
                <Form.Label className="bold" htmlFor="name">
                  You'll Get
                </Form.Label>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  value={`${get(prices[from.id], to.id, 1)} ${to.symbol}`}
                  readOnly={true}
                />
                <Form.Label className="bold" htmlFor="name">
                  1 {get(from, "symbol", "")} &#8776;
                </Form.Label>
              </Form.Group>

              {seeMemo && (
                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                  />
                  <Form.Label className="bold" htmlFor="name">
                    Memo
                  </Form.Label>
                </Form.Group>
              )}

              <div className="d-flex justify-content-end mb-4">
                <ToggleSwitch
                  label={"Add Memo"}
                  value={seeMemo}
                  onClick={() => setSeeMemo(!seeMemo)}
                />
              </div>
            </div>

            <div className="button-section mb-4">
              <Button
                className="btn-exlarge btn btn-primary btn-primary-outline btn-block mb-3"
                variant="primary"
                disabled={!isEmpty(error)}
                type="submit"
              >
                Swap
              </Button>
              {trigger || inPage ? (
                <Button
                  className="btn-exlarge btn btn-primary btn-primary-outline btn-block mb-3"
                  variant="secondary"
                  onClick={async () => {
                    await sendCancelledResponse();
                    window.close();
                  }}
                >
                  Cancel
                </Button>
              ) : (
                <Link
                  className="btn btn-link primary w-100"
                  variant="secondary"
                  to={frontendRoutes.dashboard}
                >
                  Back
                </Link>
              )}
            </div>
          </Form>
        </div>
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default Swap;
