import { NameSpace } from '../../../const';
import { ServerOffer } from '../../../types-ts/offer';
import {State} from '../../../types-ts/store';

export const getFavoriteOffers = (state: State): ServerOffer[] => state[NameSpace.Favorite].offers;
export const getFavoriteOffersCount = (state: State): number => state[NameSpace.Favorite].offers.length;
export const getFavoriteLoadingStatus = (state: State): boolean => state[NameSpace.Favorite].isOffersLoading;
