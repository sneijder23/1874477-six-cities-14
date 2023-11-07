import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comments } from '../../mocks/reviews';
import { Review } from '../../types-ts/review';

interface ReviewsState {
  items: Review[];
}

const initialState: ReviewsState = {
  items: Comments,
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReviewList(state, action: PayloadAction<Review[]>) {
      state.items = action.payload;
    },
    addReviewItem(state, action: PayloadAction<Review[]>) {
      state.items = [...state.items, action.payload] as Review[];
    },
  }
});

export const reviewssAction = reviewsSlice.actions;
