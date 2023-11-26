import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkObjType } from '../../types-ts/store';
import { APIRoute, NameSpace } from '../../const';
import { LoginData, ServerUser } from '../../types-ts/user';
import { dropToken, saveToken } from '../../services/token';

export const checkAuth = createAsyncThunk<ServerUser, undefined, ThunkObjType>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, { extra: api }) => {
    const response = await api.get<ServerUser>(APIRoute.Login);
    return response.data;
  },
);

export const login = createAsyncThunk<ServerUser, LoginData, ThunkObjType>(
  `${NameSpace.User}/login`,
  async (body, { extra: api }) => {
    const response = await api.post<ServerUser>(APIRoute.Login, body);
    saveToken(response.data.token);
    return response.data;
  },
);

export const logout = createAsyncThunk<void, undefined, ThunkObjType>(
  `${NameSpace.User}/logout`,
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout).then(dropToken);
  },
);
