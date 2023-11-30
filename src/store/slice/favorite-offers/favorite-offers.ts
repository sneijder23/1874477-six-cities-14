import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ServerOffer } from '../../../types-ts/offer';
import { fetchFavoriteOffers, setFavoriteOffer } from '../../thunk/favorite-offers';
import { NameSpace } from '../../../const';
import { FavoriteOfferResponse } from '../../../types-ts/store';

interface FavoriteOffersState {
  offers: ServerOffer[];
  isOffersLoading: boolean;
}

const initialState: FavoriteOffersState = {
  offers: [],
  isOffersLoading: false,
};

const processSuccess = (state: FavoriteOffersState, action: PayloadAction<ServerOffer[]>) => {
  state.offers = action.payload;
  state.isOffersLoading = false;
};


const processFailed = (state: FavoriteOffersState) => {
  state.isOffersLoading = false;
};

const processPending = (state: FavoriteOffersState) => {
  state.isOffersLoading = true;
};

export const favoriteOffersSlice = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavoriteOffers.pending, processPending);
    builder.addCase(fetchFavoriteOffers.fulfilled, processSuccess);
    builder.addCase(fetchFavoriteOffers.rejected, processFailed);
    builder.addCase(setFavoriteOffer.fulfilled, (state, action: PayloadAction<FavoriteOfferResponse>) => {
      const id = action.payload.id;
      if (action.payload.status === 0) {
        state.offers = state.offers.filter((offer) => offer.id !== id);
      }
      if (action.payload.status === 1) {
        state.offers = state.offers.concat(action.payload);
      }
    });
  }
});
