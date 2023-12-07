import { Card } from './card';
import { withStore } from '../../utils/mock-component';
import { fakeServerUser, makeFakeOffer } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../const';
import { MemoryRouter } from 'react-router-dom';

describe('Card component', () => {
  it('render correctly', () => {
    const mockOffer = makeFakeOffer();
    const initialState = {
      authStatus: AuthorizationStatus.Unknown,
      userData: fakeServerUser
    };
    const { withStoreComponent: preparedComponent} = withStore(
      <Card offer={mockOffer} screenName='cities' />, { USER: initialState });

    render(<MemoryRouter>{preparedComponent}</MemoryRouter>);

    expect(screen.getByAltText('Place image')).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });
});
