import {
  AppRoute,
  AuthorizationStatus,
  CITY_MAP,
  SortTypes,
} from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { favoriteOffersExtraAction } from '../../store/slice/favorite';
import { offersAction } from '../../store/slice/offers';
import { Card } from '../card/card';
import { Map } from '../map/map';
import { memo, useEffect, useMemo, useState } from 'react';
import { Sort, CreateSortingOffers } from '../sort/sort';
import { OffersListEmpty } from './offers-list-empty';
import { useNavigate } from 'react-router-dom';

type OffersListProps = {
  city: string;
};

function OffersListComponent({ city }: OffersListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activeOfferCard, setActiveOfferCard] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<string>(SortTypes.Popular);
  const offersState = useAppSelector((state) => state.offers.offers);
  const offersByCity = offersState
    .slice()
    .filter((item) => item.city.name === city);
  const sortedOffersByCity = useMemo(() => CreateSortingOffers(activeSort, offersByCity), [activeSort, offersByCity]);
  const isAuth = useAppSelector(
    (state) => state.user.authStatus === AuthorizationStatus.Auth
  );
  const listEmpty = offersByCity.length === 0;

  const handleFavoriteChange = (id: string) => {
    dispatch(offersAction.setFavorite(id));
    const foundOffer = offersState.find((offer) => offer.id === id);
    if (foundOffer) {
      const favoriteStatus = foundOffer.isFavorite ? 0 : 1;
      dispatch(
        favoriteOffersExtraAction.setFavoriteOffer({
          offerId: id,
          status: favoriteStatus,
        })
      );
      dispatch(favoriteOffersExtraAction.fetchFavoriteOffers());
    }
    if (!isAuth) {
      navigate(AppRoute.Login);
    }
  };

  const handleMouseEnter = (id: string) => setActiveOfferCard(id);

  const handleMouseLeave = () => setActiveOfferCard(null);

  useEffect(() => {
    setActiveSort(SortTypes.Popular);
  }, [city]);

  return (
    <div className="cities__places-container container">
      {listEmpty ? (
        <OffersListEmpty />
      ) : (
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {offersByCity.length > 1
              ? `${offersByCity.length} places`
              : `${offersByCity.length} place`}{' '}
            to stay in {city}
          </b>
          <Sort activeSort={activeSort} setActiveSort={setActiveSort} />
          <div className="cities__places-list places__list tabs__content">
            {sortedOffersByCity.map((offer) => (
              <Card
                key={offer.id}
                screenName="cities"
                offer={offer}
                isAuth={isAuth}
                handleFavoriteChange={handleFavoriteChange}
                onMouseEnter={() => handleMouseEnter(offer.id)}
                onMouseLeave={() => handleMouseLeave()}
              />
            ))}
          </div>
        </section>
      )}
      <div className="cities__right-section">
        <Map
          key={city}
          className={'cities__map'}
          city={CITY_MAP[city]}
          points={offersByCity}
          activePoint={activeOfferCard}
        />
      </div>
    </div>
  );
}

export const OffersList = memo(OffersListComponent);
