import { CITY_MAP, SortTypes } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { Card } from '../card/card';
import { Map } from '../map/map';
import { memo, useEffect, useMemo, useState } from 'react';
import { Sort, CreateSortingOffers } from '../sort/sort';
import { OffersListEmpty } from '../offers-list-empy/offers-list-empty';
import { getOffers } from '../../store/slice/offers/selectors';

type OffersListProps = {
  city: string;
};

function OffersListComponent({ city }: OffersListProps): JSX.Element {
  const [activeOfferCard, setActiveOfferCard] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<string>(SortTypes.Popular);
  const offersState = useAppSelector(getOffers);
  const offersByCity = offersState
    .slice()
    .filter((item) => item.city.name === city);
  const sortedOffersByCity = useMemo(
    () => CreateSortingOffers(activeSort, offersByCity),
    [activeSort, offersByCity]);
  const listEmpty = offersByCity.length === 0;

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
                offers
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
