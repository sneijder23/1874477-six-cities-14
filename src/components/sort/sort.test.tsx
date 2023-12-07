import { Sort } from './sort';
import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import { SortType } from '../../const';
import { MemoryRouter } from 'react-router-dom';

describe('Sort component', () => {
  it('render correctly', () => {
    const expectedSortCount = 4;
    const { withStoreComponent: preparedComponent } = withStore(
      <Sort activeSort={SortType.PriceLowToHigh}/>);

    render(<MemoryRouter>{preparedComponent}</MemoryRouter>);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getAllByTestId('sort-item').length).toBe(expectedSortCount);
  });
});
