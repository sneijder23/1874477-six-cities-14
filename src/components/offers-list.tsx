import { City } from '../types/city';
import { ServerOffer } from '../types/offer';
import Card from './card';
import Map from './map';
import { useEffect, useState } from 'react';

type OffersListProps = {
  offers: ServerOffer[];
  city: City;
};

function OffersList({ offers, city }: OffersListProps): JSX.Element {
  const [offersData, setOffersData] = useState(offers);
  const [activeOfferCard, setActiveOfferCard] = useState<string | null>(null);

  const handleFavoriteChange = (id: string, isFavorite: boolean) => {
    const updatedOffers = offersData.map((offer) => {
      if (offer.id === id) {
        return { ...offer, isFavorite };
      }
      return offer;
    });
    setOffersData(updatedOffers);
  };

  const handleMouseEnter = (id: string) => setActiveOfferCard(id);

  const handleMouseLeave = () => setActiveOfferCard(null);

  useEffect(() => {
    setOffersData(offers);
  }, [offers]);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length > 1
            ? `${offers.length} places`
            : `${offers.length} place`}{' '}
          to stay in {city.name}
        </b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--closed">
            <li className="places__option places__option--active" tabIndex={0}>
              Popular
            </li>
            <li className="places__option" tabIndex={0}>
              Price: low to high
            </li>
            <li className="places__option" tabIndex={0}>
              Price: high to low
            </li>
            <li className="places__option" tabIndex={0}>
              Top rated first
            </li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          {offersData.map((offer) => (
            <Card
              key={offer.id}
              screenName='cities'
              offer={offer}
              handleFavoriteChange={handleFavoriteChange}
              onMouseEnter={() => handleMouseEnter(offer.id)}
              onMouseLeave={() => handleMouseLeave()}
            />
          ))}
        </div>
      </section>
      <div className="cities__right-section">
        <Map
          key={city.name}
          className={'cities__map'}
          city={city}
          points={offersData}
          activePoint={activeOfferCard}
        />
      </div>
    </div>
  );
}

export default OffersList;
