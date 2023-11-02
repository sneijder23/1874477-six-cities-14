import MainScreen from './pages/main';
import { AppRoute, AuthorizationStatus } from './const';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Offer from './pages/offer';
import Favorities from './pages/favorities';
import Error from './pages/error';
import PrivateRoute from './components/private-route';
import { ServerOffer } from './types/offer';
import { Review } from './types/review';

type AppScreenProps = {
  offers: ServerOffer[];
  reviews: Review[];
}

function App({offers, reviews}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainScreen offers={offers} />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}><Favorities offers={offers} /></PrivateRoute>
        }
        />
        <Route path={`${AppRoute.Offer}/:id`} element={<Offer offers={offers} reviews={reviews} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
