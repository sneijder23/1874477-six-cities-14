import { AxiosInstance } from 'axios';
import { store } from '../store/index';
import { ServerOffer } from './offer';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ThunkObjType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export type FavoriteStatus = {
  offerId: string;
  status: number;
}

export interface FavoriteOfferResponse extends ServerOffer {
  status: number;
}

export type PostReviewRequest = {
  offerId: string;
  rating: number;
  comment: string;
}
