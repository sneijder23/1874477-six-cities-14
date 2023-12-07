import { MemoryRouter } from 'react-router-dom';
import { makeFakeOffer } from '../../utils/mocks';
import { OfferHost } from './offer-host';
import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';

describe('Offer Host component', () => {
  it('render correctly', () => {
    const mockOffer = makeFakeOffer();

    const { withStoreComponent: preparedComponent} = withStore(
      <OfferHost host={mockOffer.host} description={mockOffer.description} />, {});

    render(<MemoryRouter>{preparedComponent}</MemoryRouter>);

    expect(screen.getByAltText('Host avatar')).toBeInTheDocument();
    expect(screen.getByText(mockOffer.description)).toBeInTheDocument();
  });
});
