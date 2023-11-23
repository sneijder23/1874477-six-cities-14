import { memo } from 'react';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { Logo } from '../logo/logo';
import { UserGuest } from '../user-guest/user-guest';
import { UserLogged } from '../user-logged/user-logged';

function HeaderComponent(): JSX.Element {
  const isAuth = useAppSelector(
    (state) => state.user.authStatus === AuthorizationStatus.Auth
  );
  const userData = useAppSelector((state) => state.user.info);
  const userFavorites = useAppSelector(
    (state) => state.favoriteOffers.offers.length
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <nav className="header__nav">
            {isAuth ? <UserLogged user={userData!} favorites={userFavorites} /> : <UserGuest />}
          </nav>
        </div>
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
