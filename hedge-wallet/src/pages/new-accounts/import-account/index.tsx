import React, { ChangeEvent, ClipboardEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { HedgeHogg, Hide, View } from '@src/assets/img';
import { DEFAULT_ROUTE, ONBOARDING_ROUTE } from '@src/helpers/constants/routes';
import '@styles/global.scss';
import { Account } from '@src/interfaces-and-types/home-state';
import { OnboardingStatus } from '@src/interfaces-and-types/onboarding-flow';
import { homeSelectors, insertNewAccount } from '@src/pages/home/homeSlice';
import { onboardingSelectors } from '@src/pages/onboarding-flow/onboardingSlice';
import { settingsSelectors } from '@src/pages/settings/settingsSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import {
  getCoinBalance,
  getPubAddressImportedByPrivateKey,
  getPubAddressImptByMnemonics,
} from '@src/services/utils';

const ImportAccount = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [nameErrorMsg, setNameErrorMsg] = useState<string>('');
  const [inputErrMsg, setInputErrMsg] = useState<string>('');
  const [privateKey, setPrivateKey] = useState<string>('');
  const [accountName, setAccountName] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [drop, setDrop] = useState<boolean>(true);
  const [viewkey, setViewKey] = useState<boolean>(true);
  const [isHide, setIsHide] = useState<boolean[]>(Array(24).fill(true));
  const [inputValues, setInputValues] = useState<string[]>(Array(24).fill(''));
  const navigate = useNavigate();

  const onboardingState = useAppSelector(onboardingSelectors);
  const homeState = useAppSelector(homeSelectors);
  const settingsState = useAppSelector(settingsSelectors);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    if (onboardingState.onboardingStatus !== OnboardingStatus.COMPLETED) {
      navigate(ONBOARDING_ROUTE);

      return;
    }
    setLoading(false);

    if (
      accountName.length > 2 &&
      homeState.accounts.find((acc) => acc.name === accountName)
    ) {
      setNameErrorMsg('Account name already taken.');
    } else {
      setNameErrorMsg('');
    }
  }, [accountName]);

  useEffect(() => {
    setInputErrMsg('');
  }, [inputValues, privateKey]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSelectedValue(event.target.value);

    switch (event.target.value) {
      case 'privateKey':
        setDrop(false);
        setInputErrMsg('');
        break;

      case '24_PhraseSeeds':
        setDrop(true);
        setInputErrMsg('');
        break;
      default:
        break;
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newInputValues = [...inputValues];

    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');

    const checkPastedSeeds: string[] = pastedText
      .replace(/\n/g, '')
      .trim()
      .split(' ')
      .filter((str) => str !== '');

    if (checkPastedSeeds.length > 1) {
      let pastedInputsLength: number = checkPastedSeeds.length,
        start = 0;
      const pastedInputs: string[] = [];

      inputValues.map((value: string, index: number) => {
        if (pastedInputsLength > 0 && !value.length) {
          pastedInputs[index] = checkPastedSeeds[start++];
          pastedInputsLength--;
        } else {
          pastedInputs[index] = value;
        }
      });
      setInputValues(pastedInputs);
    }
  };

  const handleMnemonicFormSubmit = async () => {
    try {
      const address: string = await getPubAddressImptByMnemonics(
        inputValues.join(' '),
        settingsState.networks.activeNet.addressPrefix
      );

      if (!homeState.accounts.find((acc) => acc.publicKey === address)) {
        const newAccount: Account = {
          publicKey: address,
          privateKeyOrPhrase: inputValues.join(' '),
          balance: {
            ...(await getCoinBalance(
              settingsState.networks.activeNet.name,
              address
            )),
          },
          connectedSites: [],
          name: accountName,
        };
        await appDispatch(insertNewAccount(newAccount)).unwrap();
        navigate(DEFAULT_ROUTE);
      } else {
        setInputErrMsg('Account already exists.');
      }
    } catch (error) {
      const whiteSpaceIndex = inputValues.findIndex((input) => input === '');

      whiteSpaceIndex === -1
        ? setInputErrMsg('Invalid Mnemonics.')
        : whiteSpaceIndex
        ? setInputErrMsg('Enter all the Phrases')
        : setInputErrMsg('Enter the Phrases');
    }
  };

  const handlePrivateKeyFormSubmit = async () => {
    try {
      const address: string = await getPubAddressImportedByPrivateKey(
        privateKey,
        settingsState.networks.activeNet.addressPrefix
      );

      if (!homeState.accounts.find((acc) => acc.publicKey === address)) {
        const newAccount: Account = {
          publicKey: address,
          privateKeyOrPhrase: privateKey,
          balance: {
            ...(await getCoinBalance(
              settingsState.networks.activeNet.name,
              address
            )),
          },
          connectedSites: [],
          name: accountName,
        };
        await appDispatch(insertNewAccount(newAccount)).unwrap();
        navigate(DEFAULT_ROUTE);
      } else {
        setInputErrMsg('Account already exists.');
      }
    } catch (error) {
      setInputErrMsg('Invalid Private key.');
    }
  };

  const handleOnKeyDownOrImport = () => {
    if (!accountName.length) return setNameErrorMsg('Enter the Account name');
    if (accountName.length < 4)
      return setNameErrorMsg('Account name must be at least 4 chars');

    drop
      ? inputValues[0]
        ? handleMnemonicFormSubmit()
        : setInputErrMsg('Enter the Phrases')
      : privateKey
      ? handlePrivateKeyFormSubmit()
      : setInputErrMsg('Enter the Private key');
  };

  return loading ? (
    <div className="flex w-full h-full items-center justify-center motion-safe:animate-ping">
      <img className="h-8 w-8" src={HedgeHogg} />
    </div>
  ) : (
    <div className="onboarding-container">
      <div className="card-container h-auto p-4">
        <div className="card-body h-auto p-4 space-y-4">
          <div className="body-header" style={{ fontWeight: 'bold' }}>
            Import Account
          </div>
          <div className="info flex items-center gap-4 p-10 rounded-md">
            <div className="content h-6 w-6 text-lg"></div>
            <p className="content text-sm">
              <div className="body-content items-center gap-4">
                <div className="password-container flex flex-col h-auto gap-2">
                  <div
                    className="placeholder text-sm"
                    style={nameErrorMsg ? { color: 'red' } : {}}
                  >
                    {!nameErrorMsg ? 'Account name' : nameErrorMsg}
                  </div>
                  <div className="input-container">
                    <input
                      className="password-input h-full w-10/12 text-lg p-2"
                      placeholder={`Account ${homeState.accounts.length + 1}`}
                      type="text"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === 'Enter' &&
                        !nameErrorMsg &&
                        handleOnKeyDownOrImport()
                      }
                    />
                    <div
                      className="input-validation text-xs"
                      style={
                        !nameErrorMsg && accountName.length > 3
                          ? { color: 'greenyellow' }
                          : {}
                      }
                    >
                      <br></br>
                      {!nameErrorMsg && accountName.length > 3
                        ? '✅ Account name available'
                        : 'At least 4 characters'}
                    </div>
                  </div>
                </div>
              </div>
            </p>
          </div>
          <div className="body-content gap-2">
            <div className="info flex flex-col p-4 rounded-md">
              <ol className="content text-sm list-decimal ps-6 py-2 leading-6">
                <div className="body-content items-center gap-4 phrases-container">
                  <select
                    id="dropdown"
                    className="password-input h-full w-100 p-2 rounded-md text-base cursor-pointer"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#FFC64D',
                    }}
                    value={selectedValue}
                    onChange={(event) => handleSelectChange(event)}
                  >
                    <option value="24_PhraseSeeds">24 words</option>
                    <option value="privateKey">Private Key</option>
                  </select>
                  {drop ? (
                    <div className="password-container flex flex-col h-auto gap-2">
                      <div
                        className="placeholder text-sm"
                        style={inputErrMsg ? { color: 'red' } : {}}
                      >
                        {inputErrMsg
                          ? inputErrMsg
                          : 'Write down or Paste your phrase'}
                      </div>
                      <div className="secret-phrase-confirm flex flex-col items-center justify-start p-4 phrases-container">
                        {inputValues.map((val: string, index: number) => (
                          <div
                            key={index}
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <input
                              key={index}
                              className="phrase"
                              style={{
                                marginRight: '10px',
                                width: 80,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                              }}
                              type={isHide[index] ? 'password' : 'text'}
                              value={val}
                              onPaste={(e) => handlePaste(e)}
                              onMouseEnter={() => {
                                const newHide = [...isHide];
                                newHide[index] = false;
                                setIsHide(newHide);
                              }}
                              onMouseLeave={() => {
                                const newHide = [...isHide];
                                newHide[index] = true;
                                setIsHide(newHide);
                              }}
                              onKeyDown={(e) =>
                                e.key === 'Enter' && handleOnKeyDownOrImport()
                              }
                              onChange={(e) => handleInputChange(e, index)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="secret-phrase-confirm flex flex-col items-center justify-start p-4">
                      <div className="password-container flex flex-col h-auto gap-2">
                        <div
                          className="placeholder text-sm"
                          style={inputErrMsg ? { color: 'red' } : {}}
                        >
                          {!inputErrMsg ? 'Private key' : inputErrMsg}
                        </div>
                        <div
                          className="input-container"
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <input
                            className="password-input h-full w-10/12 text-lg p-2"
                            style={{
                              marginRight: '10px',
                            }}
                            placeholder="Enter the Private key"
                            type={viewkey ? 'password' : 'text'}
                            value={privateKey}
                            onChange={(e) => setPrivateKey(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === 'Enter' && handleOnKeyDownOrImport()
                            }
                          />
                          <div
                            className="input-validation text-xs"
                            style={
                              !inputErrMsg && accountName.length > 3
                                ? { color: 'greenyellow' }
                                : {}
                            }
                          >
                            <img
                              className="cursor-pointer"
                              src={viewkey ? Hide : View}
                              onClick={() => setViewKey(!viewkey)}
                            />
                          </div>
                        </div>
                        <br></br>
                      </div>
                    </div>
                  )}
                </div>
              </ol>
            </div>
          </div>
        </div>
        <div className="card-footer end cursor-pointer">
          <div
            className="btn-secondary flex justify-center items-center w-auto p-2 px-4 rounded-lg"
            onClick={() => {
              navigate(DEFAULT_ROUTE);
            }}
          >
            Back
          </div>
          <div
            className="btn-secondary flex justify-center items-center w-auto p-2 px-4 rounded-lg"
            onClick={() =>
              drop ? setInputValues(Array(24).fill('')) : setPrivateKey('')
            }
          >
            Clear
          </div>
          <div
            className="btn-primary flex justify-center items-center  w-auto p-2 px-4 rounded-lg"
            onClick={() => handleOnKeyDownOrImport()}
          >
            Import
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportAccount;
