/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import SortIcon from '@mui/icons-material/Sort';
import { IconButton, Select, MenuItem, Button } from '@mui/material';
import { PageWrapper, PageTitle } from 'common.style';
import { useGetHospitals, useGetPatients, useGetPreferredHospital } from 'hooks/api/patientHooks';
import { getHospitalOptions } from 'pages/RegisterPatient/utils';
import { useNavigate } from 'react-router';
import urls from 'routing/urls';

import PatientCard from './components/PatientCard';
import SortingOptions from './components/SortingOptions';
import { PatientsList, IconButtonWrapper, OptionsWrapper } from './PatientDirectory.style';
import { SortingOptionsType } from './types';
import Notifications from '../../components/Notifications';
import { useResponsiveLayout } from '../../hooks/useResponsiveSidebar';

const PatientDirectory: React.FC<{ searchTerm?: string }> = ({ searchTerm }) => {
  const { isDesktop } = useResponsiveLayout();
  const [hospitalId, setHospitalId] = useState<number>();
  const [sortingOption, setSortingOption] = useState<SortingOptionsType>(
    (localStorage.getItem('sortingOption') as SortingOptionsType) || '-created_at'
  );

  const [page, setPage] = useState(1);
  const limit = 25;
  const offset = (page - 1) * limit;

  const PaginationControls: React.FC<{
    page: number;
    total: number;
    limit: number;
    onPageChange: (newPage: number) => void;
  }> = ({ page, total, limit, onPageChange }) => {

    if (total === 0) {
      return (
        <div
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '16px 0',
            fontSize: 14,
            color: '#666',
          }}
        >
          No patients to show
        </div>
      );
    }

    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    return (
      <div
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          margin: '16px 0',
        }}
      >
        {totalPages > 1 && (
          <Button
            size="small"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </Button>
        )}
        <span css={{ fontSize: 14 }}>
          Patients {start}-{end} out of {total}
        </span>
        {totalPages > 1 && (
          <Button
            size="small"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        )}
      </div>
    );
  };

  const { data: patients } = useGetPatients({
    offset,
    limit,
    search_term: searchTerm,
    hospital_id: hospitalId,
    ordering: sortingOption,
  });

  const [showSortingOptions, setShowSortingOptions] = useState(false);
  const { data: hospitals } = useGetHospitals({ offset: 0, limit: 100 });
  const { data: preferredHospital, isLoading: isLoadingPreferred } = useGetPreferredHospital();
  const isFirstLoad = useRef(true);
  const navigate = useNavigate();
  const filterOptions = getHospitalOptions(hospitals?.results || []);
  const [selectedOption, setSelectedOption] = useState<number>();

  useEffect(() => {
    if (hospitals && isFirstLoad.current) {
      if (isLoadingPreferred) return;
      if (preferredHospital && preferredHospital.hospital) {
        setHospitalId(preferredHospital.hospital.id);
        setSelectedOption(preferredHospital.hospital.id);
        isFirstLoad.current = false;
      } else {
        setHospitalId(hospitals?.results[0].id);
        setSelectedOption(hospitals?.results[0].id);
        isFirstLoad.current = false;
      }
    }
  }, [hospitals, preferredHospital, isLoadingPreferred, setHospitalId, setSelectedOption]);

  useEffect(() => {
    if (sortingOption) {
      localStorage.setItem('sortingOption', sortingOption);
    }
  }, [sortingOption]);

  useEffect(() => {
    setPage(1);
  }, [hospitalId, searchTerm, sortingOption]);

  return (
    <>
      <PageWrapper isDesktop={isDesktop}>
        <Notifications />
        <PageTitle>Patients directory</PageTitle>
        <OptionsWrapper>
          <Select
            label="Center"
            id="center"
            value={selectedOption ?? ''}
            onChange={(event) => {
              setSelectedOption(event.target.value as number);
              setHospitalId(event.target.value as number);
            }}
          >
            {filterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <IconButton onClick={() => setShowSortingOptions(!showSortingOptions)}>
            <SortIcon />
          </IconButton>
        </OptionsWrapper>

        {patients && (
          <PaginationControls
            page={page}
            total={patients.count}
            limit={limit}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}

        {patients && (
          <PatientsList>
            {patients.results.map((patient) => (
              <div
                key={patient.id}
                css={{ marginBottom: '8px' }}
              >
                <PatientCard {...patient} selectedHospital={selectedOption} />
              </div>
            ))}
          </PatientsList>
        )}
        <IconButtonWrapper>
          <Button
            id="add_patient"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddCircleIcon />}
            onClick={() => navigate(urls.registerPatient())}
          >
            Add Patient
          </Button>
        </IconButtonWrapper>
      </PageWrapper>

      {showSortingOptions && (
        <SortingOptions
          title={'Sort by options:'}
          sortingOption={sortingOption}
          onSortingOptionChange={(option: SortingOptionsType) => {
            setSortingOption(option);
            setShowSortingOptions(false);
          }}
          onClose={() => setShowSortingOptions(false)}
        />
      )}
    </>
  );
};

export default PatientDirectory;
