import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Offers } from '../../mocks/offers';
import { DEFAULT_CITY, SORT_TYPES } from '../../const';
import { ServerOffer } from '../../types-ts/offer';


interface OffersState {
  items: ServerOffer[];
  city: string;
  sortType: string;
}

const initialState: OffersState = {
  items: Offers,
  city: DEFAULT_CITY,
  sortType: SORT_TYPES[0],
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
    setSortType: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload;
    },
  }
});

export const offersAction = offersSlice.actions;

