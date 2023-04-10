import React, { useState } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { get, isEmpty } from "lodash";
import SliderCaptcha from "@slider-captcha/react";

import {
  createNewAccount,
  createCaptcha,
} from "../../service/accounts/create";

import {
  networkOptions,
} from "../../utils/constants";
import { frontendRoutes } from "../../utils/routes";
import { captchaVerifyURL } from "../../utils/helpers";

/* const infoMessages = [
  `Kindly use emails provided by ${authorizedEmailProviders.toString()}.`,
  "Kindly check your email for Email Confirmation Code. The code will be valid for 5 minutes.",
]; */

export const CreateWallet = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState({});
/*   const [selectedTfa, setSelectedTfa] = useState(tfaMethods[0]);
  const [tfaDetails, setTfaDetails] = useState({});
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState(""); */
  const [isHuman, setIsHuman] = useState(false);
  const [alias, setAlias] = useState("");
  // const [error, setError] = useState("");

  const onBack = () => {
    history.push(frontendRoutes.home);
    /* switch (step) {
      case 0:
        history.push(frontendRoutes.home);
        break;
      default:
        setStep(step - 1);
    } */
  };

  /* const onChangeEmail = (e) => {
    if (error) setError("");
    setEmail(e.target.value);
  };

  const onChangeTfaMethod = (v) => {
    if (error) setError("");
    setSelectedTfa(tfaMethods.find((i) => i.id === v));
  }; 

  const stepZeroSubmitHandler = async () => {
    if (!emailRegex.test(email)) {
      setError("Kindly Enter a valid email");
      return;
    }

    const provider = email.split("@").pop().split(".")[0];
    if (!authorizedEmailProviders.includes(provider)) {
      setError(
        "Kindly use an email from Authorized mail providers listed above."
      );
      return;
    }

    if (isEmpty(selectedTfa)) {
      setError("Kindly select a verification method");
      return;
    }

    const response = await generateQRcode({
      email,
      method: get(selectedTfa, "id", ""),
    });
    setTfaDetails(response);
    setStep(1);
  };*/

  const afterVerification = async (result) => {
    setIsHuman(result ? true : false);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    
    await createNewAccount({
      passphrase: password,
      network: selectedNetwork.id,
      alias: isEmpty(alias) ? "No Name" : alias,
      walletType: get(match, "params.walletType", "software"),
    });
    /* switch (step) {
      case 0:
        await stepZeroSubmitHandler();
        break;
      default:
        await createNewAccount({
          passphrase: password,
          network: selectedNetwork.id,
          alias: isEmpty(alias) ? "No Name" : alias,
          walletType: get(match, "params.walletType", "software"),
        });
    } */
  };

  return (
    <div className="create-wallet-page scroll-content fixedHeight d-flex flex-column p-4">
      <div className="text-center m-b-32">
        <h3 className="page-title text-center">Create Wallet</h3>
      </div>
      <div className="create-wallet-content flex-1">
        <Form className="d-flex flex-column h-100" onSubmit={onFormSubmit}>
          <div className="flex-1">
            {/* <InfoAlert message={infoMessages[step]} /> 

            {error && <DangerAlert message={error} />} 

            {step === 0 && (
              <>
                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    value={email}
                    onChange={onChangeEmail}
                  />
                  <Form.Label htmlFor="name">Email</Form.Label>
                </Form.Group>

                <Form.Group>
                  <Dropdown
                    className="networkDropdown inputDropdown mb-4"
                    onSelect={onChangeTfaMethod}
                  >
                    <Dropdown.Toggle
                      id="sample-dropdown"
                      className="simple-dropdown"
                      disabled={true}
                    >
                      {isEmpty(selectedTfa)
                        ? "Select Verification Method"
                        : get(selectedTfa, "label", "")}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {tfaMethods.map((item) => (
                        <Dropdown.Item key={item.id} eventKey={item.id}>
                          {item.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
              </>
            )} 

             {step === 1 && (
              <> */}
                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                  />
                  <Form.Label htmlFor="name">Wallet Name</Form.Label>
                </Form.Group>

                <Form.Group>
                  <Dropdown
                    className="networkDropdown inputDropdown mb-4"
                    onSelect={(v) =>
                      setSelectedNetwork(networkOptions.find((i) => i.id === v))
                    }
                  >
                    <Dropdown.Toggle
                      id="sample-dropdown"
                      className="simple-dropdown"
                    >
                      {isEmpty(selectedNetwork)
                        ? "Select Network"
                        : get(selectedNetwork, "label", "")}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {networkOptions.map((item) => (
                        <Dropdown.Item key={item.id} eventKey={item.id}>
                          {item.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Label htmlFor="name">Create Password</Form.Label>
                </Form.Group>

                <SliderCaptcha
                  create={createCaptcha}
                  verify={captchaVerifyURL()}
                  callback={afterVerification}
                />

                {/* {!isEmpty(get(tfaDetails, "qrCode", "")) && (
                  <>
                    <Form.Group className="mb-4">
                      <img
                        className="qrcode"
                        alt="qrcode"
                        src={get(tfaDetails, "qrCode", "")}
                      ></img>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Control
                        type="text"
                        value={get(tfaDetails, "base32", "")}
                        readOnly={true}
                      />
                      <Form.Label htmlFor="name">Secret Key</Form.Label>
                    </Form.Group>
                  </>
                )}

                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <Form.Label htmlFor="name">
                    Email Confirmation Code
                  </Form.Label>
                </Form.Group> 
              </>
            )} */}
          </div>
          <div className="button-section">
            <Button
              className="btn-exlarge btn-block btn-primary-outline"
              disabled={!isHuman}
              variant="primary"
              type="submit"
            >
              Confirm
            </Button>
            <Button
              className="btn-exlarge btn-block btn-primary-outline mt-3"
              variant="secondary"
              onClick={onBack}
            >
              Back
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(CreateWallet);
