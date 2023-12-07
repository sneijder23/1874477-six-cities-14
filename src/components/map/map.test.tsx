import { withStore } from '../../utils/mock-component';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import { Map } from './map';
import { render, screen } from '@testing-library/react';

describe('Map component', () => {
  it('render correctly', () => {
    const mockOffers = Array.from({ length: 3 }, () => makeFakeOffer());
    const initialState = makeFakeStore();
    const { withStoreComponent: preparedComponent } = withStore(<Map className={'cities__map'} city={mockOffers[0].city} points={mockOffers} />, initialState);

    render(preparedComponent);

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
