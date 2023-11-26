import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { offersSlice } from './slice/offers/offers';
import { nearbyOffersSlice } from './slice/nearby-offers/nearby-offers';
import { favoriteOffersSlice } from './slice/favorite/favorite-offers';
import { reviewsSlice } from './slice/reviews/reviews';
import { userSlice } from './slice/user/user';

export const rootReducer = combineReducers({
  [NameSpace.Offer]: offersSlice.reducer,
  [NameSpace.NearbyOffer]: nearbyOffersSlice.reducer,
  [NameSpace.Favorite]: favoriteOffersSlice.reducer,
  [NameSpace.Review]: reviewsSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
});
