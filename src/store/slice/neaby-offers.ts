import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Offers } from '../../mocks/offers';
import { ServerOffer } from '../../types-ts/offer';

interface NearbyOffersState {
  items: ServerOffer[];
}

const initialState: NearbyOffersState = {
  items: Offers,
};

export const nearbyOffersSlice = createSlice({
  name: 'nearby-offers',
  initialState,
  reducers: {
    addNearbyOffers: (state, action: PayloadAction<ServerOffer[]>) => {
      state.items = action.payload;
    },
  }
});

export const nearbyOffersAction = nearbyOffersSlice.actions;
