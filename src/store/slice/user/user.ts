import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../../const';
import { ServerUser } from '../../../types-ts/user';
import { checkAuth, login, logout } from '../../thunk/user';

interface UserSlice {
  userData: ServerUser | null;
  authStatus: AuthorizationStatus;
}

const initialState: UserSlice = {
  userData: null,
  authStatus: AuthorizationStatus.Unknown,
};

function proccesSuccess(state: UserSlice, action: PayloadAction<ServerUser>) {
  state.userData = action.payload;
  state.authStatus = AuthorizationStatus.Auth;
}

function proccesFailed(state: UserSlice) {
  state.authStatus = AuthorizationStatus.NoAuth;
}

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, proccesSuccess);
    builder.addCase(checkAuth.rejected, proccesFailed);
    builder.addCase(login.fulfilled, proccesSuccess);
    builder.addCase(login.rejected, proccesFailed);
    builder.addCase(logout.fulfilled, (state) => {
      state.userData = null;
      state.authStatus = AuthorizationStatus.NoAuth;
    });
  },
});

export const userFetch = { checkAuth, login, logout };
