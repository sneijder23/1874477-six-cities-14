import { Link } from 'react-router-dom';
import { City } from '../types/city';
import { ServerOffer } from '../types/offer';
import Card from './card';
import { useState } from 'react';

type FavoriteListProps = {
  city: City;
  offers: ServerOffer[];
}[];

function FavoriteList({ favoriteList }: { favoriteList: FavoriteListProps }): JSX.Element {
  const [offersData, setOffersData] = useState(favoriteList);

  const handleFavoriteChange = (id: string, isFavorite: boolean) => {
    const updatedOffersData = offersData.map(({ city, offers }) => {
      const updatedOffers = offers.map((offer) => {
        if (offer.id === id) {
          return { ...offer, isFavorite };
        } else {
          return offer;
        }
      });

      return { city, offers: updatedOffers };
    });

    setOffersData(updatedOffersData);
  };

  return (
    <ul className="favorites__list">
      {offersData.map(({ city, offers }) => (
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
                isFavoriteScreen
                offer={offer}
                handleFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavoriteList;
