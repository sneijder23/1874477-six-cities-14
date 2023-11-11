import FavoriteList from '../components/favorite/favorite-list';
import FavoriteEmpty from '../components/favorite/favorite-empty';
import Header from '../components/header/header';
import { useDocumentTitle } from '../hooks/document-title';
import { useAppSelector } from '../hooks/store';
import { City } from '../types-ts/city';
import { ServerOffer } from '../types-ts/offer';

function Favorities(): JSX.Element {
  useDocumentTitle('Favorites');
  const favoriteState = useAppSelector((state) => state.favoriteOffers.items);

  const favoritesList: { city: City; offers: ServerOffer[] }[] =
    favoriteState.reduce<{ city: City; offers: ServerOffer[] }[]>(
      (acc, cur) => {
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
      },
      []
    );

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
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}

export default Favorities;
