import { Header } from '../components/header/header';
import { OffersList } from '../components/offers-list/offers-list';
import { City } from '../types-ts/city';
import { Tabs } from '../components/tabs/tabs';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { offersAction } from '../store/slice/offers/offers';
import { CITY_MAP } from '../const';
import { useCallback, useEffect } from 'react';
import { LoadingScreen } from './loading-screen';
import { getOffersLoadingStatus, getSelectedCity } from '../store/slice/offers/selectors';
import { fetchAllOffers } from '../store/thunk/offers';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const stateCity = useAppSelector(getSelectedCity);
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);

  const handleCityClick = useCallback(
    (city: City) => {
      dispatch(offersAction.setCitySelect(city.name));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchAllOffers());
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs
          selectedCity={CITY_MAP[stateCity]}
          handleCityClick={handleCityClick}
        />
        {isOffersLoading ? (
          <LoadingScreen />
        ) : (
          <div className="cities">
            <OffersList city={stateCity} />
          </div>
        )}
        ;
      </main>
    </div>
  );
}

export { Main };
