import { Header } from '../components/header/header';
import { OffersList } from '../components/offers-list/offers-list';
import { City } from '../types-ts/city';
import { Tabs } from '../components/tabs/tabs';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { offersAction, offersExtraAction } from '../store/slice/offers';
import { CITY_MAP } from '../const';
import { memo, useCallback, useEffect } from 'react';
import { LoadingScreen } from './loading-screen';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const stateCity = useAppSelector((state) => state.offers.city);
  const isOffersLoading = useAppSelector(
    (state) => state.offers.isOffersLoading
  );

  const handleCityClick = useCallback((city: City) => {
    dispatch(offersAction.setCitySelect(city.name));
  }, [dispatch]);

  useEffect(() => {
    dispatch(offersExtraAction.fetchAllOffers());
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

export const Main = memo(MainPage);
