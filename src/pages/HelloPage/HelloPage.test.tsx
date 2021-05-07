import HelloPage from './HelloPage';
import renderWithProviders from '../../test/utils';

describe('HelloPage', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithProviders(<HelloPage />);

    expect(asFragment()).toMatchSnapshot();
  });
});
