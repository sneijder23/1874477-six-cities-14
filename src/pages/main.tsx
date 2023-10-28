import { useEffect, useState } from 'react';
import Header from '../components/header';
import OffersList from '../components/offers-list';
import { ServerOffer } from '../types/offer';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

interface MainScreenProps {
  offers: ServerOffer[];
}

function MainScreen({ offers }: MainScreenProps): JSX.Element {
  const [selectedCity, setSelectedCity] = useState<string>('Amsterdam');
  const [filteredOffers, setFilteredOffers] = useState<ServerOffer[]>([]);

  const createFilteredOffers = (city: string, allOffers: ServerOffer[]) => {
    const newFilteredOffers = allOffers.filter(
      (offer) => offer.city.name === city
    );
    setFilteredOffers(newFilteredOffers);
  };

  const handleCityClick = (city: string) => {
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
                    'tabs__item--active': selectedCity === 'Paris',
                  })}
                  onClick={() => handleCityClick('Paris')}
                  to="#"
                >
                  <span>Paris</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link
                  className={classnames('locations__item-link', 'tabs__item', {
                    'tabs__item--active': selectedCity === 'Cologne',
                  })}
                  onClick={() => handleCityClick('Cologne')}
                  to="#"
                >
                  <span>Cologne</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link
                  className={classnames('locations__item-link', 'tabs__item', {
                    'tabs__item--active': selectedCity === 'Brussels',
                  })}
                  onClick={() => handleCityClick('Brussels')}
                  to="#"
                >
                  <span>Brussels</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link
                  className={classnames('locations__item-link', 'tabs__item', {
                    'tabs__item--active': selectedCity === 'Amsterdam',
                  })}
                  onClick={() => handleCityClick('Amsterdam')}
                  to="#"
                >
                  <span>Amsterdam</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link
                  className={classnames('locations__item-link', 'tabs__item', {
                    'tabs__item--active': selectedCity === 'Hamburg',
                  })}
                  onClick={() => handleCityClick('Hamburg')}
                  to="#"
                >
                  <span>Hamburg</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link
                  className={classnames('locations__item-link', 'tabs__item', {
                    'tabs__item--active': selectedCity === 'Dusseldorf',
                  })}
                  onClick={() => handleCityClick('Dusseldorf')}
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
