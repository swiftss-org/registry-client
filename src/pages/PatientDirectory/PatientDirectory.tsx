import React, { useEffect, useState, useRef } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import SortIcon from '@mui/icons-material/Sort';
import {
  Box,
  Button,
  Container,
  IconButton,
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
        px: isDesktop ? 0 : 2
      }}>
        <Select
          id="center"
          value={selectedOption ?? ''}
          onChange={(event: SelectChangeEvent<number>) => {
            setSelectedOption(event.target.value as number);
            setHospitalId(event.target.value as number);
          }}
          size="small"
          sx={{ minWidth: 200 }}
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

      <Box
        sx={{
          position: isDesktop ? 'static' : 'fixed',
          bottom: isDesktop ? 'auto' : 0,
          left: isDesktop ? 'auto' : 0,
          right: isDesktop ? 'auto' : 0,
          p: isDesktop ? 0 : 2,
          bgcolor: isDesktop ? 'transparent' : 'background.paper',
          borderTop: isDesktop ? 'none' : 1,
          borderColor: 'divider',
          zIndex: 1000,
          display: 'flex',
          justifyContent: isDesktop ? 'flex-end' : 'stretch'
        }}
      >
        <Button
          id="add_patient"
          variant="contained"
          color="primary"
          fullWidth={!isDesktop}
          size="large"
          startIcon={<AddCircleIcon />}
          onClick={() => navigate(urls.registerPatient())}
          sx={{
            borderRadius: isDesktop ? '28px' : '8px',
            px: isDesktop ? 3 : 2,
            py: 1.5,
            boxShadow: isDesktop ? 3 : 'none',
          }}
        >
          Add Patient
        </Button>
      </Box>

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
