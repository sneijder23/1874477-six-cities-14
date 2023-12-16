import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function Footer() {
  return (
    <footer className="footer container">
      <Link className="footer__logo-link" to={AppRoute.Root}>
        <img
          className="footer__logo"
          src="1874477-six-cities-14/img/logo.svg"
          alt="6 cities logo"
          width="64"
          height="33"
        />
      </Link>
    </footer>
  );
}

export { Footer };
