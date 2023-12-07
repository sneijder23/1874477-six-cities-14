import { withStore } from '../../utils/mock-component';
import { FavoriteButton } from './favorite-button';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Favorite button component', () => {
  it('render correctly', () => {
    const mockOffer = makeFakeOffer();
    const initialState = makeFakeStore();
    const { withStoreComponent: preparedComponent} = withStore(
      <FavoriteButton offerState={mockOffer} />,
      { USER: initialState.USER });

    render(<MemoryRouter>{preparedComponent}</MemoryRouter>);

    expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
  });
});
