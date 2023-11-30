import { CITIES_MAP } from '../const';

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getRandomCity() {
  const cities = Object.values(CITIES_MAP);

  const randomIndex = Math.floor(Math.random() * cities.length);

  return cities[randomIndex];
}
