import { City } from '../types-ts/city';
import { ServerOffer } from '../types-ts/offer';
import { Location } from '../types-ts/location';
import faker from 'faker';
import { Review } from '../types-ts/review';
import { ServerUser, User } from '../types-ts/user';
import { AuthorizationStatus, DEFAULT_CITY } from '../const';
import { State } from '../types-ts/store';
import { getRandomCity } from './utils';

const randomNumber = Math.floor(Math.random() * 100) + 1;

const fakeLocation: Location = {
  latitude: parseFloat(faker.address.latitude()),
  longitude: parseFloat(faker.address.longitude()),
  zoom: faker.datatype.number({ min: 8, max: 12 }),
};

export const fakeCity: City = {
  location: fakeLocation,
  name: getRandomCity().name,
};

const fakeUser: User = {
  name: faker.name.findName(),
  avatarUrl: faker.image.avatar(),
  isPro: faker.datatype.boolean(),
};

export const fakeServerUser: ServerUser = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  avatarUrl: faker.image.avatar(),
  isPro: faker.datatype.boolean(),
  token: faker.datatype.uuid(),
};

export const makeFakeOffer = (): ServerOffer => ({
  bedrooms: faker.datatype.number(),
  city: fakeCity,
  description: faker.lorem.paragraph(),
  goods: [faker.commerce.product(), faker.commerce.product(), faker.commerce.product()],
  host: fakeUser,
  id: faker.datatype.uuid(),
  images: [faker.image.image(), faker.image.image(), faker.image.image()],
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  location: fakeLocation,
  maxAdults: faker.datatype.number({ min: 1, max: 5 }),
  previewImage: faker.image.imageUrl(),
  price: faker.datatype.number({ min: 50, max: 1000 }),
  rating: parseFloat(faker.finance.amount(1, 5, 1)),
  title: faker.lorem.words(),
  type: 'Apartment',
});

export const makeFakeOffers = (): ServerOffer[] => {
  const fakeOffers: ServerOffer[] = [];

  for (let i = 0; i < randomNumber; i++) {
    const fakeOffer: ServerOffer = makeFakeOffer();
    fakeOffers.push(fakeOffer);
  }

  return fakeOffers;
};

export const makeFakeReview = (): Review => ({
  id: faker.datatype.uuid(),
  date: faker.date.recent().toISOString(),
  user: fakeUser,
  comment: faker.lorem.sentence(),
  rating: faker.datatype.number({ min: 1, max: 5 }),
});

export const makeFakeReviews = (): Review[] => {
  const fakeReviews: Review[] = [];

  for (let i = 0; i < randomNumber; i++) {
    const fakeReview: Review = makeFakeReview();
    fakeReviews.push(fakeReview);
  }

  return fakeReviews;
};

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  OFFER: {
    offers: makeFakeOffers(),
    offer: undefined,
    city: DEFAULT_CITY,
    activePoint: makeFakeOffers()[0].id,
    isOffersLoading: false,
    redirectToErrorPage: false,
  },
  NEARBY_OFFER: {
    offers: makeFakeOffers(),
    isOffersLoading: false,
    redirectToErrorPage: false
  },
  FAVORITE: {
    offers: makeFakeOffers(),
    isOffersLoading: false
  },
  REVIEW: {
    reviews: makeFakeReviews(),
    isPosting: false
  },
  USER: {
    userData: fakeServerUser,
    authStatus: AuthorizationStatus.Unknown
  },
  ...(initialState ?? {}),
});
