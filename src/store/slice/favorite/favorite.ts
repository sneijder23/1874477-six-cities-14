import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ServerOffer } from '../../../types-ts/offer';
import { fetchFavoriteOffers } from '../../thunk/favorite';
import { NameSpace } from '../../../const';

interface FavoriteOffersState {
  offers: ServerOffer[];
  isOffersLoading: boolean;
  redirectToErrorPage: boolean;
}

const initialState: FavoriteOffersState = {
  offers: [],
  isOffersLoading: false,
  redirectToErrorPage: false,
};

const processSuccess = (state: FavoriteOffersState, action: PayloadAction<ServerOffer[]>) => {
  state.offers = action.payload;
  state.isOffersLoading = false;
};


const processFailed = (state: FavoriteOffersState) => {
  state.isOffersLoading = false;
  state.redirectToErrorPage = true;
};

const processPending = (state: FavoriteOffersState) => {
  state.isOffersLoading = true;
  state.redirectToErrorPage = false;
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
  }
});

export const favoriteAction = { fetchFavoriteOffers };
