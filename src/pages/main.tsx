import { Header } from '../components/header/header';
import { OffersList } from '../components/offers/offers-list';
import { City } from '../types-ts/city';
import { Tabs } from '../components/tabs/tabs';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { offersAction, offersExtraAction } from '../store/slice/offers';
import { CITY_MAP } from '../const';
import { useEffect } from 'react';
import { Spinner } from './loading-screen';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const stateCity = useAppSelector((state) => state.offers.city);
  const isOffersLoading = useAppSelector(
    (state) => state.offers.isOffersLoading
  );

  const handleCityClick = (city: City) => {
    dispatch(offersAction.setCitySelect(city.name));
  };

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
          <Spinner />
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
