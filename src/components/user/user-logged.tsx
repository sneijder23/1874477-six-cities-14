import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { logout } from '../../store/thunk/auth';

function UserLogged() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.info);

  const handleButtonClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logout());
  };

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
              {userData.name}
            </span>
          </Link>
          <span className="header__favorite-count">
            <Link to={AppRoute.Favorites}>5</Link>
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

export { UserLogged };
