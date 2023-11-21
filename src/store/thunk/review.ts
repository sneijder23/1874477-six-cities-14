import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServerOffer } from '../../types-ts/offer';
import { Review } from '../../types-ts/review';
import { APIRoute } from '../../const';
import { ThunkObjType } from '../../types-ts/store';

export const fetchReviews = createAsyncThunk<Review[], ServerOffer['id'], ThunkObjType>(
  'review/fetchReviews',
  async (offerId, { extra: api }) => {
    const response = await api.get<Review[]>(`${APIRoute.Reviews}/${offerId}`);
    return response.data;
  },
);

export const postReview = createAsyncThunk<Review['comment' | 'rating'], { offerId: ServerOffer['id']; rating: number; comment: string }, ThunkObjType>(
  'review/postReview',
  async (payload, { extra: api }) => {
    const { offerId, rating, comment } = payload;
    const response = await api.post<Review['comment' | 'rating']>(`${APIRoute.Reviews}/${offerId}`, { rating, comment });
    return response.data;
  },
);
