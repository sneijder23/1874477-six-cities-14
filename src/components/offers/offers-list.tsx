import { CITY_MAP, SortTypes } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { favoriteOffersAction } from '../../store/slice/favorite-offers';
import { offersAction } from '../../store/slice/offers';
import Card from '../card/card';
import Map from '../map/map';
import { useEffect, useState } from 'react';
import Sort, { CreateSortingOffers } from '../sort/sort';
import OffersListEmpty from './offers-list-empty';
// import { ServerOffer } from '../types-ts/offer';

type OffersListProps = {
  city: string;
};

function OffersList({ city }: OffersListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [activeOfferCard, setActiveOfferCard] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<string>(SortTypes.Popular);
  const offersState = useAppSelector((state) => state.offers.items);
  const offersByCity = offersState
    .slice()
    .filter((item) => item.city.name === city);
  const sortingOffersByCity = CreateSortingOffers(activeSort, offersByCity);
  const listEmpty = offersByCity.length === 0;

  const handleFavoriteChange = (id: string) => {
    dispatch(offersAction.setFavorite(id));
    dispatch(favoriteOffersAction.setFavorite(id));
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
            {sortingOffersByCity.map((offer) => (
              <Card
                key={offer.id}
                screenName="cities"
                offer={offer}
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

export default OffersList;
