import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../../services/api';
import { fetchReviews, postReview } from '../../thunk/review';
import { reviewsSlice } from './reviews';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppThunkDispatch, extractActionsTypes } from '../../../utils/mock-component';
import { State } from '../../../types-ts/store';
import { Action } from '@reduxjs/toolkit';
import { APIRoute } from '../../../const';
import thunk from 'redux-thunk';
import { makeFakeOffer, makeFakeReview } from '../../../utils/mocks';

describe('Reviews slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const expectedState = {
      reviews: [],
      isPosting: false,
    };

    const result = reviewsSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const emptyAction = { type: '' };

    const expectedState = {
      reviews: [],
      isPosting: false,
    };

    const result = reviewsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isPosting" with "postReview.pending" action', () => {
    const initialState = {
      reviews: [],
      isPosting: false,
    };

    const expectedState = {
      reviews: [],
      isPosting: true,
    };

    const result = reviewsSlice.reducer(initialState, postReview.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "isPosting" with "postReview.fulfilled" action', () => {
    const initialState = {
      reviews: [],
      isPosting: true,
    };

    const expectedState = {
      reviews: [undefined],
      isPosting: false,
    };

    const result = reviewsSlice.reducer(initialState, postReview.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should set "isPosting" with "postReview.rejected" action', () => {
    const initialState = {
      reviews: [],
      isPosting: true,
    };

    const expectedState = {
      reviews: [],
      isPosting: false,
    };

    const result = reviewsSlice.reducer(initialState, postReview.rejected);

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
    store = mockStoreCreator({ REVIEW: { reviews: [] } });
  });

  describe('fetchReviews', () => {
    it('should dispatch "fetchReviews.pending" and "fetchReviews.fulfilled" with thunk "fetchReviews"', async () => {
      const mockReviews = Array.from({ length: 3 }, () => makeFakeReview());
      const mockOfferId = makeFakeOffer().id;

      mockAxiosAdapter
        .onGet(`${APIRoute.Reviews}/${mockOfferId}`)
        .reply(200, mockReviews);

      await store.dispatch(fetchReviews(mockOfferId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchReviews.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchReviews.pending.type,
        fetchReviews.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload).toEqual(mockReviews);
    });

    it('should dispatch "fetchReviews.pending" and "fetchReviews.rejected" when server response 404', async () => {
      const mockOfferId = makeFakeOffer().id;

      mockAxiosAdapter
        .onGet(`${APIRoute.Reviews}/${mockOfferId}`)
        .reply(400, []);
      await store.dispatch(fetchReviews(mockOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviews.pending.type,
        fetchReviews.rejected.type,
      ]);
    });
  });
});
