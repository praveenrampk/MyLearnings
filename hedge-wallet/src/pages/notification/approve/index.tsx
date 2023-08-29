import { shapes } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { get } from 'lodash';
import { useEffect, useState } from 'react';

import Eye from '@assets/img/hideEyeCon.svg';
import { Account } from '@src/interfaces-and-types/home-state';
import { addSitesToAccount } from '@src/services/connect-sites';

import '@styles/global.scss';

const Approve = ({ domain }: { domain: string }) => {
  const [step, setStep] = useState(1);
  const [accountsDetail, setAccountsDetail] = useState();
  const [accounts, setAccounts] = useState(null);
  const [selected, setSelected] = useState([]);
  const [host, setHost] = useState('');

  useEffect(() => {
    chrome.storage.local.get('accountDetails', (details) => {
      setAccountsDetail(details.accountDetails);
      setAccounts(details.accountDetails.accounts);
    });
  }, []);

  useEffect(() => {
    const windowData = get(window, 'custom_data', '');
    const windowType = get(windowData, 'type', '');

    // console.log('Window data:', windowData);
    // console.log('Window data type:', windowType);

    if (get(window, 'isNewWindow', false) && windowType === 'enable-hedge') {
      setHost(get(windowData, 'domain', ''));
    }
  }, [accountsDetail, accounts]);

  const onClickApprove = async () => {
    chrome.runtime.sendMessage({ type: 'updateConnectedSites', domain: host });
    window.close();
  };

  return (
    <div className="approve">
      <div className="header">
        <div className={`step ${step === 1 ? 'active' : 'complete'}`}>1</div>
        <div className="bar" />
        <div className={`step ${step === 2 ? 'active' : ''}`}>2</div>
      </div>
      <div className="step-one">
        <div className="site-id">
          <div className="favicon">
            <img src={`https://${domain}/favicon.ico`} />
          </div>
          <div className="link">{domain}</div>
        </div>
        {step === 1 ? (
          <>
            <div className="info">
              <div className="heading">Connect with HedgeHogg</div>
              <p className="subheading">
                Select the account(s) to use on this site
              </p>
            </div>
            <div className="accounts-container">
              {accounts &&
                accounts.map((acc: Account) => (
                  <div key={acc.pathIndex} className="account">
                    <input
                      type="checkbox"
                      className="account-checker"
                      checked={selected.includes(acc.publicKey)}
                      value={acc.publicKey}
                      onChange={(event) => {
                        if (event.target.checked) {
                          setSelected((_prev) => [..._prev, acc.publicKey]);
                        } else {
                          setSelected(
                            selected.filter(
                              (tempAcc) => tempAcc !== acc.publicKey
                            )
                          );
                        }
                      }}
                    />
                    <div className="avatar">
                      <img
                        className="favicon"
                        src={createAvatar(shapes, {
                          seed: acc.publicKey,
                        }).toDataUriSync()}
                      />
                    </div>
                    <div className="account-details">
                      <div className="name-address">
                        {`${acc.name} (${acc.publicKey.slice(
                          0,
                          7
                        )}.... ${acc.publicKey.slice(-5)})`}
                      </div>
                      <div className="balance">{acc.balance.bal} HEDGE</div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <>
            <div className="info">
              <div className="heading">
                {selected.length > 1
                  ? `Connect ${selected.length} accounts`
                  : `Connect ${
                      accounts.find((acc) => acc.publicKey === selected[0]).name
                    }`}
              </div>
              <p className="subheading">Allow this site to:</p>
            </div>

            <div className="message">
              <img className="eye" src={Eye} />
              <p>
                See address, account balance, activity and suggest transactions
                to approve
              </p>
            </div>
          </>
        )}
      </div>
      <div className="footer">
        <div
          className="btn btn-secondary flex justify-center items-center"
          onClick={() => {
            if (step === 1) {
              window.close();
            } else {
              setStep(1);
            }
          }}
        >
          {step < 2 ? 'Cancel' : 'Back'}
        </div>
        <div
          className="btn btn-primary flex justify-center items-center"
          onClick={async () => {
            if (step === 2) {
              await addSitesToAccount(accountsDetail, selected, domain);

              chrome.runtime.sendMessage({
                type: 'updateConnectedSites',
                domain: host,
              });

              window.close();
            } else setStep(2);
          }}
        >
          {step > 1 ? 'Approve' : 'Next'}
        </div>
      </div>
    </div>
  );
};

export default Approve;
