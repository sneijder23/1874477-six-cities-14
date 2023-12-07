import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '../types-ts/store';
import { createAPI } from '../services/api';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;

export type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {}
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component} </Provider>,
    mockStore,
    mockAxiosAdapter
  });
}
