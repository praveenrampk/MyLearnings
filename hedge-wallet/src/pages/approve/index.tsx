import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loader from '@src/components/loader';
import { DEFAULT_ROUTE } from '@src/helpers/constants/routes';
import { useAppDispatch, useAppSelector } from '@src/redux/store';

import { fetchAccountsState, homeSelectors } from '../home/homeSlice';

import '@styles/global.scss';

const Approve = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const homeState = useAppSelector(homeSelectors);

  const isLoggedIn = useCallback(async () => {
    await appDispatch(fetchAccountsState()).unwrap();
    setLoading(false);
    if (homeState && homeState.accounts && homeState.isLogedIn)
      navigate(DEFAULT_ROUTE);
  }, [appDispatch]);

  useEffect(() => {
    isLoggedIn();
  }, [isLoggedIn]);

  return (
    <div className="onboarding-container">
      {loading ? (
        <Loader />
      ) : (
        <div className="home-container">
          <div className="home-body">
            <div className="dashboard-container"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Approve;
