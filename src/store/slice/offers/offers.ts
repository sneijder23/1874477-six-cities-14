import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace } from '../../../const';
import { ServerOffer } from '../../../types-ts/offer';
import { fetchAllOffers, fetchOneOffer } from '../../thunk/offers';
import { setFavoriteOffer } from '../../thunk/favorite-offers';

interface OffersState {
  offers: ServerOffer[];
  offer?: ServerOffer;
  city: string;
  activePoint?: string;
  isOffersLoading: boolean;
  redirectToErrorPage: boolean;
}

const initialState: OffersState = {
  offers: [],
  offer: undefined,
  city: DEFAULT_CITY,
  activePoint: undefined,
  isOffersLoading: false,
  redirectToErrorPage: false,
};

const processOneOfferSuccess = (state: OffersState, action: PayloadAction<ServerOffer>) => {
  state.offer = action.payload;
  state.isOffersLoading = false;
};

const processSuccess = (state: OffersState, action: PayloadAction<ServerOffer[]>) => {
  state.offers = action.payload;
  state.isOffersLoading = false;
};

const processFailed = (state: OffersState) => {
  state.isOffersLoading = false;
  state.redirectToErrorPage = true;

};

const processPending = (state: OffersState) => {
  state.isOffersLoading = true;
};

export const offersSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    setCitySelect(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setActivePoint(state, action: PayloadAction<string | undefined>) {
      state.activePoint = action.payload;
    },
    resetRedirectToErrorPage: (state) => {
      state.redirectToErrorPage = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllOffers.pending, processPending);
    builder.addCase(fetchAllOffers.fulfilled, processSuccess);
    builder.addCase(fetchAllOffers.rejected, processFailed);
    builder.addCase(fetchOneOffer.pending, processPending);
    builder.addCase(fetchOneOffer.fulfilled, processOneOfferSuccess);
    builder.addCase(fetchOneOffer.rejected, processFailed);
    builder.addCase(setFavoriteOffer.fulfilled, (state, action: PayloadAction<ServerOffer>) => {
      const foundOffer = state.offers.find((offer) => offer.id === action.payload.id);

      if (foundOffer) {
        foundOffer.isFavorite = action.payload.isFavorite;
      }
      if (state.offer) {
        const foundOneOffer = state.offer.id === action.payload.id;
        if (foundOneOffer) {
          state.offer.isFavorite = action.payload.isFavorite;
        }
      }
    });
  },
});

export const offersAction = offersSlice.actions;
