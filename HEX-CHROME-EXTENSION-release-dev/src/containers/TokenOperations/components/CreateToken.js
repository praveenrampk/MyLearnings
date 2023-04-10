/* global chrome */
import React, { useEffect, useState } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { get, isEmpty, capitalize, isNull, isUndefined, map } from "lodash";
import BigNumber from "bignumber.js";

import { createNFTToken, tokenCreate } from "../../../service/token";
import { tokenTypes, tokenCreatingFee, nftStorageTypes } from "../../../utils/constants";
import { fileToBase64, sendCancelledResponse } from "../../../utils/helpers";
import { frontendRoutes } from "../../../utils/routes";

import Checkbox from "../../../components/Checkbox";
import ModalFeeDetail from "../../ModalFeeDetail";
import DangerAlert from "../../../components/DangerAlert";

export const CreateToken = ({ accDetails, setProgressPercent, trigger }) => {
  const [tokenType, setTokenType] = useState(tokenTypes[0]);
  const [nftStorageType, setNftStorageType] = useState(nftStorageTypes[0]);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimal, setDecimal] = useState("");
  const [initialSupply, setInitialSupply] = useState("");
  const [admin, setAdmin] = useState(true);
  const [kyc, setKyc] = useState(false);
  const [wipe, setWipe] = useState(true);
  const [freeze, setFreeze] = useState(true);
  const [supply, setSupply] = useState(true);
  const [defaultFreeze, setDefaultFreeze] = useState(false);
  const [nftTypeDisabled, setNftTypeDisabled] = useState(false);

  const [templateName, setTemplateName] = useState("");
  const [properties, setProperties] = useState([]);
  const [propertyToAdd, setPropertyToAdd] = useState([]);
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState("");

  const [feeDetails, setFeeDetails] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const windowData = get(window, "custom_data", "");
    if (
      get(window, "isNewWindow", false) &&
      get(windowData, "type", "") === "token-create"
    )
      setTokenType(
        tokenTypes.find((data) => data.id === get(windowData, "tokenType", {}))
      );
  }, []);

  useEffect(() => {
    const windowData = get(window, "custom_data", "");
    if (get(windowData, "tokenType", "") === "ft") {
      setName(get(windowData, "tokenName", ""));
      setSymbol(get(windowData, "tokenSymbol", ""));
      setDecimal(parseInt(get(windowData, "decimal", "")));
      setInitialSupply(new BigNumber(get(windowData, "initialSupply", 0)));

      const options = get(windowData, "options", {});
      Object.keys(options).forEach((option) => {
        switch (option) {
          case "admin":
            setAdmin(options[option]);
            break;
          case "kyc":
            setKyc(options[option]);
            break;
          case "wipe":
            setWipe(options[option]);
            break;
          case "freeze":
            setFreeze(options[option]);
            break;
          case "changeSupply":
            setSupply(options[option]);
            break;
          case "defaultFreeze":
            setDefaultFreeze(options[option]);
            break;
          default:
        }
      });
    } else if (get(windowData, "tokenType", "") === "nft") {
      setName(get(windowData, "tokenName", ""));
      setTemplateName(get(windowData, "templateName", ""));
      setProperties(get(windowData, "properties", []));
    }
  }, [tokenType]);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    let fd = [];
    if (isEmpty(name)) {
      setError("Name cannot not be Empty");
      return;
    }

    switch (get(tokenType, "id", "")) {
      case tokenTypes[0].id:
        if (isEmpty(symbol)) {
          setError("Symbol cannot not be Empty");
          return;
        }

        if (isEmpty(decimal) && decimal < 0) {
          setError("Decimals cannot not be Empty");
          return;
        }

        if (isEmpty(initialSupply)) {
          setError("InitialSupply cannot not be Empty");
          return;
        }

        fd = [
          {
            label: "Symbol",
            value: symbol,
          },
          {
            label: "Decimals",
            value: decimal,
          },
          {
            label: "Initial Supply",
            value: isEmpty(initialSupply) ? "" : initialSupply.toNumber(),
          },
        ];
        break;
      case tokenTypes[1].id:
        if (isEmpty(templateName)) {
          setError("Template Name cannot not be Empty");
          return;
        }

        fd = [
          {
            label: "Template Name",
            value: templateName,
          },
          ...map(properties, (p) => ({
            label: p.name,
            value: p.value,
          })),
        ];
        break;
      default:
    }

    setFeeDetails([
      {
        label: "Payer",
        value: get(accDetails, "accountId", ""),
      },
      {
        label: "Type",
        value: get(tokenType, "label", ""),
      },
      {
        label: "Token Name",
        value: name,
      },
      ...fd,
      {
        label: "Trading Fee",
        value: `${(tokenCreatingFee / 100000).toString()} ${
          get(accDetails, "walletType", "") === "hardware" ? "Hbar" : "HEX"
          }`,
      },
    ]);
  };

  const onConfirm = async () => {
    switch (get(tokenType, "id", "")) {
      case tokenTypes[0].id:
        await tokenCreate({
          name,
          symbol,
          decimal,
          initialSupply: initialSupply.toNumber(),
          admin,
          kyc,
          wipe,
          freeze,
          supply,
          defaultFreeze,
        });
        break;
      case tokenTypes[1].id:
        await createNFTToken({
          name,
          fileData: {
            name,
            templateName,
            properties,
            file: fileURL,
          },
          setProgressPercent,
          storageType: nftStorageType.id
        });
        break;
      default:
    }
  };

  const onAddProperty = () => {
    const split = propertyToAdd.split("=");
    setProperties([
      ...properties,
      {
        name: capitalize(split[0]),
        value: capitalize(split[1]),
      },
    ]);
    setPropertyToAdd("");
  };

  const onRemoveProperty = (obj) => {
    setProperties(properties.filter((p) => p.name !== obj.name));
  };

  const onChangePropertyValue = (obj) => {
    const newVal = properties.map((p) => (p.name === obj.name ? obj : p));
    setProperties(newVal);
  };

  const onChangeTokenType = (key) => {
    if (key === tokenTypes[1].id && !get(window, "isNewWindow", false)) {
      chrome.runtime.sendMessage({
        tokenType: tokenTypes[1].id,
        type: "token-create",
      });
    } else {
      setTokenType(tokenTypes.find((i) => i.id === key));
    }
  };

  const onChangeNftStorageType = (key) => {
    setNftStorageType(nftStorageTypes.find((i) => i.id === key));
  };

  const onChangeImage = async (e) => {
    const file = e.target.files[0];
    if (isNull(file) || isUndefined(file)) return;
    if (file.size >= 100000) {
      setNftStorageType(nftStorageTypes[1]);
      setNftTypeDisabled(true);
     }
    const dataURL = await fileToBase64(file);
    setFileURL(dataURL);
    setFile(file);
  };

  return (
    <>
      <Form className="d-flex flex-column h-100" onSubmit={onFormSubmit}>
        <div className="flex-1 d-flex flex-column ">
          <Form.Group className="mb-3">
            <Dropdown
              className="networkDropdown inputDropdown"
              onSelect={(e) => onChangeTokenType(e)}
            >
              <Dropdown.Toggle id="sample-dropdown" className="dropdown-basic">
                {get(tokenType, "label", "")}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {tokenTypes.map((t) => (
                  <Dropdown.Item
                    key={get(t, "id", "")}
                    eventKey={get(t, "id", "")}
                  >
                    {get(t, "label", "")}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            {get(tokenType, "id", "") === tokenTypes[1].id && (
              <p className="form-lable-small">
                NFTs will be non-fractional with a fixed supply of 1.
              </p>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => {
                if (error) setError("");
                setName(e.target.value);
              }}
            />
            <Form.Label className="bold" htmlFor="name">
              Name
            </Form.Label>
            <span className="form-lable-small mt-1">
              Maximum of 100 characters. The token name is not unique.
            </span>
          </Form.Group>

          {get(tokenType, "id", "") === tokenTypes[0].id && (
            <>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  value={symbol}
                  onChange={(e) => {
                    if (error) setError("");
                    setSymbol(e.target.value);
                  }}
                />
                <Form.Label className="bold" htmlFor="name">
                  Symbol
                </Form.Label>
                <span className="form-lable-small mt-1">
                  Maximum of 100 characters. The token symbol is not unique.
                </span>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={decimal}
                  onChange={(e) => {
                    if (error) setError("");
                    setDecimal(
                      e.target.value === "0" || e.target.value
                        ? parseInt(e.target.value)
                        : ""
                    );
                  }}
                />
                <Form.Label className="bold" htmlFor="name">
                  Decimal
                </Form.Label>
                <span className="form-lable-small mt-1">
                  The number of decimal places a token is divisible by.
                </span>
              </Form.Group>

              <Form.Group className="m-b-32">
                <Form.Control
                  type="text"
                  value={initialSupply}
                  onChange={(e) => {
                    if (error) setError("");
                    setInitialSupply(
                      e.target.value ? new BigNumber(e.target.value) : ""
                    );
                  }}
                />
                <Form.Label className="bold" htmlFor="name">
                  Initial Supply
                </Form.Label>
                <span className="form-lable-small mt-1">
                  Specifies the initial supply of tokens to be put in
                  circulation.
                </span>
              </Form.Group>

              <Form.Group className="checkbox-form mb-3">
                <Checkbox
                  title={"Enable Admin"}
                  message={
                    "If not selected, the token can be perceived as immutable."
                  }
                  value={admin}
                  onChange={(e) => setAdmin(e.target.checked)}
                />
              </Form.Group>

              <Form.Group className="checkbox-form mb-3">
                <Checkbox
                  title={"Enable KYC"}
                  message={
                    "If not selected, the KYC grant and revoke operations are not possible."
                  }
                  value={kyc}
                  onChange={(e) => setKyc(e.target.checked)}
                />
              </Form.Group>

              <Form.Group className="checkbox-form mb-3">
                <Checkbox
                  title={"Enable Wipe"}
                  message={"If not selected, wipe is not possible."}
                  value={wipe}
                  onChange={(e) => setWipe(e.target.checked)}
                />
              </Form.Group>

              <Form.Group className="checkbox-form mb-3">
                <Checkbox
                  title={"Enable Freeze"}
                  message={"If not selected, freezing is not possible."}
                  value={freeze}
                  onChange={(e) => setFreeze(e.target.checked)}
                />
              </Form.Group>

              <Form.Group className="checkbox-form mb-3">
                <Checkbox
                  title={"Change Supply"}
                  message={
                    "If not selected, minting and burning tokens are not possible."
                  }
                  value={supply}
                  onChange={(e) => setSupply(e.target.checked)}
                />
              </Form.Group>

              <Form.Group className="checkbox-form mb-4">
                <Checkbox
                  title={"Default Freeze"}
                  message={
                    "If selected, an account must be unfrozen before it can receive the token."
                  }
                  value={defaultFreeze}
                  onChange={(e) => setDefaultFreeze(e.target.checked)}
                />
              </Form.Group>
            </>
          )}

          {get(tokenType, "id", "") === tokenTypes[1].id && (
            <>
              <Form.Group className="mb-4">
                <Dropdown
                  className="networkDropdown inputDropdown"
                  onSelect={(e) => onChangeNftStorageType(e)}
                >
                  <Dropdown.Toggle id="sample-dropdown" className="dropdown-basic" disabled={nftTypeDisabled}>
                    {get(nftStorageType, "label", "")}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {nftStorageTypes.map((t) => (
                      <Dropdown.Item
                        key={get(t, "id", "")}
                        eventKey={get(t, "id", "")}
                      >
                        {get(t, "label", "")}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <p className="form-lable-small pt-1">
                  {get(nftStorageType, "description", "")}
                </p>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.File
                  label={
                    <span>
                      {isNull(file) || isUndefined(file)
                        ? "Upload file"
                        : get(file, "name", "No Name")}
                    </span>
                  }
                  id="exampleFormControlFile1"
                  onChange={(e) => onChangeImage(e)}
                  multiple={false}
                  accept="audio/*,video/*,image/*"
                />
                {!isNull(file) && !isUndefined(file) && (
                  <div
                    className="icon iconS-26 icon-minus add-remove-icon"
                    onClick={() => {
                      setFile(null);
                      setFileURL("");
                    }}
                  ></div>
                )}
              </Form.Group>

              {!isEmpty(fileURL) && (
                <div className="preview-file mb-3">
                  {get(file, "type", "").includes("image") && (
                    <img alt="preview pic" src={fileURL} />
                  )}

                  {get(file, "type", "").includes("video") && (
                    <video controls>
                      <source src={fileURL} type={get(file, "type", "")} />
                      Your browser does not support HTML5 video.
                    </video>
                  )}
                </div>
              )}

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  value={templateName}
                  onChange={(e) => {
                    if (error) setError("");
                    setTemplateName(e.target.value);
                  }}
                />
                <Form.Label className="bold" htmlFor="templateName">
                  Template Name
                </Form.Label>
                <span className="form-lable-small mt-1">
                  Maximum of 100 characters. The template name is not unique.
                </span>
              </Form.Group>
              <div className="mb-3">
                <b>Properties</b>
                {!isEmpty(properties) &&
                  properties.map((p, index) => (
                    <Form.Group
                      key={get(p, "name", "")}
                      className={`mb-4 ${!index && "mt-3"}`}
                    >
                      <Form.Control
                        type="text"
                        value={get(p, "value", "")}
                        onChange={(e) =>
                          onChangePropertyValue({
                            ...p,
                            value: e.target.value,
                          })
                        }
                      />
                      <Form.Label className="bold" htmlFor="text">
                        {get(p, "name", "")}
                      </Form.Label>
                      <div
                        className="icon iconS-26 icon-minus add-remove-icon"
                        onClick={() => onRemoveProperty(p)}
                      ></div>
                    </Form.Group>
                  ))}
              </div>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  value={propertyToAdd}
                  onChange={(e) => setPropertyToAdd(e.target.value)}
                />
                <Form.Label className="bold" htmlFor="name">
                  Add Property
                </Form.Label>
                <span className="form-lable-small mt-1">Eg: name=tommy</span>
                <div
                  className="icon iconS-26 icon-plus add-remove-icon"
                  onClick={onAddProperty}
                ></div>
              </Form.Group>
            </>
          )}
          {!isEmpty(error) && <DangerAlert message={error} />}
        </div>

        <div className="button-section mb-4">
          <Button
            className="btn-exlarge btn btn-primary btn-primary-outline btn-block mb-3"
            variant="primary"
            type="submit"
            disabled={!isEmpty(error)}
          >
            Create
          </Button>
          {trigger ? (
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

      <ModalFeeDetail
        details={feeDetails}
        handleClose={() => setFeeDetails([])}
        onConfirm={onConfirm}
      />
    </>
  );
};

export default CreateToken;
