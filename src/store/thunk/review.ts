import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServerOffer } from '../../types-ts/offer';
import { Review } from '../../types-ts/review';
import { APIRoute, NameSpace } from '../../const';
import { PostReviewRequest, ThunkObjType } from '../../types-ts/store';

export const fetchReviews = createAsyncThunk<Review[], ServerOffer['id'], ThunkObjType>(
  `${NameSpace.Review}/fetchReviews`,
  async (offerId, { extra: api }) => {
    const response = await api.get<Review[]>(`${APIRoute.Reviews}/${offerId}`);
    return response.data;
  },
);

export const postReview = createAsyncThunk<Review, PostReviewRequest, ThunkObjType>(
  `${NameSpace.Review}/postReview`,
  async ({offerId, comment, rating} , { extra: api }) => {
    const response = await api.post<Review>(`${APIRoute.Reviews}/${offerId}`, { comment, rating });
    return response.data;
  },
);
