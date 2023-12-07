import { City } from './types-ts/city';

export const BACKEND_URL = 'https://14.design.pages.academy/six-cities';

export const REQUEST_TIMEOUT = 5000;

export const DEFAULT_CITY = 'Paris';

export const TIMEOUT_SHOW_ERROR = 2000;

export const MAX_REVIEW_LENGTH = 10;

export const MAX_NEARBY_OFFERS = 3;

export const TextareaLenght = {
  MinLenght: 50,
  MaxLenght: 300,
} as const;

export const MAX_PICTURE_OFFER = 6;

export const APP_NAME: string = '6 cities';

export const enum UrlMarker {
  Default = 'img/pin.svg',
  Current = 'img/pin-active.svg'
}

export const TITLE_LAYER_URL =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

export const OPEN_STREET_MAP =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';


export const enum AppRoute {
  Root = '/',
  Login = '/login',
  Offer = '/offer',
  Favorites = '/favorites',
  Error = '/error'
}

export const enum APIRoute {
  Offers = '/offers',
  Favorites = '/favorite',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const enum NameSpace {
  Offer = 'OFFER',
  NearbyOffer = 'NEARBY_OFFER',
  Review = 'REVIEW',
  User = 'USER',
  Favorite = 'FAVORITE',
}

export const CITIES_MAP: Record<string, City> = {
  'Paris': {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  'Cologne': {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
  },
  'Brussels': {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
  },
  'Amsterdam': {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    },
  },
  'Hamburg': {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
  },
  'Dusseldorf': {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
  },
} as const;

export const SortType = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first'
} as const;

export const RatingMap = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly',
};
