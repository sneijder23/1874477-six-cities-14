import { FavoriteList } from '../components/favorite-list/favorite-list';
import { FavoriteEmpty } from '../components/favorite-empty/favorite-empty';
import { Header } from '../components/header/header';
import { useDocumentTitle } from '../hooks/document-title';
import { useAppSelector } from '../hooks/store';
import { City } from '../types-ts/city';
import { ServerOffer } from '../types-ts/offer';
import { memo, useMemo } from 'react';
import { Footer } from '../components/footer/footer';
import { getFavoriteOffers } from '../store/slice/favorite/selectors';

function FavoritiesPage(): JSX.Element {
  useDocumentTitle('Favorites');
  const favoriteState = useAppSelector(getFavoriteOffers);

  const favoritesList: { city: City; offers: ServerOffer[] }[] = useMemo(() =>
    favoriteState.reduce<{ city: City; offers: ServerOffer[] }[]>((acc, cur) => {
      if (cur.isFavorite) {
        const existingCity = acc.find(
          (item) => item.city.name === cur.city.name
        );
        if (existingCity) {
          existingCity.offers.push(cur);
        } else {
          acc.push({
            city: cur.city,
            offers: [cur],
          });
        }
      }
      return acc;
    },[]
    ), [favoriteState]);

  const listEmpty = favoritesList.length === 0;

  return (
    <div className="page">
      <Header />
      {listEmpty ? (
        <FavoriteEmpty />
      ) : (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoriteList favoriteList={favoritesList} />
            </section>
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
}

export const Favorities = memo(FavoritiesPage);
