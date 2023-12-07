import { AppRoute, AuthorizationStatus } from '../../const';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './private-route';
import { render, screen } from '@testing-library/react';

describe('Private route component', () => {
  it('Private route component: should normally route to login page when user is not auth', () => {
    const expectedText = 'Public route';
    const notExpectedText = 'Private route';
    const preparedComponent = (
      <Routes>
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <span>{notExpectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>
    );

    render(<MemoryRouter initialEntries={[AppRoute.Favorites]}>{preparedComponent}</MemoryRouter>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should normally route in private route when user is auth', () => {
    const expectedText = 'Private route';
    const notExpectedText = 'Public route';
    const preparedComponent = (
      <Routes>
        <Route path={AppRoute.Login} element={<span>{notExpectedText}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <span>{expectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>
    );

    render(<MemoryRouter initialEntries={[AppRoute.Favorites]}>{preparedComponent}</MemoryRouter>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
