import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkObjType } from '../../types-ts/store.js';
import { ServerOffer } from '../../types-ts/offer.js';
import { offersAction } from '../slice/offers.js';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../../const.js';
import { store } from '../index.js';

// export const fetchAllOffers = createAsyncThunk<ServerOffer[], undefined, ThunkObjType>(
//   'data/fetchOffers',
//   async (_arg, { extra: api }) => {
//     const response = await api.get<ServerOffer[]>(APIRoute.Offers);
//     return response.data;
//   },
// );

export const fetchAllOffers = createAsyncThunk<void, undefined, ThunkObjType>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(offersAction.setOffersLoadingStatus(true));
    const { data } = await api.get<ServerOffer[]>(APIRoute.Offers);
    dispatch(offersAction.setOffersLoadingStatus(false));
    dispatch(offersAction.setOffers(data));
  }
);

export const fetchOneOffer = createAsyncThunk<ServerOffer, undefined, ThunkObjType>(
  'data/fetchOneOffer',
  async (offerId, { extra: api }) => {
    const response = await api.get<ServerOffer>(`${APIRoute.Offers}/${offerId}`);
    return response.data;
  },
);

export const fetchNearByOffers = createAsyncThunk<ServerOffer, undefined, ThunkObjType>(
  'data/fetchOneOffer',
  async (offerId, { extra: api }) => {
    const response = await api.get<ServerOffer>(`${APIRoute.Offers}/${offerId}`);
    return response.data;
  },
);

export const clearError = createAsyncThunk(
  'data/clearError',
  () => {
    setTimeout(
      () => store.dispatch(offersAction.setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
