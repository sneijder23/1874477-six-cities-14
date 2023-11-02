import { MAX_REVIEW_LENGHT } from '../const';
import { Review } from '../types/review';
import ReviewItem from './review-item';

type ReviewListProps = {
  reviews: Review[];
};

function ReviewList({ reviews }: ReviewListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.slice(0, MAX_REVIEW_LENGHT).reverse().map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default ReviewList;
