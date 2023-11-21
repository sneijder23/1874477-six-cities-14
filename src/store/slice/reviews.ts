import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Review } from '../../types-ts/review';
import { fetchReviews, postReview } from '../thunk/review';

interface ReviewsState {
  reviews: Review[];
  isPosting: boolean;
}

const initialState: ReviewsState = {
  reviews: [],
  isPosting: false,
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReviewList(state, action: PayloadAction<Review[]>) {
      state.reviews = action.payload;
    },
    addReviewItem(state, action: PayloadAction<Review[]>) {
      state.reviews = [...state.reviews, action.payload] as Review[];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReviews.rejected, (state) => {
      state.reviews = [];
    });
    builder.addCase(fetchReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    });
    builder.addCase(postReview.pending, (state) => {
      state.isPosting = true;
    });
    builder.addCase(postReview.fulfilled, (state, action) => {
      const offerId = action.meta.arg.offerId;

      state.isPosting = false;
      fetchReviews(offerId);
    });
  }
});

export const reviewsExtraAction = {fetchReviews, postReview};
export const reviewssAction = reviewsSlice.actions;
