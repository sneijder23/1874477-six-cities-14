import { configureMockStore } from '@jedmao/redux-mock-store';
import { FavoriteOfferResponse, State } from '../../../types-ts/store';
import { makeFakeOffer, makeFakeOffers } from '../../../utils/mocks';
import { fetchFavoriteOffers, setFavoriteOffer } from '../../thunk/favorite-offers';
import { favoriteOffersSlice } from './favorite-offers';
import { Action } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { AppThunkDispatch, extractActionsTypes } from '../../../utils/mock-component';
import { APIRoute } from '../../../const';
import { createAPI } from '../../../services/api';

describe('Favorite Offers slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      isOffersLoading: false,
    };

    const result = favoriteOffersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      isOffersLoading: false,
    };

    const result = favoriteOffersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isOffersLoading" to "true" with "fetchFavoriteOffers.pending"', () => {
    const expectedState = {
      offers: [],
      isOffersLoading: true,
    };

    const result = favoriteOffersSlice.reducer(undefined, fetchFavoriteOffers.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "offers" to array with offer, "isOffersLoading" to "false" with "fetchFavoriteOffers.fulfilled"', () => {
    const mockFavoriteOffers = makeFakeOffers();
    const expectedState = {
      offers: mockFavoriteOffers,
      isOffersLoading: false,
    };

    const result = favoriteOffersSlice.reducer(
      undefined,
      fetchFavoriteOffers.fulfilled(
        mockFavoriteOffers, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should change "offers" with "setFavoriteOffer.fulfilled"', () => {
    const mockFavoriteOffer = makeFakeOffer();
    const favoriteOfferResponse: FavoriteOfferResponse = {
      ...mockFavoriteOffer,
      status: 1
    };

    const favoriteStatus = {
      offerId: favoriteOfferResponse.id,
      status: favoriteOfferResponse.status,
    };

    const expectedState = {
      offers: [favoriteOfferResponse],
      isOffersLoading: false,
    };

    const result = favoriteOffersSlice.reducer(undefined, setFavoriteOffer.fulfilled(favoriteOfferResponse, '', favoriteStatus));

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
    store = mockStoreCreator({ FAVORITE: { offers: [] } });
  });

  describe('fetchFavoriteOffers', () => {
    it('should dispatch "fetchFavoriteOffers.pending" and "fetchFavoriteOffers.fulfilled" with thunk "fetchFavoriteOffers"', async () => {
      const mockFavoriteOffers = makeFakeOffers();

      mockAxiosAdapter
        .onGet(`${APIRoute.Favorites}`)
        .reply(200, mockFavoriteOffers);

      await store.dispatch(fetchFavoriteOffers());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoriteOffersFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchFavoriteOffers.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteOffers.pending.type,
        fetchFavoriteOffers.fulfilled.type,
      ]);

      expect(fetchFavoriteOffersFulfilled.payload).toEqual(mockFavoriteOffers);
    });

    it('should dispatch "fetchFavoriteOffers.rejected" with thunk "fetchFavoriteOffers" when server response 404', async () => {
      mockAxiosAdapter
        .onGet(`${APIRoute.Favorites}`)
        .reply(404, []);

      await store.dispatch(fetchFavoriteOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteOffers.pending.type,
        fetchFavoriteOffers.rejected.type,
      ]);
    });
  });
});
