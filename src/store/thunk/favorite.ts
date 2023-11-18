import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServerOffer } from '../../types-ts/offer';
import { FavoriteStatus, ThunkObjType } from '../../types-ts/store';
import { APIRoute } from '../../const';

export const fetchFavoriteOffers = createAsyncThunk<ServerOffer[], undefined, ThunkObjType>(
  'data/fetchFavoriteOffers',
  async (_arg, { extra: api }) => {
    const response = await api.get<ServerOffer[]>(APIRoute.Favorites);
    return response.data;
  },
);

export const setFavoriteOffer = createAsyncThunk<ServerOffer[], FavoriteStatus, ThunkObjType>(
  'data/setFavoriteOffer',
  async ({offerId, status}, { extra: api }) => {
    const response = await api.post<ServerOffer[]>(`${APIRoute.Favorites}/${offerId}/${status}`);
    return response.data;
  },
);
