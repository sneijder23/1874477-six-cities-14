import { AxiosInstance } from 'axios';
import { store } from '../store/index';

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
