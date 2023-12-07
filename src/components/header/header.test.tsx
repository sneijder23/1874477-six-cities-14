import { MemoryRouter } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { withStore } from '../../utils/mock-component';
import { fakeServerUser, makeFakeStore } from '../../utils/mocks';
import { Header } from './header';
import { render, screen } from '@testing-library/react';

describe('Header component', () => {
  it('render guest user component when user is not authorized', () => {
    const userMock = {
      authStatus: AuthorizationStatus.NoAuth,
      userData: fakeServerUser,
    };
    const { withStoreComponent: preparedComponent } = withStore(<Header />, {
      USER: userMock,
    });

    render(<MemoryRouter>{preparedComponent}</MemoryRouter>);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByTestId('guest')).toBeInTheDocument();
  });

  it('render logged user component when user is authorized', () => {
    const mockStore = makeFakeStore();
    const userMock = {
      authStatus: AuthorizationStatus.Auth,
      userData: fakeServerUser,
    };
    const { withStoreComponent: preparedComponent } = withStore(<Header />, {
      USER: userMock,
      FAVORITE: mockStore.FAVORITE,
    });

    render(<MemoryRouter>{preparedComponent}</MemoryRouter>);

    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
