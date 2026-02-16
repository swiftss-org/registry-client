import React, { useState, useMemo } from 'react';

import {
  TableWrapper,
  TableHeader,
  TableCell,
  TableRow,
  ItalicCell,
  TableScrollContainer,
  KPIsContentWrapper,
} from './NationalKPIs.style';
import { PageTitle, PageWrapper } from '../../common.style';
import { useGetEpisodeStats } from '../../hooks/api/patientHooks';
import { useResponsiveLayout } from '../../hooks/useResponsiveSidebar';

type SortColumn = 'hospital_name' | 'total' | 'pastYear' | 'pastMonth' | 'pastWeek' | 'lastEpisodeDate' | 'patientsWithoutEpisode';
type SortDirection = 'asc' | 'desc';

const NationalKPIs: React.FC = () => {
  const { isDesktop } = useResponsiveLayout();

  const totalEpisodes = useGetEpisodeStats(undefined, 'hospital');

  const [sortColumn, setSortColumn] = useState<SortColumn>('hospital_name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');



  const formatDate = (date: string | null | undefined) =>
    date ? new Date(date).toLocaleDateString() : '—';

  // Combine hospital data for easy sorting
  const hospitalData = useMemo(() => {
    const data =
      totalEpisodes.data?.by_hospital?.map(hospital => ({
        hospital_id: hospital.hospital_id,
        hospital_name: hospital.hospital_name,
        total: hospital.total_episodes,
        pastYear: hospital.past_year_episodes,
        pastMonth: hospital.past_month_episodes,
        pastWeek: hospital.past_week_episodes,
        lastEpisodeDate: hospital.last_episode_date,
        patientsWithoutEpisode: hospital.patients_without_episode,
      })) ?? [];

    const sorted = [...data].sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      if (sortColumn === 'lastEpisodeDate') {
        const aDate = aValue ? new Date(aValue).getTime() : 0;
        const bDate = bValue ? new Date(bValue).getTime() : 0;
        return sortDirection === 'asc' ? aDate - bDate : bDate - aDate;
      }

      // Handle nulls/undefined values to satisfy TypeScript
      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      // String sorting
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [totalEpisodes.data, sortColumn, sortDirection]);

  // Handle click on header to toggle sorting
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const renderSortArrow = (column: SortColumn) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? '↑' : '↓'; // Use the same arrow as LandingPage
  };

  return (
    <PageWrapper isDesktop={isDesktop}>
        <KPIsContentWrapper>
          <PageTitle>National KPIs</PageTitle>
          <TableScrollContainer>
          <TableWrapper>
                <thead>
                  {/* Top-level single-column header */}
                  <TableRow>
                    <TableHeader colSpan={7}>Episode KPIs</TableHeader>
                  </TableRow>
                  {/* KPI column headers */}
                  <TableRow>
                    <TableHeader onClick={() => handleSort('hospital_name')}>
                      Hospital{renderSortArrow('hospital_name')}
                    </TableHeader>
                    <TableHeader onClick={() => handleSort('total')}>
                      Total{renderSortArrow('total')}
                    </TableHeader>
                    <TableHeader onClick={() => handleSort('pastYear')}>
                      Past Year{renderSortArrow('pastYear')}
                    </TableHeader>
                    <TableHeader onClick={() => handleSort('pastMonth')}>
                      Past Month{renderSortArrow('pastMonth')}
                    </TableHeader>
                    <TableHeader onClick={() => handleSort('pastWeek')}>
                      Past Week{renderSortArrow('pastWeek')}
                    </TableHeader>
                    <TableHeader onClick={() => handleSort('lastEpisodeDate')}>
                      Last Episode{renderSortArrow('lastEpisodeDate')}
                    </TableHeader>
                    <TableHeader onClick={() => handleSort('patientsWithoutEpisode')}>
                      Patients without Episode{renderSortArrow('patientsWithoutEpisode')}
                    </TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  <TableRow>
                    <ItalicCell>All Hospitals</ItalicCell>
                    <TableCell>{totalEpisodes.data?.global.total_episodes ?? '—'}</TableCell>
                    <TableCell>{totalEpisodes.data?.global.past_year_episodes ?? '—'}</TableCell>
                    <TableCell>{totalEpisodes.data?.global.past_month_episodes ?? '—'}</TableCell>
                    <TableCell>{totalEpisodes.data?.global.past_week_episodes ?? '—'}</TableCell>
                    <TableCell>
                      {formatDate(totalEpisodes.data?.global.last_episode_date)}
                    </TableCell>
                    <TableCell>
                      {totalEpisodes.data?.global.patients_without_episode ?? '—'}
                    </TableCell>
                  </TableRow>

                  {hospitalData.map(hospital => (
                  <TableRow key={hospital.hospital_id}>
                    <TableCell>{hospital.hospital_name}</TableCell>
                    <TableCell>{hospital.total}</TableCell>
                    <TableCell>{hospital.pastYear}</TableCell>
                    <TableCell>{hospital.pastMonth}</TableCell>
                    <TableCell>{hospital.pastWeek}</TableCell>
                    <TableCell>{formatDate(hospital.lastEpisodeDate)}</TableCell>
                    <TableCell>{hospital.patientsWithoutEpisode}</TableCell>
                  </TableRow>
                ))}
                </tbody>
              </TableWrapper>
          </TableScrollContainer>
        </KPIsContentWrapper>
    </PageWrapper>
  );
};

export default NationalKPIs;
