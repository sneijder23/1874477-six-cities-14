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
  name: 'favoriteOffers',
  initialState,
  reducers: {
    setFavorite(state, action: PayloadAction<string>) {
      const offerId = action.payload;
      const foundOffer = state.items.find((offer) => offer.id === offerId);

      if (foundOffer) {
        foundOffer.isFavorite = !foundOffer.isFavorite;
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      const offerId = action.payload;
      const foundIndex = state.items.findIndex((offer) => offer.id === offerId);

      if (foundIndex !== -1) {
        state.items[foundIndex].isFavorite = false;
      }
    },
  }
});

export const favoriteOffersAction = favoriteOffersSlice.actions;
