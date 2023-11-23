import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ServerOffer } from '../../types-ts/offer';
import { fetchFavoriteOffers, setFavoriteOffer } from '../thunk/favorite';

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
  name: 'favoriteOffers',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavoriteOffers.pending, processPending);
    builder.addCase(fetchFavoriteOffers.fulfilled, processSuccess);
    builder.addCase(fetchFavoriteOffers.rejected, processFailed);
  }
});

export const favoriteOffersExtraAction = { fetchFavoriteOffers, setFavoriteOffer };
export const favoriteOffersAction = favoriteOffersSlice.actions;
