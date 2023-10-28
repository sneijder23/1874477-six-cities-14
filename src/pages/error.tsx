import { Link } from 'react-router-dom';
import Header from '../components/header';
import { useDocumentTitle } from '../hooks/document-title';

function Error(): JSX.Element {
  useDocumentTitle('404 Not Found');
  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index page__main--index-empty">
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <h1 className="cities__error-pages">404 Not Found</h1>
            <Link className="cities__error-link" to="/">
              <span className="citier__error-message">
                Вернуться на главную
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Error;
