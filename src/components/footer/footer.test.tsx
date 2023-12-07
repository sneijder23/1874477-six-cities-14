import { render, screen } from '@testing-library/react';
import { Footer } from './footer';
import { MemoryRouter } from 'react-router-dom';

describe('Footer Component', () => {
  it('render correctly', () => {
    const expectedAltText = '6 cities logo';

    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });
});
