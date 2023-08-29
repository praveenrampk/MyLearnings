import { Outlet, useNavigate } from 'react-router-dom';

import {
  About,
  Advanced,
  AlertBell,
  Contact,
  General,
  Lock,
  Search,
  Wrong,
} from '@src/assets/img';
import Connected from '@src/components/icons/connected';
import {
  ABOUT_US_ROUTE,
  ADVANCED_ROUTE,
  ALERTS_ROUTE,
  CONTACT_ROUTE,
  DEFAULT_ROUTE,
  GENERAL_ROUTE,
  NETWORK_ROUTE,
  SECURITY_ROUTE,
} from '@src/helpers/constants/routes';

const Settings = () => {
  const navigate = useNavigate();

  const navigateTo = (subRoute: string) => {
    switch (subRoute) {
      case GENERAL_ROUTE:
        navigate(GENERAL_ROUTE);
        break;
      case ADVANCED_ROUTE:
        navigate(ADVANCED_ROUTE);
        break;
      case CONTACT_ROUTE:
        navigate(CONTACT_ROUTE);
        break;
      case SECURITY_ROUTE:
        navigate(SECURITY_ROUTE);
        break;
      case ALERTS_ROUTE:
        navigate(ALERTS_ROUTE);
        break;
      case NETWORK_ROUTE:
        navigate(NETWORK_ROUTE);
        break;
      case ABOUT_US_ROUTE:
        navigate(ABOUT_US_ROUTE);
        break;
      default:
        navigate(GENERAL_ROUTE);
        break;
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-body">
        <div className="settings-inner-container">
          <div className="card">
            <div className="settings-header">
              <div className="flex flex-row justify-between">
                <p className="text-black-10 dark:text-white-75 text-3xl font-medium">
                  Settings
                </p>
                <div className="flex flex-row gap-3">
                  <div className="flex gap-4 rounded-lg">
                    <img className="h-6 w-6 mt-2" src={Search} />
                    <input
                      className="h-10 w-full bg-transparent text-black dark:text-white-75 text-lg"
                      placeholder="Search in Settings"
                    />
                  </div>
                  <img
                    className="h-6 w-6 mt-2 mr-1 cursor-pointer"
                    src={Wrong}
                    onClick={() => navigate(DEFAULT_ROUTE)}
                  />
                </div>
              </div>
              <div className="border-b border-solid dark:border-white-15 border-black-10 w-full"></div>
              <div className="flex flex-row gap-x-10">
                <div className="flex flex-col mt-5 text-base font-light text-black-10 dark:text-white-75 gap-y-6">
                  <div
                    className="flex gap-4 cursor-pointer"
                    onClick={() => navigateTo(GENERAL_ROUTE)}
                  >
                    <img className="h-4 w-4 mt-1" src={General} />
                    <p className="text-base">General</p>
                  </div>
                  <div
                    className="flex gap-4 cursor-pointer"
                    onClick={() => navigateTo(ADVANCED_ROUTE)}
                  >
                    <img className="h-4 w-4 mt-1" src={Advanced} />
                    <p className="text-base">Advanced</p>
                  </div>
                  <div
                    className="flex gap-2 cursor-pointer"
                    onClick={() => navigateTo(CONTACT_ROUTE)}
                  >
                    <img className="-ml-1.5 h-6 w-7" src={Contact} />
                    <p className="text-base">Contacts</p>
                  </div>
                  <div
                    className="flex gap-4 cursor-pointer"
                    onClick={() => navigateTo(SECURITY_ROUTE)}
                  >
                    <img className="h-4 w-4 mt-2" src={Lock} />
                    <div className="flex flex-col">
                      <p className="text-base">Security &</p>
                      <p className="text-base">Policy</p>
                    </div>
                  </div>
                  <div className="flex gap-4 cursor-pointer">
                    <img className="mt-1 h-5 w-5" src={AlertBell} />
                    <p className="text-base">Alerts</p>
                  </div>
                  <div
                    className="flex gap-4 cursor-pointer"
                    onClick={() => navigateTo(NETWORK_ROUTE)}
                  >
                    <div className="mt-1">
                      <Connected />
                    </div>
                    <p className="text-base">Networks</p>
                  </div>
                  <div className="flex gap-4 cursor-pointer">
                    <img className="mt-1 h-4 w-4" src={About} />
                    <p className="text-base">About</p>
                  </div>
                </div>
                <div className="h-full w-full">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
