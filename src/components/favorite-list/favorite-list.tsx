import { Link } from 'react-router-dom';
import { City } from '../../types-ts/city';
import { ServerOffer } from '../../types-ts/offer';
import { Card } from '../card/card';
import { memo } from 'react';

type FavoriteListProps = {city: City; offers: ServerOffer[] }[];

function FavoriteListComponent({ favoriteList }: {favoriteList: FavoriteListProps}): JSX.Element {

  return (
    <ul className="favorites__list">
      {favoriteList.map(({ city, offers }) => (
        <li key={city.name} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link to="#" className="locations__item-link">
                <span>{city.name}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {offers.map((offer) => (
              <Card
                key={offer.id}
                screenName="favorites"
                offer={offer}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export const FavoriteList = memo(FavoriteListComponent);
