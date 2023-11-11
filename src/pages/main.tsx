import Header from '../components/header/header';
import OffersList from '../components/offers/offers-list';
import { City } from '../types-ts/city';
import Tabs from '../components/tabs/tabs';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { offersAction } from '../store/slice/offers';
import { CITY_MAP } from '../const';

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const stateCity = useAppSelector((state) => state.offers.city);

  const handleCityClick = (city: City) => {
    dispatch(offersAction.setCitySelect(city.name));
  };

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs
          selectedCity={CITY_MAP[stateCity]}
          handleCityClick={handleCityClick}
        />
        <div className="cities">
          <OffersList city={stateCity} />
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
