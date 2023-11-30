import { AppRoute, CITIES_MAP } from '../../const';
import { City } from '../../types-ts/city';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { memo } from 'react';

type TabsProps = {
  selectedCity: City;
  handleCityClick: (city: City) => void;
};

function TabsComponent({ selectedCity, handleCityClick }: TabsProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Object.entries(CITIES_MAP).map(([key, city]: [string, City]) => (
            <li key={key} className="locations__item">
              <Link
                to={AppRoute.Root}
                className={classNames('locations__item-link', 'tabs__item', {
                  'tabs__item--active': selectedCity === city,
                })}
                onClick={() => handleCityClick(city)}
              >
                <span>{city.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export const Tabs = memo(TabsComponent);
