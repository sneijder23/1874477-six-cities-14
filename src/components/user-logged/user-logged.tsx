import { Link } from 'react-router-dom';
import { MouseEvent, memo, useCallback, useEffect } from 'react';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { logout } from '../../store/thunk/user';
import { getUser } from '../../store/slice/user/selectors';
import { getFavoriteOffersCount } from '../../store/slice/favorite/selectors';
import { fetchFavoriteOffers } from '../../store/thunk/favorite-offers';

function UserLoggedComponent() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUser);
  const userFavoritesCount = useAppSelector(getFavoriteOffersCount);
  const handleButtonClick = useCallback(
    (evt: MouseEvent<HTMLAnchorElement>) => {
      evt.preventDefault();
      dispatch(logout());
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  }, [dispatch]);

  return (
    userData && (
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            to={AppRoute.Favorites}
            className="header__nav-link header__nav-link--profile"
          >
            <div className="header__avatar-wrapper user__avatar-wrapper">
              <img
                src={userData.avatarUrl}
                alt="avatarImg"
                style={{ borderRadius: '80%' }}
              />
            </div>
            <span className="header__user-name user__name">
              {userData.email}
            </span>
          </Link>
          <span className="header__favorite-count">
            <Link to={AppRoute.Favorites}>{userFavoritesCount}</Link>
          </span>
        </li>
        <li className="header__nav-item">
          <Link
            className="header__nav-link"
            to={AppRoute.Root}
            onClick={handleButtonClick}
          >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    )
  );
}

export const UserLogged = memo(UserLoggedComponent);
