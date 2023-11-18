import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ServerOffer } from '../../types-ts/offer';
import { fetchNearByOffers } from '../thunk/offers';

interface NearbyOffersState {
  offers: ServerOffer[] | null;
  isOffersLoading: boolean;
}

const initialState: NearbyOffersState = {
  offers: null,
  isOffersLoading: false,
};

const processSuccess = (state: NearbyOffersState, action: PayloadAction<ServerOffer[]>) => {
  state.offers = action.payload;
  state.isOffersLoading = false;
};


const processFailed = (state: NearbyOffersState) => {
  state.isOffersLoading = false;
};

const processPending = (state: NearbyOffersState) => {
  state.isOffersLoading = true;
};

export const nearbyOffersSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchNearByOffers.pending, processPending);
    builder.addCase(fetchNearByOffers.fulfilled, processSuccess);
    builder.addCase(fetchNearByOffers.rejected, processFailed);

  },
  name: 'nearbyOffers',
  initialState,
  reducers: {
  }
});

export const nearbyOffersAction = { fetchNearByOffers };
export const nearbyOffersActionSlice = nearbyOffersSlice.actions;
