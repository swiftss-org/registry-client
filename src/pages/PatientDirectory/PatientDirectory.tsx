
import React, { useEffect, useState, useRef } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import SortIcon from '@mui/icons-material/Sort';
import {
  IconButton,
  Select,
  MenuItem,
  Button,
  Container,
  Box,
  Typography,
  Stack,
  SelectChangeEvent
} from '@mui/material';
import { useGetHospitals, useGetPatients, useGetPreferredHospital } from 'hooks/api/patientHooks';
import { getHospitalOptions } from 'pages/RegisterPatient/utils';
import { useNavigate } from 'react-router';
import urls from 'routing/urls';

import PatientCard from './components/PatientCard';
import SortingOptions from './components/SortingOptions';
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
        height: '100%',
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
          overflowY: 'auto',
          px: isDesktop ? 0 : 2,
          pb: 2,
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'grey.400',
            borderRadius: '4px',
          }
        }}>
          {patients.results.map((patient) => (
            <PatientCard key={patient.id} {...patient} selectedHospital={selectedOption} />
          ))}
        </Stack>
      )}

      <Box sx={{
        position: 'fixed',
        bottom: '12px',
        right: isDesktop ? 'calc(50% - 600px)' : 'calc(50% - 60px)',
        zIndex: 1000
      }}>
        <Button
          id="add_patient"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddCircleIcon />}
          onClick={() => navigate(urls.registerPatient())}
          sx={{
            borderRadius: '28px',
            px: 3,
            py: 1.5,
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6
            }
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
