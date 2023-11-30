import classNames from 'classnames';
import { memo } from 'react';
import { AppRoute } from '../../const';
import { setFavoriteOffer } from '../../store/thunk/favorite-offers';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { ServerOffer } from '../../types-ts/offer';
import { getAuthorizationStatus } from '../../store/slice/user/selectors';

interface FavoriteButtonProps {
  className?: string;
  bigIcon?: boolean;
  offerState: ServerOffer;
}

function FavoriteButtonComponent({ className, bigIcon, offerState }: FavoriteButtonProps): JSX.Element {
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

  const handleFavoriteClick = () => {
    const updatedFavoriteStatus = !offerState.isFavorite ? 1 : 0;

    dispatch(
      setFavoriteOffer({
        offerId: offerState.id,
        status: updatedFavoriteStatus,
      })
    );

    if (!isAuth) {
      navigate(AppRoute.Login);
    }
  };

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
