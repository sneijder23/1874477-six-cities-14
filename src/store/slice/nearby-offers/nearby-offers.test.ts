import { nearbyOffersSlice } from './nearby-offers';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppThunkDispatch, extractActionsTypes } from '../../../utils/mock-component';
import { State } from '../../../types-ts/store';
import { Action } from '@reduxjs/toolkit';
import { APIRoute } from '../../../const';
import thunk from 'redux-thunk';
import { fetchNearByOffers } from '../../thunk/offers';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../../services/api';
import { makeFakeOffers } from '../../../utils/mocks';

describe('Nearby Offers slice', () => {
  const initialState = {
    offers: [],
    isOffersLoading: false,
    redirectToErrorPage: false,
  };

  it('return initial state if action is empty', () => {
    const emptyAction = { type: '' };
    const expectedState = initialState;

    const result = nearbyOffersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('return initial state if action is undefined', () => {
    const emptyAction = { type: '' };
    const expectedState = initialState;

    const result = nearbyOffersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ NEARBY_OFFER: { offers: [] } });
  });

  describe('fetchNearByOffers', () => {
    it('should dispatch "fetchNearByOffers.pending" and "fetchNearByOffers.fulfilled" with thunk "fetchNearByOffers"', async () => {
      const mockNearbyOffers = makeFakeOffers();

      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/${mockNearbyOffers[0].id}/nearby`)
        .reply(200, mockNearbyOffers);

      await store.dispatch(fetchNearByOffers(mockNearbyOffers[0].id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchNearByOffersFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchNearByOffers.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchNearByOffers.pending.type,
        fetchNearByOffers.fulfilled.type,
      ]);

      expect(fetchNearByOffersFulfilled.payload).toEqual(mockNearbyOffers);
    });

    it('should dispatch "fetchNearByOffers.pending" and "fetchNearByOffers.rejected" when server response 404', async () => {
      const mockNearbyOffers = makeFakeOffers();

      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/${mockNearbyOffers[0].id}/nearby`)
        .reply(400, []);
      await store.dispatch(fetchNearByOffers(mockNearbyOffers[0].id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearByOffers.pending.type,
        fetchNearByOffers.rejected.type,
      ]);
    });
  });
});
