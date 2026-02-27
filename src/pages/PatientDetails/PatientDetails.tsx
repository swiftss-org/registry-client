import React from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Button,
  IconButton,
  Container,
  Box,
  Typography,
  Paper,
  Tabs as MuiTabs,
  Tab,
  CircularProgress
} from '@mui/material';
import { useGetHospital, useGetPatient } from 'hooks/api/patientHooks';
import { useResponsiveLayout } from 'hooks/useResponsiveSidebar';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import urls from 'routing/urls';

import EpisodeList from './components/EpisodeList';
import GeneralInformation from './components/GeneralInformation';
import Notifications from '../../components/Notifications';

const PatientDetails: React.FC = () => {
  const { isDesktop } = useResponsiveLayout();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') === 'episodes' ? 1 : 0;
  const navigate = useNavigate();

  const { hospitalID, patientID } = useParams<{ hospitalID?: string; patientID?: string }>();

  const { data: patient, isLoading: isPatientLoading } = useGetPatient(patientID ?? '');
  const { data: hospital, isLoading: isHospitalLoading } = useGetHospital(hospitalID ?? '');

  const isLoading = isHospitalLoading || isPatientLoading;

  const handleTabChange = (__event: React.SyntheticEvent, newValue: number) => {
    setSearchParams({ tab: newValue === 1 ? 'episodes' : 'general' }, { replace: true });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        pb: isDesktop ? 4 : 10,
        pt: 2,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Notifications />
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
        <IconButton
          edge="start"
          onClick={() => {
            navigate(urls.patients());
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1" fontWeight={700}>
          Patient Details
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <MuiTabs value={activeTab} onChange={handleTabChange} aria-label="patient details tabs">
          <Tab label="General Information" />
          <Tab label="Episodes" />
        </MuiTabs>
      </Box>

      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          flexGrow: 1,
          mb: 2,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {activeTab === 0 && <GeneralInformation patient={patient} hospital={hospital} />}
            {activeTab === 1 && <EpisodeList patient={patient} />}
          </>
        )}
      </Paper>

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
          variant="contained"
          color="primary"
          disabled={isLoading}
          fullWidth={!isDesktop}
          size="large"
          startIcon={<AddCircleIcon />}
          onClick={() => {
            if (hospitalID && patientID) {
              navigate(urls.addEpisode(hospitalID, patientID));
            }
          }}
          sx={{
            borderRadius: isDesktop ? '28px' : '8px',
            px: isDesktop ? 3 : 2,
            py: 1.5,
            boxShadow: isDesktop ? 3 : 'none',
          }}
        >
          Register new episode
        </Button>
      </Box>
    </Container>
  );
};

export default PatientDetails;
