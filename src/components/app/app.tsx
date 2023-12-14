import { AppRoute } from '../../const';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../../pages/login';
import { Offer } from '../../pages/offer';
import { Favorities } from '../../pages/favorities';
import { Error } from '../../pages/error';
import { PrivateRoute } from '../private-route/private-route';
import { useAppSelector } from '../../hooks/store';
import { getAuthorizationCheckedStatus } from '../../store/slice/user/selectors';
import { PublicRoute } from '../public-route/public-route';
import { Main } from '../../pages/main';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationCheckedStatus);

  return (
    <BrowserRouter basename="/1874477-six-cities-14/">
      <Routes>
        <Route index path={AppRoute.Root} element={<Main />} />
        <Route
          path={AppRoute.Login}
          element={
            <PublicRoute authorizationStatus={authorizationStatus}>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorities />
            </PrivateRoute>
          }
        />
        <Route path={`${AppRoute.Offer}/:id`} element={<Offer />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
