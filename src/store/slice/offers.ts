import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../../const';
import { ServerOffer } from '../../types-ts/offer';
import { fetchAllOffers } from '../thunk/offers';


interface OffersState {
  items: ServerOffer[];
  city: string;
  activePoint?: string;
  isOffersLoading: boolean;
  error: string | null;
}

const initialState: OffersState = {
  items: [],
  city: DEFAULT_CITY,
  activePoint: undefined,
  isOffersLoading: true,
  error: null,
};

function proccesSuccess(state: OffersState, action: PayloadAction<ServerOffer[]>) {
  state.items = action.payload;
  state.isOffersLoading = false;
}

function proccesFailed(state: OffersState) {
  state.isOffersLoading = false;
}

function proccesPending(state: OffersState) {
  state.isOffersLoading = true;
}

export const offersSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchAllOffers.fulfilled, proccesSuccess);
    builder.addCase(fetchAllOffers.rejected, proccesFailed);
    builder.addCase(fetchAllOffers.pending, proccesPending);
  },
  name: 'offers',
  initialState,
  reducers: {
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
    setActivePoint(state, action: PayloadAction<string>) {
      state.activePoint = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  }
});

export const offersExtAction = { fetchAllOffers };
export const offersAction = offersSlice.actions;
