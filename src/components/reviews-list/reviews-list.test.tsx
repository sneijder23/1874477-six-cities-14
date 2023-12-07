import { ReviewsList } from './reviews-list';
import { makeFakeReview, makeFakeStore } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { withStore } from '../../utils/mock-component';
import { MAX_REVIEW_LENGTH } from '../../const';

describe('Reviews list component', () => {
  it('render correctly', () => {
    const expectedReviewsCount = MAX_REVIEW_LENGTH;
    const fakeOfferId = '1111';
    const mockReviews = Array.from({ length: 12 }, () => makeFakeReview());

    const initialState = makeFakeStore();
    const { withStoreComponent: preparedComponent } = withStore(
      <ReviewsList offerdId={fakeOfferId} reviews={mockReviews} />,
      initialState
    );

    render(<MemoryRouter>{preparedComponent}</MemoryRouter>);

    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('review-item').length).toBe(expectedReviewsCount);
  });
});
