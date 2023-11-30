import { Link } from 'react-router-dom';
import { ServerOffer } from '../../types-ts/offer';
import { Card } from '../card/card';
import { memo } from 'react';
import { City } from '../../types-ts/city';
import { useAppSelector } from '../../hooks/store';
import { getFavoriteLoadingStatus } from '../../store/slice/favorite/selectors';
import { Spinner } from '../spinner/spinner';

function FavoriteListComponent({
  favoriteOffers,
}: {
  favoriteOffers: ServerOffer[];
}): JSX.Element {
  const isOffersLoading = useAppSelector(getFavoriteLoadingStatus);
  const favoriteList: { city: City; offers: ServerOffer[] }[] =
    favoriteOffers.reduce<{ city: City; offers: ServerOffer[] }[]>(
      (acc, cur) => {
        if (cur.isFavorite) {
          const existingCity = acc.find(
            (item) => item.city.name === cur.city.name
          );
          if (existingCity) {
            existingCity.offers.push(cur);
          } else {
            acc.push({
              city: cur.city,
              offers: [cur],
            });
          }
        }
        return acc;
      },
      []
    );

  if (isOffersLoading) {
    return <Spinner />;
  }

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
              <Card key={offer.id} screenName="favorites" offer={offer} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export const FavoriteList = memo(FavoriteListComponent);
