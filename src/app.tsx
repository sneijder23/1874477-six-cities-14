import MainScreen from './pages/main';
import { AppRoute, AuthorizationStatus, CITY_MAP } from './const';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Offer from './pages/offer';
import Favorities from './pages/favorities';
import Error from './pages/error';
import PrivateRoute from './components/private-route';
import { useState } from 'react';
import { City } from './types-ts/city';
import { useAppSelector } from './hooks/store';


function App(): JSX.Element {
  const stateCity = useAppSelector((state) => state.offers.city);
  const [selectedCity, setSelectedCity] = useState<City>(CITY_MAP[stateCity]);
  const offersState = useAppSelector((state) => state.offers.items);
  const reviewsState = useAppSelector((state) => state.reviews.items);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Navigate to={`/${selectedCity.name}`} />}/>
        <Route path={`${AppRoute.Root}${selectedCity.name}`} element={<MainScreen offers={offersState} selectedCity={selectedCity} setSelectedCity={setSelectedCity} />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorities offers={offersState} />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<Offer offers={offersState} reviews={reviewsState} />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
