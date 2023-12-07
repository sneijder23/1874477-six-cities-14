import { MemoryRouter } from 'react-router-dom';
import { withStore } from '../../utils/mock-component';
import { UserGuest} from './user-guest';
import { render, screen } from '@testing-library/react';

describe('User guest component', () => {
  it('render correctly', () => {
    const { withStoreComponent: preparedComponent } = withStore(<UserGuest />, {});

    render(<MemoryRouter>{preparedComponent}</MemoryRouter>);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
