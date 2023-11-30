import { useState, useRef, memo, FormEvent, ChangeEvent } from 'react';
import { MIN_TEXTAREA_LENGTH, MAX_TEXTAREA_LENGTH } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { Rating } from '../rating/rating';
import { getPostingStatus } from '../../store/slice/reviews/selectors';
import { toast } from 'react-toastify';
import { postReview } from '../../store/thunk/review';

function ReviewFormComponent({ id }: { id: string }): JSX.Element {
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const isPosting = useAppSelector(getPostingStatus);
  const initialFormData = {
    rating: '',
    comment: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const offerId = id;
  const isValidate =
    formData.comment.length >= MIN_TEXTAREA_LENGTH &&
    formData.comment.length <= MAX_TEXTAREA_LENGTH &&
    formData.rating !== '' &&
    !isPosting;

  const handleFieldChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const hadleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const rating = parseFloat(formData.rating);
    dispatch(
      postReview({
        offerId,
        rating,
        comment: formData.comment,
      }))
      .unwrap()
      .then(() => {
        setFormData(initialFormData);
      })
      .catch((error: Error) => {
        toast.warn(error.message);
      });
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={hadleFormSubmit}
      ref={formRef}
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
        value={formData.comment}
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
          disabled={!isValidate}
        >
          {isPosting ? 'Submit...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export const ReviewForm = memo(ReviewFormComponent);
