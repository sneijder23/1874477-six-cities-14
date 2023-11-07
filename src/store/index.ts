import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './slice/offers';
import { nearbyOffersSlice } from './slice/neaby-offers';
import { favoriteOffersSlice } from './slice/favorite-offers';
import { reviewsSlice } from './slice/reviews';

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [nearbyOffersSlice.name]: nearbyOffersSlice.reducer,
  [favoriteOffersSlice.name]: favoriteOffersSlice.reducer,
  [reviewsSlice.name]: reviewsSlice.reducer,
});

export const store = configureStore({reducer});

