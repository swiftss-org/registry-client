import React, { useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, IconButton, Paper, Typography } from '@mui/material';
import ConfirmationModal from 'components/ConfirmationModal';
import Notifications from 'components/Notifications';
import {
  useCreateHospitalMapping,
  useGetHospital,
  useGetHospitals,
  useGetPatient,
  useGetSurgeons,
  useRegisterEpisode,
} from 'hooks/api/patientHooks';
import { useResponsiveLayout } from 'hooks/useResponsiveSidebar';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import urls from 'routing/urls';

import RegisterEpisodeForm from './components/RegisterEpisodeForm';
import { RegisterEpisodeFormType } from './types';

const RegisterEpisode: React.FC = () => {
  const { isDesktop } = useResponsiveLayout();
  const { hospitalID, patientID } = useParams<{ hospitalID?: string; patientID?: string }>();

  const [isNewHospital, setIsNewHospital] = useState(false);

  const { data: hospitals } = useGetHospitals({
    offset: 0,
    limit: 100,
  });
  const { data: patient } = useGetPatient(patientID ?? '');
  const { data: selectedHospital } = useGetHospital(hospitalID ?? '');
  const { data: surgeons } = useGetSurgeons({
    offset: 0,
    limit: 100,
  });

  const { mutate: registerEpisode, isPending: isSubmitLoading } = useRegisterEpisode(
    hospitalID,
    patientID
  );

  const { mutateAsync: createMapping } = useCreateHospitalMapping();

  const handleSubmit = (form: RegisterEpisodeFormType) => {
    if (isNewHospital) {
      createMapping({
        patient_id: parseInt(patientID ?? ''),
        hospital_id: form.hospital.value,
        patient_hospital_id: form.patientHospitalId,
      }).then(() => registerEpisode(form));
    } else {
      registerEpisode(form);
    }
  };

  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const navigate = useNavigate();

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
          data-testid="back-button"
          edge="start"
          onClick={() => {
            if (isFormDirty) {
              setShowWarningModal(true);
            } else {
              navigate(urls.patients());
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1" fontWeight={700} color="text.primary">
          Register an Episode
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, ml: 7 }}>
        Please verify that the hospital of the surgery is correct. If you wish, you can choose
        another hospital.
      </Typography>
      <Paper
        elevation={0}
        sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, mb: 2 }}
      >
        {patient && surgeons && hospitals && (selectedHospital || !hospitalID) && (
          <RegisterEpisodeForm
            surgeons={surgeons?.results ?? []}
            patient={patient}
            selectedHospital={selectedHospital}
            hospitals={hospitals?.results ?? []}
            setIsNewHospital={setIsNewHospital}
            isNewHospital={isNewHospital}
            onSubmit={handleSubmit}
            onDirtyChange={setIsFormDirty}
          />
        )}
      </Paper>
      {showWarningModal && (
        <ConfirmationModal
          onClose={() => {
            setShowWarningModal(false);
          }}
          title="Cancel new registration?"
          subtitle="Are you sure you want to cancel registering an episode? All information you've entered will be lost!"
          buttonText="Yes, cancel new registration"
          onClick={() => {
            const targetUrl = (hospitalID && patientID) ? urls.patientDetails(hospitalID, patientID) : urls.patients();
            navigate(targetUrl);
          }
          }
        />
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
          variant="contained"
          color="primary"
          type="submit"
          form="register-episode-form"
          disabled={isSubmitLoading}
          fullWidth={!isDesktop}
          size="large"
          startIcon={<AddCircleIcon />}
          sx={{
            borderRadius: isDesktop ? '28px' : '8px',
            px: isDesktop ? 3 : 2,
            py: 1.5,
            boxShadow: isDesktop ? 3 : 'none',
          }}
        >
          Save Episode
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterEpisode;
