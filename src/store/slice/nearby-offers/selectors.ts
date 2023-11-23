import { NameSpace } from '../../../const';
import { ServerOffer } from '../../../types-ts/offer';
import {State} from '../../../types-ts/store';

export const getNearbyOffers = (state: State): ServerOffer[] => state[NameSpace.NearbyOffer].offers;
export const getNearbyOffersLoadingStatus = (state: State): boolean => state[NameSpace.NearbyOffer].isOffersLoading;
