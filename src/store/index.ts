import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './slice/offers';
import { nearbyOffersSlice } from './slice/neaby-offers';
import { favoriteOffersSlice } from './slice/favorite';
import { reviewsSlice } from './slice/reviews';
import { createAPI } from '../services/api';
import { userSlice } from './slice/user';

export const api = createAPI();

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [nearbyOffersSlice.name]: nearbyOffersSlice.reducer,
  [favoriteOffersSlice.name]: favoriteOffersSlice.reducer,
  [reviewsSlice.name]: reviewsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});


