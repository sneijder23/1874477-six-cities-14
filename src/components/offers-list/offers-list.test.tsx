import { OffersList } from './offers-list';
import { withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Offers List component', () => {
  it('render correctly', () => {
    const initialState = makeFakeStore();
    const expectedCardsCount = initialState.OFFER.offers.length;
    const { withStoreComponent: preparedComponent } = withStore(
      <OffersList city={initialState.OFFER.offers[0].city.name} />,
      initialState
    );
    render(<MemoryRouter>{preparedComponent}</MemoryRouter>);

    expect(screen.getByText('Places')).toBeInTheDocument();
    expect(screen.getAllByTestId('card-item').length).toBe(expectedCardsCount);
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
