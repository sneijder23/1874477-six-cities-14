import { useEffect, useState } from 'react';
import Header from '../components/header';
import OffersList from '../components/offers-list';
import { ServerOffer } from '../types/offer';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { CITY_MAP } from '../const';
import { City } from '../types/city';

interface MainScreenProps {
  offers: ServerOffer[];
}

function MainScreen({ offers }: MainScreenProps): JSX.Element {
  const [selectedCity, setSelectedCity] = useState<City>(CITY_MAP['Amsterdam']);
  const [filteredOffers, setFilteredOffers] = useState<ServerOffer[]>([]);

  const createFilteredOffers = (city: City, allOffers: ServerOffer[]) => {
    const newFilteredOffers = allOffers.filter(
      (offer) => offer.city.name === city.name
    );
    setFilteredOffers(newFilteredOffers);
  };

  const handleCityClick = (city: City) => {
    setSelectedCity(city);
    createFilteredOffers(city, offers);
  };

  useEffect(() => {
    createFilteredOffers(selectedCity, offers);
  }, [selectedCity, offers]);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <Link
                  className={classnames('locations__item-link', 'tabs__item', {
                    'tabs__item--active': selectedCity === CITY_MAP['Paris'],
                  })}
                  onClick={() => handleCityClick(CITY_MAP['Paris'])}
                  to="#"
                >
                  <span>Paris</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link
                  className={classnames('locations__item-link', 'tabs__item', {
                    'tabs__item--active': selectedCity === CITY_MAP['Cologne'],
                  })}
                  onClick={() => handleCityClick(CITY_MAP['Cologne'])}
                  to="#"
                >
                  <span>Cologne</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link
                  className={classnames('locations__item-link', 'tabs__item', {
                    'tabs__item--active': selectedCity === CITY_MAP['Brussels']
                  })}
                  onClick={() => handleCityClick(CITY_MAP['Brussels'])}
                  to="#"
                >
                  <span>Brussels</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link
                  className={classnames('locations__item-link', 'tabs__item', {
                    'tabs__item--active': selectedCity === CITY_MAP['Amsterdam'],
                  })}
                  onClick={() => handleCityClick(CITY_MAP['Amsterdam'])}
                  to="#"
                >
                  <span>Amsterdam</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link
                  className={classnames('locations__item-link', 'tabs__item', {
                    'tabs__item--active': selectedCity === CITY_MAP['Hamburg'],
                  })}
                  onClick={() => handleCityClick(CITY_MAP['Hamburg'])}
                  to="#"
                >
                  <span>Hamburg</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link
                  className={classnames('locations__item-link', 'tabs__item', {
                    'tabs__item--active': selectedCity === CITY_MAP['Dusseldorf'],
                  })}
                  onClick={() => handleCityClick(CITY_MAP['Dusseldorf'])}
                  to="#"
                >
                  <span>Dusseldorf</span>
                </Link>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <OffersList offers={filteredOffers} city={selectedCity} />
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
