import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkObjType } from '../../types-ts/store';
import { ServerOffer } from '../../types-ts/offer';
import { APIRoute } from '../../const';
import { TIMEOUT_SHOW_ERROR } from '../../const';
import { offersAction } from '../slice/offers';


export const fetchAllOffers = createAsyncThunk<ServerOffer[], undefined, ThunkObjType>(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const response = await api.get<ServerOffer[]>(APIRoute.Offers);
    return response.data;
  },
);

export const fetchOneOffer = createAsyncThunk<ServerOffer, ServerOffer['id'], ThunkObjType>(
  'offer/fetchOneOffer',
  async (offerId, { extra: api }) => {
    const response = await api.get<ServerOffer>(`${APIRoute.Offers}/${offerId}`);
    return response.data;
  },
);

export const fetchNearByOffers = createAsyncThunk<ServerOffer[], ServerOffer['id'], ThunkObjType>(
  'nearbyOffers/fetchNearByOffer',
  async (offerId, { extra: api }) => {
    const response = await api.get<ServerOffer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    return response.data;
  },
);

export const clearError = createAsyncThunk('data/clearError', (_arg, { dispatch }) => {
  setTimeout(() => dispatch(offersAction.setError(null)), TIMEOUT_SHOW_ERROR);
});
