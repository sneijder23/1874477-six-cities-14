import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ServerOffer } from '../../../types-ts/offer';
import { fetchNearByOffers } from '../../thunk/offers';
import { NameSpace } from '../../../const';
import { setFavoriteOffer } from '../../thunk/favorite-offers';

interface NearbyOffersState {
  offers: ServerOffer[];
  isOffersLoading: boolean;
  redirectToErrorPage: boolean;
}

const initialState: NearbyOffersState = {
  offers: [],
  isOffersLoading: false,
  redirectToErrorPage: false,
};

const processSuccess = (state: NearbyOffersState, action: PayloadAction<ServerOffer[]>) => {
  state.offers = action.payload;
  state.isOffersLoading = false;
};


const processFailed = (state: NearbyOffersState) => {
  state.isOffersLoading = false;
  state.redirectToErrorPage = true;
};

const processPending = (state: NearbyOffersState) => {
  state.isOffersLoading = true;
  state.redirectToErrorPage = false;
};

export const nearbyOffersSlice = createSlice({
  name: NameSpace.NearbyOffer,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNearByOffers.pending, processPending);
    builder.addCase(fetchNearByOffers.fulfilled, processSuccess);
    builder.addCase(fetchNearByOffers.rejected, processFailed);
    builder.addCase(setFavoriteOffer.fulfilled, (state, action: PayloadAction<ServerOffer>) => {
      const foundOffer = state.offers.find((offer) => offer.id === action.payload.id);
      if (foundOffer) {
        foundOffer.isFavorite = action.payload.isFavorite;
      }
    });
  }
});
