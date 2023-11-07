import Header from '../components/header';
import OffersList from '../components/offers-list';
import { ServerOffer } from '../types-ts/offer';
import { City } from '../types-ts/city';
import Tabs from '../components/tabs';
import { useAppDispatch } from '../hooks/store';
import { offersAction } from '../store/slice/offers';


interface MainScreenProps {
  offers: ServerOffer[];
  selectedCity: City;
  setSelectedCity: React.Dispatch<React.SetStateAction<City>>;
}

function MainScreen({ offers, selectedCity, setSelectedCity }: MainScreenProps): JSX.Element {
  const dispatch = useAppDispatch();
  const offersByCity = offers.slice().filter((item) => item.city.name === selectedCity.name);

  const handleCityClick = (city: City) => {
    setSelectedCity(city);
    dispatch(offersAction.setCitySelect(city.name));
  };

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs selectedCity={selectedCity} handleCityClick={handleCityClick}/>
        <div className="cities">
          <OffersList offers={offersByCity} city={selectedCity} />
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
