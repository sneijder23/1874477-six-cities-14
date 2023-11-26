import { memo } from 'react';
import { MAX_REVIEW_LENGHT } from '../../const';
import { Review } from '../../types-ts/review';
import { ReviewItem } from '../review-item/review-item';

type ReviewListProps = {
  reviews: Review[];
};

function ReviewsListComponent({ reviews }: ReviewListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews
        .slice(0, MAX_REVIEW_LENGHT)
        .reverse()
        .map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
    </ul>
  );
}

export const ReviewsList = memo(ReviewsListComponent);
