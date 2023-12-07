import { MemoryRouter } from 'react-router-dom';
import { makeFakeOffer } from '../../utils/mocks';
import { OfferRating } from './offer-rating';
import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';

describe('Offer Raiting component', () => {
  it('render correctly', () => {
    const mockOffer = makeFakeOffer();

    const { withStoreComponent: preparedComponent} = withStore(
      <OfferRating className='place-card' rating={mockOffer.rating} showRatingValue/>, {});

    render(<MemoryRouter>{preparedComponent}</MemoryRouter>);

    expect(screen.getByTestId('rating-star')).toBeInTheDocument();
    expect(screen.getByText(mockOffer.rating)).toBeInTheDocument();
  });
});
