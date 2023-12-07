import { Fragment, ChangeEventHandler, memo } from 'react';
import { RatingMap } from '../../const';

type RatingProps = {
  rating: string;
  handleFieldChange: ChangeEventHandler<HTMLInputElement>;
  postingStatus: boolean;

};

function RatingComponent({ rating, postingStatus, handleFieldChange }: RatingProps): JSX.Element {
  return (
    <div className="reviews__rating-form form__rating">
      {Object.entries(RatingMap)
        .reverse()
        .map(([score, title]) => (
          <Fragment key={score}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={score}
              id={`${score}-stars`}
              type="radio"
              checked={rating === score}
              onChange={handleFieldChange}
              disabled={postingStatus}
            />
            <label
              htmlFor={`${score}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33" data-testid="rating-star">
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
    </div>
  );
}

export const Rating = memo(RatingComponent);
