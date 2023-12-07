import { withStore } from '../../utils/mock-component';
import { Tabs } from './tabs';
import { fakeCity, makeFakeStore } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Tabs component', () => {
  it('render correctly', () => {
    const mockCity = fakeCity;
    const initialState = makeFakeStore();
    const handleCityClick = () => {};
    const { withStoreComponent: preparedComponent} = withStore(
      <Tabs selectedCity={mockCity} handleCityClick={handleCityClick}/>,
      { USER: initialState.USER });

    render(<MemoryRouter>{preparedComponent}</MemoryRouter>);

    expect(screen.getByTestId('tabs')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });
});
