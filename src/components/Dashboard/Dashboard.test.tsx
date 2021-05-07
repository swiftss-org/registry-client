import renderWithProviders from '../../test/utils';
import DashboardLayout from './Dashboard';
import { pageOptions } from '../../config';

describe('Dashboard', function () {
  it('should match snapshot', () => {
    const { asFragment } = renderWithProviders(<DashboardLayout pageOptions={pageOptions} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
