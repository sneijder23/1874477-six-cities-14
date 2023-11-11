import Header from '../components/header/header';
import { useDocumentTitle } from '../hooks/document-title';
import { useParams } from 'react-router-dom';
import { capitalizeFirstLetter } from '../utils/utils';
import classNames from 'classnames';
import ReviewForm from '../components/review/review-form';
import ReviewList from '../components/review/review-list';
import Map from '../components/map/map';
import { useAppSelector } from '../hooks/store';
import Card from '../components/card/card';
import { useState } from 'react';

function Offer(): JSX.Element {
  const reviewsState = useAppSelector((state) => state.reviews.items);
  const offersState = useAppSelector((state) => state.offers.items);
  const { id } = useParams();
  const foundOffer = offersState.find((offer) => offer.id === id);
  const otherOffers = offersState
    .filter((offer) => offer.id !== foundOffer!.id)
    .slice(0, 3);

  const [offersData, setOffersData] = useState(otherOffers);

  const handleFavoriteChange = (idOff: string, isFavorite: boolean) => {
    const updatedOffers = offersData.map((offer) => {
      if (offer.id === idOff) {
        return { ...offer, isFavorite };
      }
      return offer;
    });
    setOffersData(updatedOffers);
  };

  useDocumentTitle('Offer');

  if (!foundOffer) {
    return <div>Offer not found</div>;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                {foundOffer.images.map((image) => (
                  <img
                    key={image}
                    className="offer__image"
                    src={image}
                    alt={foundOffer.title}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {foundOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{foundOffer.title}</h1>
                <button
                  className={classNames('offer__bookmark-button', 'button', {
                    'place-card__bookmark-button--active':
                      foundOffer.isFavorite,
                  })}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{ width: `${Math.round(foundOffer.rating) * 20}%` }}
                  >
                  </span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {foundOffer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {capitalizeFirstLetter(foundOffer.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {foundOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {foundOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{foundOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {foundOffer.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={foundOffer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {foundOffer.host.name}
                  </span>
                  <span className="offer__user-status">
                    {foundOffer.host.isPro}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">{foundOffer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{' '}
                  <span className="reviews__amount">{reviewsState.length}</span>
                </h2>
                <ReviewList reviews={reviewsState} />
                <ReviewForm />
              </section>
            </div>
          </div>
          <Map
            key={foundOffer.id}
            className={'offer__map'}
            city={foundOffer.city}
            points={offersState}
            activePoint={id!}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {offersData.map((offer) => (
                <Card
                  key={offer.id}
                  screenName="near-places"
                  offer={offer}
                  handleFavoriteChange={handleFavoriteChange}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
