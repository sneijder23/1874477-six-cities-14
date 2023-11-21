import { Header } from '../components/header/header';
import { useDocumentTitle } from '../hooks/document-title';
import { useNavigate, useParams } from 'react-router-dom';
import { capitalizeFirstLetter } from '../utils/utils';
import { ReviewForm } from '../components/review/review-form';
import { ReviewList } from '../components/review/review-list';
import { Map } from '../components/map/map';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { Card } from '../components/card/card';
import { useCallback, useEffect } from 'react';
import { offersAction, offersExtraAction } from '../store/slice/offers';
import {
  nearbyOffersAction,
  nearbyOffersExtraAction,
} from '../store/slice/neaby-offers';
import { Spinner } from './loading-screen';
import { AppRoute, AuthorizationStatus } from '../const';
import { favoriteOffersExtraAction } from '../store/slice/favorite';
import { FavoriteButton } from '../components/favorite/favorite-button';
import { reviewsExtraAction } from '../store/slice/reviews';

function Offer(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const reviewsState = useAppSelector((state) => state.reviews.reviews);
  const redirectToErrorPage = useAppSelector((state) => state.offers.redirectToErrorPage);
  const offersState = useAppSelector((state) => state.offers.offer);
  const nerbyOffersState = useAppSelector((state) => state.nearbyOffers.offers);
  const isOffersLoading = useAppSelector(
    (state) => state.offers.isOffersLoading
  );
  const isAuth = useAppSelector(
    (state) => state.user.authStatus === AuthorizationStatus.Auth
  );

  const handleFavoriteClick = useCallback(() => {
    if (offersState) {
      const updatedFavoriteStatus = !offersState.isFavorite ? 1 : 0;

      dispatch(offersAction.setOneOfferFavorite(offersState));
      dispatch(
        favoriteOffersExtraAction.setFavoriteOffer({
          offerId: offersState.id,
          status: updatedFavoriteStatus,
        })
      );
      dispatch(favoriteOffersExtraAction.fetchFavoriteOffers());

      if (!isAuth) {
        navigate(AppRoute.Login);
      }
    }
  }, [dispatch, isAuth, navigate, offersState]);

  const handleFavoriteChange = useCallback(
    (offerId: string) => {
      dispatch(nearbyOffersAction.setFavorite(offerId));
      const foundOffer = nerbyOffersState.find((offer) => offer.id === offerId);
      if (foundOffer) {
        const favoriteStatus = foundOffer.isFavorite ? 0 : 1;
        dispatch(
          favoriteOffersExtraAction.setFavoriteOffer({
            offerId: offerId,
            status: favoriteStatus,
          })
        );
        dispatch(favoriteOffersExtraAction.fetchFavoriteOffers());
      }
      if (!isAuth) {
        navigate(AppRoute.Login);
      }
    },
    [dispatch, isAuth, navigate, nerbyOffersState]
  );

  useDocumentTitle('Offer');

  useEffect(() => {
    if (redirectToErrorPage) {
      dispatch(offersAction.resetRedirectToErrorPage());
      navigate(AppRoute.Error);
    }
  }, [dispatch, navigate, redirectToErrorPage]);

  useEffect(() => {
    if (id) {
      dispatch(offersExtraAction.fetchOneOffer(id));
      dispatch(nearbyOffersExtraAction.fetchNearByOffers(id));
      dispatch(reviewsExtraAction.fetchReviews(id));
    }
  }, [dispatch, id]);

  if (!offersState || !nerbyOffersState || isOffersLoading) {
    return <Spinner />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                {offersState.images.map((image) => (
                  <img
                    key={image}
                    className="offer__image"
                    src={image}
                    alt={offersState.title}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offersState.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offersState.title}</h1>
                <FavoriteButton className="offer" bigIcon isActive={offersState.isFavorite} isAuth={isAuth} handleFavoriteClick={handleFavoriteClick}/>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{
                      width: `${Math.round(offersState.rating) * 20}%`,
                    }}
                  >
                  </span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offersState.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {capitalizeFirstLetter(offersState.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offersState.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offersState.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offersState.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offersState.goods.map((good) => (
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
                      src={offersState.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {offersState.host.name}
                  </span>
                  <span className="offer__user-status">
                    {offersState.host.isPro}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offersState.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{' '}
                  <span className="reviews__amount">{reviewsState.length}</span>
                </h2>
                <ReviewList reviews={reviewsState} />
                {isAuth && <ReviewForm id={offersState.id} />}
              </section>
            </div>
          </div>
          <Map
            key={offersState.id}
            className={'offer__map'}
            city={offersState.city}
            points={nerbyOffersState}
            activePoint={id!}
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
                  isAuth={isAuth}
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

export { Offer };
