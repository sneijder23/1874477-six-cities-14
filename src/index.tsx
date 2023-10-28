import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { Offers } from './mocks/offers';
import { Comments } from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={Offers} reviews={Comments} />
  </React.StrictMode>
);
