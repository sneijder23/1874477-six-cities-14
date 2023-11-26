import { memo } from 'react';
import { ServerOffer } from '../../types-ts/offer';

type OfferRatingProps = {
  className: string;
  rating: ServerOffer['rating'];
  showRatingValue?: boolean;
};

function OfferRatingComponent({ className, showRatingValue, rating }: OfferRatingProps): JSX.Element {
  return (
    <div className={`${className}__rating rating`}>
      <div className={`${className}__stars rating__stars`}>
        <span
          style={{ width: `${Math.round(rating) * 20}%` }}
        >
        </span>
        <span className="visually-hidden">Rating</span>
      </div>
      {showRatingValue &&
      <span className="offer__rating-value rating__value">
        {rating}
      </span>}
    </div>
  );
}

export const OfferRating = memo(OfferRatingComponent);
