import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkObjType } from '../../types-ts/store';
import { ServerOffer } from '../../types-ts/offer';
import { APIRoute, NameSpace } from '../../const';

export const fetchAllOffers = createAsyncThunk<ServerOffer[], undefined, ThunkObjType>(
  `${NameSpace.Offer}/fetchOffers`,
  async (_arg, { extra: api }) => {
    const response = await api.get<ServerOffer[]>(APIRoute.Offers);
    return response.data;
  },
);

export const fetchOneOffer = createAsyncThunk<ServerOffer, ServerOffer['id'], ThunkObjType>(
  `${NameSpace.Offer}/fetchOneOffer`,
  async (offerId, { extra: api }) => {
    const response = await api.get<ServerOffer>(`${APIRoute.Offers}/${offerId}`);
    return response.data;
  },
);

export const fetchNearByOffers = createAsyncThunk<ServerOffer[], ServerOffer['id'], ThunkObjType>(
  `${NameSpace.NearbyOffer}fetchNearByOffer`,
  async (offerId, { extra: api }) => {
    const response = await api.get<ServerOffer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    return response.data;
  },
);
