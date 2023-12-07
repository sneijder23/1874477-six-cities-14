import { render, screen } from '@testing-library/react';
import { FavoriteEmpty } from './favorite-empty';

describe('Favorite empty Component', () => {
  it('render correctly', () => {
    const expectedTitle = /Nothing yet saved./i;

    render(<FavoriteEmpty />);

    expect(screen.getByText(expectedTitle)).toBeInTheDocument();
  });
});
