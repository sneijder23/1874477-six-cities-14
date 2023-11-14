import { User } from './user';

export type Review = {
  comment: string;
  date: string;
  id: string;
  rating: number;
  user: User;
};
