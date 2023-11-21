import { Link } from 'react-router-dom';
import { City } from '../../types-ts/city';
import { ServerOffer } from '../../types-ts/offer';
import { Card } from '../card/card';
import { useAppDispatch } from '../../hooks/store';
import { offersAction } from '../../store/slice/offers';
import { favoriteOffersAction, favoriteOffersExtraAction } from '../../store/slice/favorite';
import { useEffect } from 'react';

type FavoriteListProps = {
  city: City;
  offers: ServerOffer[];
}[];

function FavoriteList({
  favoriteList,
}: {
  favoriteList: FavoriteListProps;
}): JSX.Element {
  const dispatch = useAppDispatch();

  const handleFavoriteChange = (id: string) => {
    dispatch(offersAction.setFavorite(id));
    dispatch(favoriteOffersAction.removeFavorite(id));
    dispatch(favoriteOffersExtraAction.setFavoriteOffer({offerId: id, status: 0}));
  };

  useEffect(() => {
    dispatch(favoriteOffersExtraAction.fetchFavoriteOffers());
  }, [dispatch]);

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
                isAuth
                handleFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export { FavoriteList };
