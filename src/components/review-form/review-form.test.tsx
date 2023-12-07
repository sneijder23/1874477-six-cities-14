import { withStore } from '../../utils/mock-component';
import { ReviewForm } from './review-form';
import { makeFakeStore } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../const';

describe('Review form component', () => {
  it('render correctly', () => {
    const expectedStarsCount = 5;
    const fakeId = '123';
    const initialState = makeFakeStore();
    initialState.USER.authStatus = AuthorizationStatus.Auth;
    const { withStoreComponent: preparedComponent } = withStore(<ReviewForm id={fakeId} />, initialState);
    render(preparedComponent);

    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getAllByTestId('rating-star').length).toBe(expectedStarsCount);
  });
});
