import { User } from './user';

type Review = {
  comment: string;
  date: string;
  id: string;
  rating: number;
  user: User;
};

export type { Review };
