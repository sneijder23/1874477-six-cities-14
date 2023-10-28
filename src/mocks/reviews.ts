import { Review } from '../types/review';

const Comments: Review[] = [
  {
    'id': '1',
    'rating': 4,
    'user': {
      'avatarUrl': 'img/1.png',
      'id': '1',
      'isPro': false,
      'name': 'Oliver.conner'
    },
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'date': 'Sat Oct 21 2023 17:56:58 GMT+0300 (Москва, стандартное время)'
  },
  {
    'id': '3',
    'user': {
      'id': '13',
      'isPro': false,
      'name': 'Zak',
      'avatarUrl': 'https://14.react.pages.academy/static/avatar/4.jpg'
    },
    'rating': 2,
    'comment': 'The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.',
    'date': '2023-09-30T09:23:20.316Z'
  },
  {
    'id': '2',
    'user': {
      'id': '15',
      'isPro': false,
      'name': 'Kendall',
      'avatarUrl': 'https://14.react.pages.academy/static/avatar/6.jpg'
    },
    'rating': 3,
    'comment': 'The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.',
    'date': '2023-09-30T09:23:20.316Z'
  }
];

export { Comments };
