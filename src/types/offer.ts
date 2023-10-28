import { City } from './city';
import { Location } from './location';
import { User } from './user';

type ServerOffer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: User;
  id: string;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
}

export type { ServerOffer };
