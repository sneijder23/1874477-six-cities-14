import { Main } from '../../pages/main';
import { AppRoute, CITY_MAP } from '../../const';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../../pages/login';
import { Offer } from '../../pages/offer';
import { Favorities } from '../../pages/favorities';
import { Error } from '../../pages/error';
import { PrivateRoute } from '../route/private-route';
import { City } from '../../types-ts/city';
import { useAppSelector } from '../../hooks/store';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.user.authStatus);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Navigate to={`/${Object.values(CITY_MAP)[0].name}`} />}
        />
        {Object.values(CITY_MAP).map((city: City) => (
          <Route
            key={city.name}
            path={`/${city.name}`}
            element={<Main />}
          />
        ))}
        <Route path={AppRoute.Login} element={<Login />} />
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
