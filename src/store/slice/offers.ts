import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Offers } from '../../mocks/offers';
import { DEFAULT_CITY } from '../../const';
import { ServerOffer } from '../../types-ts/offer';


interface OffersState {
  items: ServerOffer[];
  city: string;
}

const initialState: OffersState = {
  items: Offers,
  city: DEFAULT_CITY,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOffers(state, action: PayloadAction<ServerOffer[]>) {
      state.items = action.payload;
    },
    setCitySelect(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setFavorite(state, action: PayloadAction<string>) {
      const offerId = action.payload;
      const foundOffer = state.items.find((offer) => offer.id === offerId);

      if (foundOffer) {
        foundOffer.isFavorite = !foundOffer.isFavorite;
      }
    },
  }
});

export const offersAction = offersSlice.actions;

