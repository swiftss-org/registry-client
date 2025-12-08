
  return (
    <PageWrapper isDesktop={isDesktop}>
      <PageTitle>Global KPIs</PageTitle>

      <table id="global-kpis-table"
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

export default GlobalKPIs;