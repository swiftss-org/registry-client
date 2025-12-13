import React, { useState, useMemo } from 'react';

import { PageTitle, PageWrapper } from '../../common.style';
import { useGetEpisodeStats } from '../../hooks/api/patientHooks';
import { useResponsiveLayout } from '../../hooks/useResponsiveSidebar';
import {
  TableWrapper,
  TableHeader,
  TableCell,
  TableRow,
  ItalicCell,
} from './NationalKPIs.style';

type SortColumn = 'hospital_name' | 'total' | 'pastYear' | 'pastMonth' | 'pastWeek';
type SortDirection = 'asc' | 'desc';

const NationalKPIs: React.FC = () => {
  const { isDesktop } = useResponsiveLayout();

  const totalEpisodes = useGetEpisodeStats(undefined, 'hospital');
  const episodesPastYear = useGetEpisodeStats('365d', 'hospital');
  const episodesPastMonth = useGetEpisodeStats('30d', 'hospital');
  const episodesPastWeek = useGetEpisodeStats('7d', 'hospital');

  const [sortColumn, setSortColumn] = useState<SortColumn>('hospital_name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const renderCount = (query: typeof totalEpisodes) => {
    if (query.isLoading) return 'Loading...';
    if (query.isError) return 'Error';
    return query.data?.total_episodes ?? 0;
  };

  const getHospitalCount = (query: typeof totalEpisodes, hospitalId: number) => {
    if (query.isLoading) return 'Loading...';
    if (query.isError) return 'Error';
    return (
      query.data?.by_hospital?.find(h => h.hospital_id === hospitalId)
        ?.total_episodes ?? 0
    );
  };

  // Combine hospital data for easy sorting
  const hospitalData = useMemo(() => {
    const data = totalEpisodes.data?.by_hospital?.map(hospital => ({
      hospital_id: hospital.hospital_id,
      hospital_name: hospital.hospital_name,
      total: getHospitalCount(totalEpisodes, hospital.hospital_id),
      pastYear: getHospitalCount(episodesPastYear, hospital.hospital_id),
      pastMonth: getHospitalCount(episodesPastMonth, hospital.hospital_id),
      pastWeek: getHospitalCount(episodesPastWeek, hospital.hospital_id),
    })) ?? [];

    const sorted = [...data].sort((a, b) => {
      let aValue: string | number = (a as any)[sortColumn];
      let bValue: string | number = (b as any)[sortColumn];

      // Sort strings case-insensitively
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [
    totalEpisodes.data,
    episodesPastYear.data,
    episodesPastMonth.data,
    episodesPastWeek.data,
    sortColumn,
    sortDirection,
  ]);

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
      <PageTitle>National KPIs</PageTitle>

      <TableWrapper>
        <thead>
          {/* Top-level single-column header */}
          <TableRow>
            <TableHeader colSpan={5}>Episode KPIs</TableHeader>
          </TableRow>
          {/* KPI column headers */}
          <TableRow>
            <TableHeader onClick={() => handleSort('hospital_name')} style={{ cursor: 'pointer' }}>
              Hospital{renderSortArrow('hospital_name')}
            </TableHeader>
            <TableHeader onClick={() => handleSort('total')} style={{ cursor: 'pointer' }}>
              Total{renderSortArrow('total')}
            </TableHeader>
            <TableHeader onClick={() => handleSort('pastYear')} style={{ cursor: 'pointer' }}>
              Past Year{renderSortArrow('pastYear')}
            </TableHeader>
            <TableHeader onClick={() => handleSort('pastMonth')} style={{ cursor: 'pointer' }}>
              Past Month{renderSortArrow('pastMonth')}
            </TableHeader>
            <TableHeader onClick={() => handleSort('pastWeek')} style={{ cursor: 'pointer' }}>
              Past Week{renderSortArrow('pastWeek')}
            </TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {/* All hospitals row in italics */}
          <TableRow>
            <ItalicCell>All Hospitals</ItalicCell>
            <TableCell>{renderCount(totalEpisodes)}</TableCell>
            <TableCell>{renderCount(episodesPastYear)}</TableCell>
            <TableCell>{renderCount(episodesPastMonth)}</TableCell>
            <TableCell>{renderCount(episodesPastWeek)}</TableCell>
          </TableRow>

          {/* Sorted hospital rows */}
          {hospitalData.map(hospital => (
            <TableRow key={hospital.hospital_id}>
              <TableCell>{hospital.hospital_name}</TableCell>
              <TableCell>{hospital.total}</TableCell>
              <TableCell>{hospital.pastYear}</TableCell>
              <TableCell>{hospital.pastMonth}</TableCell>
              <TableCell>{hospital.pastWeek}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </TableWrapper>
    </PageWrapper>
  );
};

export default NationalKPIs;
