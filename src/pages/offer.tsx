import { Header } from '../components/header/header';
import { useDocumentTitle } from '../hooks/document-title';
import { useNavigate, useParams } from 'react-router-dom';
import { capitalizeFirstLetter } from '../utils/utils';
import { ReviewsList } from '../components/reviews-list/reviews-list';
import { Map } from '../components/map/map';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { Card } from '../components/card/card';
import { useEffect } from 'react';
import { offersAction } from '../store/slice/offers/offers';
import { LoadingScreen } from './loading-screen';
import { AppRoute, MAX_NEARBY_OFFERS, MAX_PICTURE_OFFER } from '../const';
import { FavoriteButton } from '../components/favorite-button/favorite-button';
import { getReviews } from '../store/slice/reviews/selectors';
import {
  getErrorStatus,
  getOffer,
  getOffersLoadingStatus,
} from '../store/slice/offers/selectors';
import { getNearbyOffers } from '../store/slice/nearby-offers/selectors';
import { OfferHost } from '../components/offer-host/offer-host';
import { OfferRating } from '../components/offer-rating/offer-rating';
import { fetchReviews } from '../store/thunk/review';
import { fetchNearByOffers, fetchOneOffer } from '../store/thunk/offers';

function Offer(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const reviewsState = useAppSelector(getReviews);
  const redirectToErrorPage = useAppSelector(getErrorStatus);
  const offerState = useAppSelector(getOffer);
  const nerbyOffersState = useAppSelector(getNearbyOffers).slice(0, MAX_NEARBY_OFFERS);
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);

  useDocumentTitle('Offer');

  useEffect(() => {
    if (id) {
      dispatch(fetchOneOffer(id));
      dispatch(fetchNearByOffers(id));
      dispatch(fetchReviews(id));
    }
    if (redirectToErrorPage) {
      dispatch(offersAction.resetRedirectToErrorPage());
      navigate(AppRoute.Error);
    }
  }, [dispatch, id, navigate, redirectToErrorPage]);

  if (!offerState || !nerbyOffersState || isOffersLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offerState.images.slice(0, MAX_PICTURE_OFFER).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={image}
                    alt={offerState.title}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offerState.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offerState.title}</h1>
                <FavoriteButton
                  className="offer"
                  bigIcon
                  offerState={offerState}
                />
              </div>
              <OfferRating
                rating={offerState.rating}
                className={'offer'}
                showRatingValue
              />
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {capitalizeFirstLetter(offerState.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offerState.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offerState.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offerState.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offerState.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <OfferHost host={offerState.host} description={offerState.description} />
              <ReviewsList reviews={reviewsState} offerdId={offerState.id} />
            </div>
          </div>
          <Map
            key={offerState.id}
            className={'offer__map'}
            city={offerState.city}
            points={nerbyOffersState}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {nerbyOffersState.map((offer) => (
                <Card
                  key={offer.id}
                  screenName="near-places"
                  offer={offer}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { Offer };
