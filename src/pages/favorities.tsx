import { FavoriteList } from '../components/favorite-list/favorite-list';
import { FavoriteEmpty } from '../components/favorite-empty/favorite-empty';
import { Header } from '../components/header/header';
import { useDocumentTitle } from '../hooks/document-title';
import { useAppSelector } from '../hooks/store';
import { Footer } from '../components/footer/footer';
import { getFavoriteOffers } from '../store/slice/favorite-offers/selectors';
import classnames from 'classnames';

function Favorities(): JSX.Element {
  useDocumentTitle('Favorites');
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const listEmpty = favoriteOffers.length === 0;

  return (
    <div className={classnames('page', { 'page--favorites-empty': listEmpty })}>
      <Header />
      {listEmpty ? (
        <FavoriteEmpty />
      ) : (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoriteList favoriteOffers={favoriteOffers} />
            </section>
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
}

export { Favorities };
