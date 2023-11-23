import { FormEvent, MouseEvent, memo, useRef } from 'react';
import { Header } from '../components/header/header';
import { useDocumentTitle } from '../hooks/document-title';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { login } from '../store/thunk/auth';
import { AuthorizationStatus } from '../const';
import { offersAction } from '../store/slice/offers';
import { getRandomCity } from '../utils/utils';
import { toast } from 'react-toastify';

function LoginPage(): JSX.Element {
  useDocumentTitle('Login');
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const loginRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d).{2,}$/;
  const isAuth = useAppSelector((state) => state.user.authStatus);
  const citySelect = useAppSelector((state) => state.offers.city);
  const randomCity = getRandomCity();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current?.value && passwordRef.current?.value) {
      if (!loginRegExp.test(loginRef.current?.value)) {
        return toast.warn('Неверный формат логина email');
      }

      if (!passwordRegExp.test(passwordRef.current?.value)) {
        return toast.warn('Пароль должен содержать минимум одну букву и одну цифру!');
      }

      dispatch(
        login({
          email: loginRef.current.value,
          password: passwordRef.current.value,
        })
      );
      navigate(-1);
    }
  };

  const handleButtonClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(offersAction.setCitySelect(randomCity.name));
    navigate(`/${randomCity.name}`);
  };

  if (isAuth === AuthorizationStatus.Auth) {
    return <Navigate to={`/${citySelect}`} />;
  }

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to="#"
                onClick={handleButtonClick}
              >
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export const Login = memo(LoginPage);
