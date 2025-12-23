/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Container, Box, Typography, Paper } from '@mui/material';
import ConfirmationModal from 'components/ConfirmationModal';
import { useNavigate } from 'react-router';
import urls from 'routing/urls';

import RegisterPatientForm from './components/RegisterPatientForm';
import { RegisterPatientFormType } from './types';
import { useGetHospitals, useRegisterPatient } from '../../hooks/api/patientHooks';
import { useResponsiveLayout } from '../../hooks/useResponsiveSidebar';

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
    <>
      <Container maxWidth="md" sx={{ pb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, gap: 2 }}>
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
        <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
          <RegisterPatientForm
            hospitals={hospitals?.results ?? []}
            onSubmit={handleSubmit}
            isPending={isPending}
            isDesktop={isDesktop}
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
      </Container>

    </>
  );
};

export default RegisterPatient;
