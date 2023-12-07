import { DEFAULT_CITY } from '../../../const';
import { offersAction, offersSlice } from './offers';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppThunkDispatch, extractActionsTypes } from '../../../utils/mock-component';
import { State } from '../../../types-ts/store';
import { Action } from '@reduxjs/toolkit';
import { APIRoute } from '../../../const';
import thunk from 'redux-thunk';
import { fetchAllOffers, fetchOneOffer } from '../../thunk/offers';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../../services/api';
import { makeFakeOffer, makeFakeOffers } from '../../../utils/mocks';

describe('Offers slice', () => {
  const initialState = {
    offers: [],
    offer: undefined,
    city: DEFAULT_CITY,
    activePoint: undefined,
    isOffersLoading: false,
    redirectToErrorPage: false,
  };

  it('return initial state if action is empty', () => {
    const emptyAction = { type: '' };
    const expectedState = initialState;

    const result = offersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('return initial state if action is undefined', () => {
    const emptyAction = { type: '' };
    const expectedState = initialState;

    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('change selected city correctly', () => {
    const newCity = 'Cologne';

    const result = offersSlice.reducer(initialState, offersAction.setCitySelect(newCity));

    expect(result.city).toBe(newCity);
  });


  it('change active point correctly', () => {
    const newActivePoint = '123';

    const result = offersSlice.reducer(initialState, offersAction.setActivePoint(newActivePoint));

    expect(result.activePoint).toBe(newActivePoint);
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
    store = mockStoreCreator({ OFFER: { offers: [] } });
  });

  describe('fetchAllOffers', () => {
    it('should dispatch "fetchAllOffers.pending" and "fetchAllOffers.fulfilled" with thunk "fetchAllOffers"', async () => {
      const mockOffers = makeFakeOffers();

      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}`)
        .reply(200, mockOffers);

      await store.dispatch(fetchAllOffers());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchAllOffers.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchAllOffers.pending.type,
        fetchAllOffers.fulfilled.type,
      ]);

      expect(fetchOffersFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchAllOffers.pending" and "fetchAllOffers.rejected" when server response 404', async () => {
      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}`)
        .reply(400, []);
      await store.dispatch(fetchAllOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchAllOffers.pending.type,
        fetchAllOffers.rejected.type,
      ]);
    });
  });

  describe('fetchOneOffer', () => {
    it('should dispatch "fetchOneOffer.pending" and "fetchOneOffer.fulfilled" with thunk "fetchOneOffer"', async () => {
      const mockOffer = makeFakeOffer();

      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/${mockOffer.id}`)
        .reply(200, mockOffer);

      await store.dispatch(fetchOneOffer(mockOffer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOneOfferFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchOneOffer.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchOneOffer.pending.type,
        fetchOneOffer.fulfilled.type,
      ]);

      expect(fetchOneOfferFulfilled.payload).toEqual(mockOffer);
    });

    it('should dispatch "fetchOneOffer.pending" and "fetchOneOffer.rejected" when server response 404', async () => {
      const mockOffer = makeFakeOffer();

      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}`)
        .reply(400, []);
      await store.dispatch(fetchOneOffer(mockOffer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOneOffer.pending.type,
        fetchOneOffer.rejected.type,
      ]);
    });
  });
});
