import { memo } from 'react';
import { MAX_REVIEW_LENGTH } from '../../const';
import { Review } from '../../types-ts/review';
import { ReviewItem } from '../review-item/review-item';
import { useAppSelector } from '../../hooks/store';
import { getAuthorizationStatus } from '../../store/slice/user/selectors';
import { ReviewForm } from '../review-form/review-form';
import { ServerOffer } from '../../types-ts/offer';

type ReviewListProps = {
  reviews: Review[];
  offerdId: ServerOffer['id'];
};

function ReviewsListComponent({ reviews, offerdId }: ReviewListProps): JSX.Element {
  const isAuth = useAppSelector(getAuthorizationStatus);
  const sortedReviews = [...reviews].sort((review1, review2) => {
    const date1 = new Date(review1.date);
    const date2 = new Date(review2.date);
    return date2.getTime() - date1.getTime();
  });

  const limitReviews = sortedReviews.slice(0, MAX_REVIEW_LENGTH);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {limitReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
      {isAuth && <ReviewForm id={offerdId} />}
    </section>
  );
}

export const ReviewsList = memo(ReviewsListComponent);
