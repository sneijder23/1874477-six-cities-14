import { store } from '../store';
import { clearError } from '../store/thunk/offers';
import { offersAction } from '../store/slice/offers';

export const processErrorHandle = (message: string): void => {
  store.dispatch(offersAction.setError(message));
  store.dispatch(clearError());
};
