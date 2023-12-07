import { makeFakeOffer } from '../../utils/mocks';
import { Rating } from './rating';
import { render, screen } from '@testing-library/react';

describe('Rating component', () => {
  it('render correctly', () => {
    const mockOffer = makeFakeOffer();
    const expectedRaitingCount = 5;
    const rating = mockOffer.rating.toString();
    const handleFieldChange = () => {};

    render(<Rating rating={rating} postingStatus={false} handleFieldChange={handleFieldChange} />);

    expect(screen.getAllByTestId('rating-star').length).toBe(expectedRaitingCount);
  });
});
