import { NameSpace } from '../../../const';
import { State } from '../../../types-ts/store';
import { AuthorizationStatus } from '../../../const';
import { ServerUser } from '../../../types-ts/user';

export const getAuthorizationStatus = (state: State): boolean => state[NameSpace.User].authStatus === AuthorizationStatus.Auth;
export const getAuthorizationCheckedStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authStatus;
export const getUser = (state: State): ServerUser | null => state[NameSpace.User].userData;
