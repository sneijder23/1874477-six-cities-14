import { AppRoute, AuthorizationStatus } from '../../const';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PublicRoute } from './public-route';
import { render, screen } from '@testing-library/react';

describe('Public route component', () => {
  it('Public route component: should normally route to login page when user is not auth', () => {
    const expectedText = 'Root';
    const notExpectedText = 'Login';
    const preparedComponent = (
      <Routes>
        <Route path={AppRoute.Root} element={<span>{notExpectedText}</span>} />
        <Route path={AppRoute.Login} element={
          <PublicRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <span>{expectedText}</span>
          </PublicRoute>
        }
        />
      </Routes>
    );

    render(<MemoryRouter initialEntries={[AppRoute.Login]}>{preparedComponent}</MemoryRouter>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('Public route back when user is auth', () => {
    const expectedText = 'Root';
    const notExpectedText = 'Login';
    const preparedComponent = (
      <Routes>
        <Route path={AppRoute.Root} element={<span>{expectedText}</span>} />
        <Route path={AppRoute.Login} element={
          <PublicRoute authorizationStatus={AuthorizationStatus.Auth}>
            <span>{notExpectedText}</span>
          </PublicRoute>
        }
        />
      </Routes>
    );

    render(<MemoryRouter initialEntries={[AppRoute.Login]}>{preparedComponent}</MemoryRouter>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
