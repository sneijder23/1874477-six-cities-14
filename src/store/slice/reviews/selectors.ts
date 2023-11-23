import { NameSpace } from '../../../const';
import { Review } from '../../../types-ts/review';
import { State } from '../../../types-ts/store';

export const getReviews = (state: State): Review[] => state[NameSpace.Review].reviews;
export const getPostingStatus = (state: State): boolean => state[NameSpace.Review].isPosting;
