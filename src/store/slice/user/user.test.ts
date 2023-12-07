import MockAdapter from 'axios-mock-adapter';
import { APIRoute, AuthorizationStatus } from '../../../const';
import { fakeServerUser } from '../../../utils/mocks';
import { checkAuth, login, logout } from '../../thunk/user';
import { userSlice } from './user';
import { createAPI } from '../../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { LoginData, State } from '../../../types-ts/store';
import { AppThunkDispatch, extractActionsTypes } from '../../../utils/mock-component';
import * as token from '../../../services/token';

describe('User slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const expectedState = {
      userData: fakeServerUser,
      authStatus: AuthorizationStatus.Unknown,
    };

    const result = userSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const emptyAction = { type: '' };

    const expectedState = {
      userData: null,
      authStatus: AuthorizationStatus.Unknown,
    };

    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "checkAuth.fulfilled" action', () => {
    const initialState = {
      userData: null,
      authStatus: AuthorizationStatus.Unknown
    };

    const expectedState = {
      userData: undefined,
      authStatus: AuthorizationStatus.Auth
    };

    const result = userSlice.reducer(initialState, checkAuth.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "checkAuth.rejected" action', () => {
    const initialState = {
      userData: null,
      authStatus: AuthorizationStatus.Unknown
    };

    const expectedState = {
      userData: null,
      authStatus: AuthorizationStatus.NoAuth
    };

    const result = userSlice.reducer(initialState, checkAuth.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "login.fulfilled" action', () => {
    const initialState = {
      userData: null,
      authStatus: AuthorizationStatus.Unknown
    };

    const expectedState = {
      userData: undefined,
      authStatus: AuthorizationStatus.Auth
    };

    const result = userSlice.reducer(initialState, login.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "login.rejected" action', () => {
    const initialState = {
      userData: null,
      authStatus: AuthorizationStatus.Unknown
    };

    const expectedState = {
      userData: null,
      authStatus: AuthorizationStatus.NoAuth
    };

    const result = userSlice.reducer(initialState, login.rejected);

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
    store = mockStoreCreator({ USER: { userData: null } });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuth());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuth.pending.type,
        checkAuth.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuth());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuth.pending.type,
        checkAuth.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "loginAction.fulfilled" when server response 200', async () => {
      const fakeUser: LoginData = { email: 'test@gmail.com', password: 'abcdw12' };
      const fakeServerReply = { token: 'token' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReply);

      await store.dispatch(login(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        login.pending.type,
        login.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: LoginData = { email: 'test@test.ru', password: '123abc' };
      const fakeServerReply = { token: 'token' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReply);
      const mockSaveToken = vi.spyOn(token, 'saveToken');

      await store.dispatch(login(fakeUser));

      expect(mockSaveToken).toHaveBeenCalledTimes(1);
      expect(mockSaveToken).toHaveBeenCalledWith(fakeServerReply.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logout());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logout.pending.type,
        logout.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockSaveToken = vi.spyOn(token, 'dropToken');

      await store.dispatch(logout());

      expect(mockSaveToken).toHaveBeenCalledTimes(1);
    });
  });
});
