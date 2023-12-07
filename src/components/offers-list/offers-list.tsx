import { CITIES_MAP, SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { Card } from '../card/card';
import { Map } from '../map/map';
import { useEffect, useMemo, useState } from 'react';
import { Sort, CreateSortingOffers } from '../sort/sort';
import { OffersListEmpty } from '../offers-list-empty/offers-list-empty';
import { getOffers } from '../../store/slice/offers/selectors';
import { offersAction } from '../../store/slice/offers/offers';

type OffersListProps = {
  city: string;
};

function OffersList({ city }: OffersListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [activeSort, setActiveSort] = useState<string>(SortType.Popular);
  const offersState = useAppSelector(getOffers);
  const offersByCity = offersState
    .slice()
    .filter((item) => item.city.name === city);
  const sortedOffersByCity = useMemo(
    () => CreateSortingOffers(activeSort, offersByCity),
    [activeSort, offersByCity]);
  const listEmpty = offersByCity.length === 0;

  const handleMouseEnter = (id: string) => dispatch(offersAction.setActivePoint(id));

  const handleMouseLeave = () => dispatch(offersAction.setActivePoint(undefined));

  useEffect(() => {
    setActiveSort(SortType.Popular);
  }, [city]);

  return (
    listEmpty ? (
      <OffersListEmpty />
    ) : (
      <div className="cities__places-container container">
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
                onMouseEnter={() => handleMouseEnter(offer.id)}
                onMouseLeave={() => handleMouseLeave()}
              />
            ))}
          </div>
        </section>
        <div className="cities__right-section">
          <Map
            key={city}
            className={'cities__map'}
            city={CITIES_MAP[city]}
            points={offersByCity}
          />
        </div>
      </div>
    )
  );
}

export { OffersList };
