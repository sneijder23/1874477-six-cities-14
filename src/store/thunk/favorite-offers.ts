import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServerOffer } from '../../types-ts/offer';
import { FavoriteOfferResponse, FavoriteStatus, ThunkObjType } from '../../types-ts/store';
import { APIRoute, NameSpace } from '../../const';

export const fetchFavoriteOffers = createAsyncThunk<ServerOffer[], undefined, ThunkObjType>(
  `${NameSpace.Favorite}/fetchFavoriteOffers`,
  async (_arg, { extra: api }) => {
    const response = await api.get<ServerOffer[]>(APIRoute.Favorites);
    return response.data;
  },
);

export const setFavoriteOffer = createAsyncThunk<FavoriteOfferResponse, FavoriteStatus, ThunkObjType>(
  `${NameSpace.Favorite}/setFavoriteOffer`,
  async ({offerId, status}, { extra: api }) => {
    const response = await api.post<ServerOffer>(`${APIRoute.Favorites}/${offerId}/${status}`);
    return { ...response.data, status };
  },
);
