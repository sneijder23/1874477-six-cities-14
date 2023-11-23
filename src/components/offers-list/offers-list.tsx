import {
  AppRoute,
  CITY_MAP,
  SortTypes,
} from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { offersAction } from '../../store/slice/offers/offers';
import { Card } from '../card/card';
import { Map } from '../map/map';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Sort, CreateSortingOffers } from '../sort/sort';
import { OffersListEmpty } from './offers-list-empty';
import { useNavigate } from 'react-router-dom';
import { getOffers } from '../../store/slice/offers/selectors';
import { getAuthorizationStatus } from '../../store/slice/user/selectors';
import { setFavoriteOffer } from '../../store/thunk/favorite';
import { favoriteAction } from '../../store/slice/favorite/favorite';

type OffersListProps = {
  city: string;
};

function OffersListComponent({ city }: OffersListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activeOfferCard, setActiveOfferCard] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<string>(SortTypes.Popular);
  const offersState = useAppSelector(getOffers);
  const offersByCity = offersState
    .slice()
    .filter((item) => item.city.name === city);
  const sortedOffersByCity = useMemo(
    () => CreateSortingOffers(activeSort, offersByCity),
    [activeSort, offersByCity]
  );
  const isAuth = useAppSelector(getAuthorizationStatus);
  const listEmpty = offersByCity.length === 0;

  const handleFavoriteChange = useCallback(
    (id: string) => {
      dispatch(offersAction.setFavorite(id));
      const foundOffer = offersState.find((offer) => offer.id === id);
      if (foundOffer && isAuth) {
        const favoriteStatus = foundOffer.isFavorite ? 0 : 1;
        dispatch(
          setFavoriteOffer({
            offerId: id,
            status: favoriteStatus,
          })
        ).then(() => {
          dispatch(favoriteAction.fetchFavoriteOffers());
        });
      }
      if (!isAuth) {
        return navigate(AppRoute.Login);
      }
    },
    [dispatch, offersState, isAuth, navigate]
  );

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
                onFavoriteChange={handleFavoriteChange}
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
