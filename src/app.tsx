import MainScreen from './pages/main';
import { AppRoute, CARDS_COUNT, AuthorizationStatus } from './const';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Offer from './pages/offer';
import Favorities from './pages/favorities';
import Error from './pages/error';
import PrivateRoute from './components/private-route';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainScreen cardsCount={CARDS_COUNT} />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}><Favorities /></PrivateRoute>
        }
        />
        <Route path={AppRoute.Offer} element={<Offer />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
