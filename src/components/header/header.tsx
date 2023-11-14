import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { Logo } from '../logo/logo';
import { UserGuest } from '../user/user-guest';
import { UserLogged } from '../user/user-logged';


function Header(): JSX.Element {
  const isAuth = useAppSelector((state) => state.user.authStatus);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <nav className="header__nav">
            {isAuth === AuthorizationStatus.Auth ? (
              <UserLogged />
            ) : (
              <UserGuest />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export { Header };
