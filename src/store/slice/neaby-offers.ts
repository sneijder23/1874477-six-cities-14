import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ServerOffer } from '../../types-ts/offer';
import { fetchNearByOffers } from '../thunk/offers';

interface NearbyOffersState {
  offers: ServerOffer[];
  isOffersLoading: boolean;
}

const initialState: NearbyOffersState = {
  offers: [],
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
  name: 'nearbyOffers',
  initialState,
  reducers: {
    setFavorite(state, action: PayloadAction<string>) {
      const offerId = action.payload;
      const foundOffer = state.offers.find((offer) => offer.id === offerId);

      if (foundOffer) {
        foundOffer.isFavorite = !foundOffer.isFavorite;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNearByOffers.pending, processPending);
    builder.addCase(fetchNearByOffers.fulfilled, processSuccess);
    builder.addCase(fetchNearByOffers.rejected, processFailed);

  }
});

export const nearbyOffersExtraAction = { fetchNearByOffers };
export const nearbyOffersAction = nearbyOffersSlice.actions;
