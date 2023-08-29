import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import Loader from '@src/components/loader';
import { themeChanger } from '@src/features/theme/theme-changer';
import {
  changePrimaryCurrency,
  updateOneFromGeneralContents,
} from '@src/helpers';
import { ContentsInGeneral } from '@src/interfaces-and-types/pages/settings';
import { useAppDispatch, useAppSelector } from '@src/redux/store';

import {
  alterInGeneralSettings,
  fetchSettingsState,
  settingsSelectors,
} from '../settingsSlice';

const GeneralSettings = () => {
  const appDispatch = useAppDispatch();
  const settingsState = useAppSelector(settingsSelectors);

  const [loading, setLoading] = useState([]);

  const handleDropdown = async (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    e.preventDefault();
    const newLoading = [...loading];
    const mode = e.target.value;

    try {
      newLoading[index] = true;
      setLoading([...newLoading]);

      await appDispatch(
        alterInGeneralSettings(
          updateOneFromGeneralContents(settingsState.general, index, mode)
        )
      );
      await appDispatch(fetchSettingsState()).unwrap();

      if (index === 3) {
        themeChanger(mode.toLowerCase());
      }
      newLoading[index] = false;
      setLoading([...newLoading]);
    } catch (err) {
      newLoading[index] = false;
      setLoading([...newLoading]);
    }
  };

  const fetchAllStates = useCallback(async () => {
    try {
      await appDispatch(fetchSettingsState()).unwrap();

      setLoading(Array(settingsState.general.length).fill(false));
    } catch (err) {
      setLoading(Array(settingsState.general.length).fill(false));
    }
  }, [appDispatch, fetchSettingsState]);

  useEffect(() => {
    fetchAllStates();
  }, [fetchAllStates]);

  return (
    <div className="p-3 mt-5 h-full w-full bg-transparent">
      <div className="justify-start items-start">
        <p className="text-xl text-black-10 dark:text-white-85 font-semibold">
          General
        </p>
      </div>
      <div className="py-4 overflow-hidden">
        <div className="h-2/3 overflow-auto">
          <div className="flex flex-col space-y-5">
            {settingsState.general.map(
              (item: ContentsInGeneral, index: number) => (
                <div
                  key={index}
                  className="flex flex-col justify-start items-start gap-y-3"
                >
                  <p className="text-base text-black-10 dark:text-white-75">
                    {item.heading}
                  </p>
                  <p className="text-sm text-black-10 dark:text-white-65">
                    {item.subHeading}
                  </p>
                  {index === 0 && (
                    <p className="text-sm text-black-10 dark:text-white-65">
                      {}
                    </p>
                  )}
                  {loading[index] ? (
                    <Loader />
                  ) : (
                    <>
                      {item.dropdown ? (
                        <>
                          {/* {index === 0 && (
                            <input
                              className="h-12 w-1/2 bg-transparent rounded-md"
                              placeholder="Search Popular Fiat Currencies"
                            />
                          )} */}
                          <select
                            value={item.dropdown[0]}
                            onChange={(e) => handleDropdown(e, index)}
                            className="border border-black-10 dark:border-white-85 dark:bg-black-10 bg-white-75 text-black-10 dark:text-white-75 h-10 w-1/2 p-2 rounded-md text-base cursor-pointer"
                          >
                            {item.dropdown.map(
                              (value: string, dpIdx: number) => (
                                <option key={dpIdx} value={value}>
                                  {value}
                                </option>
                              )
                            )}
                          </select>
                        </>
                      ) : (
                        <div className="flex flex-row gap-x-5">
                          <div className="flex flex-row gap-x-2">
                            <input
                              className="h-4 w-4 mt-1 rounded-full"
                              type="radio"
                              checked={item.radio.primary}
                              onClick={async () =>
                                !item.radio.primary &&
                                (await appDispatch(
                                  alterInGeneralSettings(
                                    changePrimaryCurrency(
                                      item.radio.primary,
                                      item.radio.fiat,
                                      settingsState.general,
                                      index
                                    )
                                  )
                                ))
                              }
                            />
                            <p className="text-base text-black-10 dark:text-white-75">
                              {settingsState.networks.activeNet.symbol}
                            </p>
                          </div>
                          <div className="flex flex-row gap-x-2">
                            <input
                              className="h-4 w-4 mt-1 rounded-full"
                              type="radio"
                              checked={item.radio.fiat}
                              onClick={async () =>
                                !item.radio.fiat &&
                                (await appDispatch(
                                  alterInGeneralSettings(
                                    changePrimaryCurrency(
                                      item.radio.primary,
                                      item.radio.fiat,
                                      settingsState.general,
                                      index
                                    )
                                  )
                                ))
                              }
                            />
                            <p className="text-base text-black-10 dark:text-white-75">
                              Fiat
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      {}
    </div>
  );
};

export default GeneralSettings;
