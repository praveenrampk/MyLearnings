import { useState } from 'react';

import { SecurityContent } from '@src/interfaces-and-types/pages/settings';
import { settingsSelectors } from '@src/pages/settings/settingsSlice';
import { useAppSelector } from '@src/redux/store';

import ChangeWalletPassword from './change-password';
import RevealSecretPhrase from './reveal-recovery-phrase';

const Security = () => {
  const settingsState = useAppSelector(settingsSelectors);
  const [toggleChangePassword, setToggleChangePassword] = useState(false);
  const [toggleRevealPhrase, setToggleRevealPhrase] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-6">
        <p className="text-lg text-black-10 dark:text-white-85 font-semibold">
          Security
        </p>
        {settingsState.securityPrivacy.security.map(
          (content: SecurityContent, index: number) =>
            content.button ? (
              <div key={index} className="flex flex-col space-y-4">
                <p className="text-base text-black-10 dark:text-white-85">
                  {content.heading}
                </p>
                {toggleRevealPhrase && (
                  <RevealSecretPhrase showPopups={setToggleRevealPhrase} />
                )}
                <div
                  className={`w-1/3 py-4 text-sm text-center text-${content.button.btnColor} text-center bg-transparent border border-${content.button.btnColor} rounded-3xl cursor-pointer`}
                  onClick={() =>
                    content.button.btnText ===
                      'Reveal Secret Recovery Phrase' &&
                    setToggleRevealPhrase(true)
                  }
                >
                  {content.button.btnText}
                </div>
              </div>
            ) : (
              <div
                key={index}
                className="h-full w-full flex flex-col space-y-4"
              >
                <div className="flex flex-col space-y-2">
                  <p className="text-base text-black-10 dark:text-white-85">
                    Alter your Hedge Hogg password now.
                  </p>
                  {toggleChangePassword && (
                    <ChangeWalletPassword
                      showPopups={setToggleChangePassword}
                    />
                  )}
                  <div
                    className="w-1/3 py-4 text-sm text-primary text-center bg-transparent border border-primary rounded-3xl cursor-pointer"
                    onClick={() => setToggleChangePassword(true)}
                  >
                    {content.changePassword}
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Security;
