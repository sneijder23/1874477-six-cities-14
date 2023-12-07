import { MemoryRouter } from 'react-router-dom';
import { withStore } from '../../utils/mock-component';
import { UserLogged} from './user-logged';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mocks';

describe('User logged component', () => {
  it('render correctly', () => {
    const mockStore = makeFakeStore();
    const { withStoreComponent: preparedComponent } = withStore(<UserLogged />, mockStore);

    render(<MemoryRouter>{preparedComponent}</MemoryRouter>);

    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText(mockStore.USER.userData!.email)).toBeInTheDocument();
    expect(screen.getByText(mockStore.FAVORITE.offers.length)).toBeInTheDocument();
  });
});
