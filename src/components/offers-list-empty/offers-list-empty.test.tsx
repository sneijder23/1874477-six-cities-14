import { OffersListEmpty } from './offers-list-empty';
import { withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Offers List Empty component', () => {
  it('render correctly', () => {
    const initialState = makeFakeStore();
    const city = initialState.OFFER.city;
    const expectedTitle = /No places to stay available/i;
    const expectedTextWithCity = `We could not find any property available at the moment in ${city}`;
    const { withStoreComponent: preparedComponent } = withStore(
      <OffersListEmpty />,
      initialState
    );

    render(<MemoryRouter>{preparedComponent}</MemoryRouter>);

    expect(screen.getByText(expectedTitle)).toBeInTheDocument();
    expect(screen.getByText(expectedTextWithCity)).toBeInTheDocument();
  });
});
