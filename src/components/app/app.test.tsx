import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { App } from './app';

describe('App init', () => {
  it('render "MainPage" when user navigates to "/"', () => {
    const { withStoreComponent } = withStore(<App />, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText('Cities')).toBeInTheDocument();
  });
});
