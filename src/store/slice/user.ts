import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { ServerUser } from '../../types-ts/user';
import { checkAuth, login, logout } from '../thunk/auth';

interface UserSlice {
  info: ServerUser | null;
  authStatus: AuthorizationStatus;
}

const initialState: UserSlice = {
  info: null,
  authStatus: AuthorizationStatus.Unknown,
};

function proccesSuccess(state: UserSlice, action: PayloadAction<ServerUser>) {
  state.info = action.payload;
  state.authStatus = AuthorizationStatus.Auth;
}

function proccesFailed(state: UserSlice) {
  state.authStatus = AuthorizationStatus.NoAuth;
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, proccesSuccess);
    builder.addCase(checkAuth.rejected, proccesFailed);
    builder.addCase(login.fulfilled, proccesSuccess);
    builder.addCase(login.rejected, proccesFailed);
    builder.addCase(logout.fulfilled, (state) => {
      state.info = null;
      state.authStatus = AuthorizationStatus.NoAuth;
    });
  },
});

export const userAction = { checkAuth, login, logout };
