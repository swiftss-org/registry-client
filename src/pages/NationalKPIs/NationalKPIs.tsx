import React from 'react';

import {
  PageTitle,
  PageWrapper,
} from '../../common.style';
import { useGetEpisodeStats } from '../../hooks/api/patientHooks';
import { useResponsiveLayout } from '../../hooks/useResponsiveSidebar';

const NationalKPIs: React.FC = () => {
  const { isDesktop } = useResponsiveLayout();

  // Fetch stats for different periods
  const totalEpisodes = useGetEpisodeStats(); // all time
  const episodesPastYear = useGetEpisodeStats('365d');
  const episodesPastMonth = useGetEpisodeStats('30d');
  const episodesPastWeek = useGetEpisodeStats('7d');

  // Helper function to display loading or the count
  const renderCount = (query: typeof totalEpisodes) => {
    if (query.isLoading) return 'Loading...';
    if (query.isError) return 'Error';
    return query.data?.total_episodes ?? 0;
  };

  return (
    <PageWrapper isDesktop={isDesktop}>
      <PageTitle>National KPIs</PageTitle>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '1rem',
        }}
      >
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}></th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Total</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Past Year</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Past Month</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Past Week</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>All Hospitals</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{renderCount(totalEpisodes)}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{renderCount(episodesPastYear)}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{renderCount(episodesPastMonth)}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{renderCount(episodesPastWeek)}</td>
          </tr>
        </tbody>
      </table>
    </PageWrapper>
  );
};

export default NationalKPIs;