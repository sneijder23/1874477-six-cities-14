import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/store';
import Logo from '../logo/logo';
import { Link } from 'react-router-dom';

function Header(): JSX.Element {
  const favoriteState = useAppSelector((state) => state.favoriteOffers.items);
  const favoriteCount = favoriteState.filter((item) => item.isFavorite).length;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  to={AppRoute.Favorites}
                  className="header__nav-link header__nav-link--profile"
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">
                    Oliver.conner@gmail.com
                  </span>
                </Link>
                <span className="header__favorite-count">
                  <Link to={AppRoute.Favorites}>{favoriteCount}</Link>
                </span>
              </li>
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  <span className="header__signout">Sign out</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
