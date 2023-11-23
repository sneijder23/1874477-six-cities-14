import { CITY_MAP } from '../../const';
import { Route } from 'react-router-dom';
import { City } from '../../types-ts/city';
import { Main } from '../../pages/main';

function CityRoutes() {
  return Object.values(CITY_MAP).map((city: City) => (
    <Route key={city.name} path={`/${city.name}`} element={<Main />} />
  ));
}

export { CityRoutes };
