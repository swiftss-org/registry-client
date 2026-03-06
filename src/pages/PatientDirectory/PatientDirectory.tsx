import React, { useEffect, useState, useRef } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import SortIcon from '@mui/icons-material/Sort';
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography
} from '@mui/material';
import { useGetHospitals, useGetPatients, useGetPreferredHospital } from 'hooks/api/patientHooks';
import { useResponsiveLayout } from 'hooks/useResponsiveSidebar';
import { getHospitalOptions } from 'pages/RegisterPatient/utils';
import { useNavigate } from 'react-router';
import urls from 'routing/urls';

import PatientCard from './components/PatientCard';
import SortingOptions from './components/SortingOptions';
import { SortingOptionsType } from './types';
import Notifications from '../../components/Notifications';

const PatientDirectory: React.FC<{ searchTerm?: string }> = ({ searchTerm }) => {
  const { isDesktop } = useResponsiveLayout();
  const [hospitalId, setHospitalId] = useState<number>();
  const [sortingOption, setSortingOption] = useState<SortingOptionsType>(
    (localStorage.getItem('sortingOption') as SortingOptionsType) || '-created_at'
  );

  const [page, setPage] = useState(1);
  const limit = 25;
  const offset = (page - 1) * limit;
  const sortingLabels: Record<SortingOptionsType, string> = {
    full_name: 'Name A-Z',
    '-full_name': 'Name Z-A',
    created_at: 'Oldest to newest',
    '-created_at': 'Newest to oldest',
  };

  const PaginationControls: React.FC<{
    page: number;
    total: number;
    limit: number;
    onPageChange: (newPage: number) => void;
  }> = ({ page, total, limit, onPageChange }) => {

    if (total === 0) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            my: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No patients to show
          </Typography>
        </Box>
      );
    }

    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          my: 2,
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
        <Typography variant="body2" color="text.secondary">
          Patients {start}-{end} out of {total}
        </Typography>
        {totalPages > 1 && (
          <Button
            size="small"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        )}
      </Box>
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
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        pt: 2,
        pb: isDesktop ? 4 : 10,
        position: 'relative'
      }}
    >
      <Notifications />
      <Typography variant="h5" component="h1" fontWeight={700} sx={{ mb: 2, px: isDesktop ? 0 : 2 }}>
        Patients directory
      </Typography>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
        position: 'sticky',
        top: 0,
        bgcolor: 'background.paper',
        zIndex: 1100,
        py: 2,
        mx: -2,
        px: 2,
        gap: 2,
      }}>
        <Select
          id="center"
          value={selectedOption ?? ''}
          onChange={(event: SelectChangeEvent<number>) => {
            setSelectedOption(event.target.value as number);
            setHospitalId(event.target.value as number);
          }}
          size="small"
          sx={{ minWidth: 200, flexShrink: 0 }}
        >
          {filterOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ justifyContent: 'flex-end', flexGrow: 1 }}>
          <Button
            onClick={() => setShowSortingOptions(!showSortingOptions)}
            data-testid="sort-icon"
            endIcon={<SortIcon />}
            sx={{ textTransform: 'none', color: 'text.primary', whiteSpace: 'nowrap' }}
          >
            {sortingLabels[sortingOption]}
          </Button>
          <Button
            id="add_patient"
            variant="contained"
            color="primary"
            size="medium"
            startIcon={<AddCircleIcon />}
            onClick={() => navigate(urls.registerPatient())}
            sx={{
              borderRadius: 1,
              px: 3,
              whiteSpace: 'nowrap',
              minWidth: 'fit-content'
            }}
          >
            Add Patient
          </Button>
        </Stack>
      </Box>

      {patients && (
        <PaginationControls
          page={page}
          total={patients.count}
          limit={limit}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}

      {patients && (
        <Stack spacing={1} sx={{
          flexGrow: 1,
          px: isDesktop ? 0 : 2,
          pb: 2
        }}>
          {patients.results.map((patient) => (
            <PatientCard key={patient.id} {...patient} selectedHospital={selectedOption} />
          ))}
        </Stack>
      )}

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
    </Container>
  );

};

export default PatientDirectory;
