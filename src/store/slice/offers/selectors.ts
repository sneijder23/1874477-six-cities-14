import {NameSpace} from '../../../const';
import { ServerOffer } from '../../../types-ts/offer';
import {State} from '../../../types-ts/store';

export const getOffers = (state: State): ServerOffer[] => state[NameSpace.Offer].offers;
export const getOffersLoadingStatus = (state: State): boolean => state[NameSpace.Offer].isOffersLoading;
export const getOffer = (state: State): ServerOffer | undefined => state[NameSpace.Offer].offer;
export const getActivePoint = (state: State): string | undefined => state[NameSpace.Offer].activePoint;
export const getSelectedCity = (state: State): string => state[NameSpace.Offer].city;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Offer].redirectToErrorPage;
