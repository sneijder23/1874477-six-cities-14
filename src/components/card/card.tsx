import { Link } from 'react-router-dom';
import { ServerOffer } from '../../types-ts/offer';
import { capitalizeFirstLetter } from '../../utils/utils';
import { AppRoute } from '../../const';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';

type CardProps = {
  offer: ServerOffer;
  handleFavoriteChange: (id: string, isFavorite: boolean) => void;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  screenName?: string;
} & Pick<HTMLAttributes<HTMLElement>, 'onMouseEnter' | 'onMouseLeave'>;

function Card({
  offer,
  screenName,
  handleFavoriteChange,
  ...props
}: CardProps): JSX.Element {
  const handleFavoriteClick = () => {
    const newIsFavorite = !offer.isFavorite;
    handleFavoriteChange(offer.id, newIsFavorite);
  };

  const cardClass = `${screenName}__card`;
  const cardImageWrapper = `${screenName}__image-wrapper`;
  const isFavoriteScreen = screenName === 'favorites';

  return (
    <article className={`${cardClass} place-card`} {...props}>
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${cardImageWrapper} place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={isFavoriteScreen ? '150' : '260'}
            height={isFavoriteScreen ? '110' : '200'}
            alt="Place image"
          />
        </Link>
      </div>
      <div
        className={classNames(
          { 'favorites__card-info': isFavoriteScreen },
          'place-card__info'
        )}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={handleFavoriteClick}
            className={classNames('place-card__bookmark-button', 'button', {
              'place-card__bookmark-button--active': offer.isFavorite,
            })}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {isFavoriteScreen ? 'In' : 'To'} bookmarks
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(offer.rating) * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(offer.type)}</p>
      </div>
    </article>
  );
}

export default Card;
