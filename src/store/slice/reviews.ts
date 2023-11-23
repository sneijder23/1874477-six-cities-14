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

const processPostPending = (state: ReviewsState) => {
  state.isPosting = true;
};

const processPostSuccess = (state: ReviewsState) => {
  state.isPosting = false;
};

const processPostFailed = (state: ReviewsState) => {
  state.isPosting = false;
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReviews.rejected, (state) => {
      state.reviews = [];
    });
    builder.addCase(fetchReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    });
    builder.addCase(postReview.pending, processPostPending);
    builder.addCase(postReview.fulfilled, processPostSuccess);
    builder.addCase(postReview.rejected, processPostFailed);
  }
});

export const reviewsExtraAction = { fetchReviews, postReview };
export const reviewssAction = reviewsSlice.actions;
