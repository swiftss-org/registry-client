import React, { useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, IconButton, Paper, Typography } from '@mui/material';
import ConfirmationModal from 'components/ConfirmationModal';
import { useGetHospitals, useRegisterPatient } from 'hooks/api/patientHooks';
import { useResponsiveLayout } from 'hooks/useResponsiveSidebar';
import { useNavigate } from 'react-router';
import urls from 'routing/urls';

import RegisterPatientForm from './components/RegisterPatientForm';
import { RegisterPatientFormType } from './types';

const RegisterPatient: React.FC = () => {
  const { isDesktop } = useResponsiveLayout();
  const { data: hospitals } = useGetHospitals({ offset: 0, limit: 100 });
  const { mutate, isPending } = useRegisterPatient();

  const handleSubmit = (form: RegisterPatientFormType) => {
    mutate(form);
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
          Add new patient
        </Typography>
      </Box>
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, mb: 2 }}>
        <RegisterPatientForm
          hospitals={hospitals?.results ?? []}
          onSubmit={handleSubmit}
          onDirtyChange={setIsFormDirty}
        />
      </Paper>
      {showWarningModal && (
        <ConfirmationModal
          onClose={() => {
            setShowWarningModal(false);
          }}
          title={'Cancel new addition?'}
          subtitle={
            "Are you sure you want to cancel adding a new patient? All information you’ve entered will be lost!"
          }
          buttonText={'Yes, cancel new addition'}
          onClick={() => navigate(urls.patients())}
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
          form="register-patient-form"
          disabled={isPending}
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
          Save patient
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterPatient;
