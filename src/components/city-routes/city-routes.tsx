import { CITY_MAP } from '../../const';
import { Route } from 'react-router-dom';
import { City } from '../../types-ts/city';
import { Main } from '../../pages/main';

function CityRoutes() {
  return Object.values(CITY_MAP).map((city: City) => {
    const cityName = city.name.toLowerCase();
    const path = `/${cityName}`;
    return <Route key={city.name} path={path} element={<Main />} />;
  });
}

export { CityRoutes };
