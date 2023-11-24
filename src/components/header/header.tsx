import { memo } from 'react';
import { useAppSelector } from '../../hooks/store';
import { Logo } from '../logo/logo';
import { UserGuest } from '../user-guest/user-guest';
import { UserLogged } from '../user-logged/user-logged';
import { getAuthorizationStatus } from '../../store/slice/user/selectors';

function HeaderComponent(): JSX.Element {
  const isAuth = useAppSelector(getAuthorizationStatus);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <nav className="header__nav">
            {isAuth ? <UserLogged /> : <UserGuest />}
          </nav>
        </div>
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
