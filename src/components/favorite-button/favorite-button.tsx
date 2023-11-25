import classNames from 'classnames';
import { memo, useCallback } from 'react';
import { AppRoute } from '../../const';
import { toast } from 'react-toastify';
import { setFavoriteOffer } from '../../store/thunk/favorite-offers';
import { offersAction } from '../../store/slice/offers/offers';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { ServerOffer } from '../../types-ts/offer';
import { favoriteAction } from '../../store/slice/favorite/favorite-offers';
import { nearbyOffersAction } from '../../store/slice/nearby-offers/nearby-offers';
import { getAuthorizationStatus } from '../../store/slice/user/selectors';

interface FavoriteButtonProps {
  className?: string;
  bigIcon?: boolean;
  offerState: ServerOffer;
  offer?: boolean;
  offers?: boolean;
  nearbyOffers?: boolean;
}

function FavoriteButtonComponent({
  className,
  bigIcon,
  offerState,
  offers,
  offer,
  nearbyOffers,
}: FavoriteButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(getAuthorizationStatus);
  const isActiveButton = offerState.isFavorite && isAuth;
  const iconText = `${isActiveButton ? 'In' : 'To'} bookmarks`;
  const width = bigIcon ? '31' : '18';
  const height = bigIcon ? '33' : '19';
  const iconStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };
  const classNameButton = className ? `${className}` : 'place-card';

  const handleFavoriteClick = useCallback(() => {
    if (offerState) {
      const updatedFavoriteStatus = !offerState.isFavorite ? 1 : 0;

      dispatch(
        setFavoriteOffer({
          offerId: offerState.id,
          status: updatedFavoriteStatus,
        })
      )
        .unwrap()
        .then(() => {
          if (offer) {
            dispatch(offersAction.setOneOfferFavorite());
          }

          if (offers) {
            dispatch(offersAction.setFavorite(offerState.id));
          }

          if (nearbyOffers) {
            dispatch(nearbyOffersAction.setFavorite(offerState.id));
          }
        })
        .then(() => dispatch(favoriteAction.fetchFavoriteOffers()))
        .catch((error: Error) => {
          toast.error(`Please login to add to favorites ${error.message}`);
        });
    }

    if (!isAuth) {
      navigate(AppRoute.Login);
    }
  }, [offerState, isAuth, dispatch, offer, offers, nearbyOffers, navigate]);

  return (
    <button
      className={classNames(
        `${classNameButton}__bookmark-button`,
        `${classNameButton}__button`,
        'button',
        {
          [`${classNameButton}__bookmark-button--active`]: isActiveButton,
        }
      )}
      type="button"
      onClick={handleFavoriteClick}
    >
      <svg className={`${classNameButton}__bookmark-icon`} style={iconStyle}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{iconText}</span>
    </button>
  );
}

export const FavoriteButton = memo(FavoriteButtonComponent);
