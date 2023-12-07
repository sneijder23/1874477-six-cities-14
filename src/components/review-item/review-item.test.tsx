import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../utils/mocks';
import { ReviewItem} from './review-item';

describe('Review item component', () => {
  it('render correctly', () => {
    const mockReview = makeFakeReview();

    render(<ReviewItem review={mockReview} />);

    expect(screen.getByAltText('Reviews avatar')).toBeInTheDocument();
    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
  });
});
