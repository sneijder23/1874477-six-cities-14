import { useState, useRef, memo } from 'react';
import { MIN_TEXTAREA_LENGTH, MAX_TEXTAREA_LENGTH } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { reviewsExtraAction } from '../../store/slice/reviews/reviews';
import { Rating } from '../rating/rating';
import { getPostingStatus } from '../../store/slice/reviews/selectors';
import { toast } from 'react-toastify';

function ReviewFormComponent({ id }: { id: string }): JSX.Element {
  const initialFormData = {
    rating: '',
    comment: '',
  };
  const offerId = id;
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const isPosting = useAppSelector(getPostingStatus);
  const [formData, setFormData] = useState(initialFormData);
  const isValidate =
    formData.comment.length < MIN_TEXTAREA_LENGTH ||
    formData.comment.length > MAX_TEXTAREA_LENGTH ||
    formData.rating === '' ||
    isPosting;

  const handleFieldChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const hadleFormSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    const rating = parseFloat(formData.rating);
    dispatch(
      reviewsExtraAction.postReview({
        offerId,
        rating,
        comment: formData.comment,
      })
    ).unwrap()
      .then(() => {
        dispatch(reviewsExtraAction.fetchReviews(offerId));
        setFormData(initialFormData);
        formRef.current?.reset();
      })
      .catch((error: Error) => {
        toast.warn(error.message);
      });
  };

  return (
    <form
      onSubmit={hadleFormSubmit}
      ref={formRef}
      className="reviews__form form"
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="comment">
        Your review
      </label>
      <Rating
        rating={formData.rating}
        handleFieldChange={handleFieldChange}
        postingStatus={isPosting}
      />
      <textarea
        onChange={handleFieldChange}
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        minLength={50}
        maxLength={300}
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isPosting}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isValidate}
        >
          {isPosting ? 'Submit...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export const ReviewForm = memo(ReviewFormComponent);
