import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Offers } from '../../mocks/offers';
import { ServerOffer } from '../../types-ts/offer';

interface FavoriteState {
  items: ServerOffer[];
}

const initialState: FavoriteState = {
  items: Offers,
};

export const favoriteOffersSlice = createSlice({
  name: 'favorite-offers',
  initialState,
  reducers: {
    setFavoriteOffers(state, action: PayloadAction<ServerOffer[]>) {
      state.items = action.payload;
    },
    removeFavoriteOffers(state, action: PayloadAction<ServerOffer>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id
      );
    },
  }
});

export const favoriteOffersAction = favoriteOffersSlice.actions;
