import { render, screen } from '@testing-library/react';
import { Logo } from './logo';
import { MemoryRouter } from 'react-router-dom';

describe('Logo Component', () => {
  it('render correctly', () => {
    const expectedAltText = '6 cities logo';

    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });
});
