import { withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoriteList } from './favorite-list';

describe('Offers List component', () => {
  it('render correctly', () => {
    const initialState = makeFakeStore();
    const updatedOffers = initialState.FAVORITE.offers.map((offer) => ({
      ...offer,
      isFavorite: true,
    }));
    const expectedCardsCount = initialState.FAVORITE.offers.length;
    const { withStoreComponent: preparedComponent } = withStore(
      <FavoriteList favoriteOffers={updatedOffers} />,
      initialState
    );
    render(<MemoryRouter>{preparedComponent}</MemoryRouter>);

    expect(screen.getByTestId('favorite-location')).toBeInTheDocument();
    expect(screen.getAllByTestId('card-item').length).toBe(expectedCardsCount);
  });
});
