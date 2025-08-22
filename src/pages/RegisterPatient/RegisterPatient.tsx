/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, IconButton } from '@mui/material';
import { ButtonContainer, PageTitle, PageWrapper } from 'common.style';
import ConfirmationModal from 'components/ConfirmationModal';
import { Form, FormRenderProps } from 'react-final-form';
import { useNavigate } from 'react-router';
import urls from 'routing/urls';

import RegisterPatientForm from './components/RegisterPatientForm';
import { RegisterPatientFormType } from './types';
import { patientFormValidation } from './utils';
import { useGetHospitals, useRegisterPatient } from '../../hooks/api/patientHooks';
import { useResponsiveLayout } from '../../hooks/useResponsiveSidebar';

const RegisterPatient: React.FC = () => {
  const { isDesktop } = useResponsiveLayout();
  const { data: hospitals } = useGetHospitals({ offset: 0, limit: 100 });
  const { mutate, isLoading } = useRegisterPatient();

  const handleSubmit = (form: RegisterPatientFormType) => {
    mutate(form);
  };

  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <PageWrapper isDesktop={isDesktop}>
        <PageTitle>
          <IconButton
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
          Add new patient
        </PageTitle>
        <Form<RegisterPatientFormType> onSubmit={handleSubmit} validate={patientFormValidation}>
          {({ handleSubmit, values, submitting, dirty }: FormRenderProps<RegisterPatientFormType>) => {
            if (dirty) {
              setIsFormDirty(true);
            }

            return (
              <form
                onSubmit={handleSubmit}
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: isDesktop ? '100%' : 'calc(100vh)',
                  overflow: 'hidden',
                }}
              >
                <RegisterPatientForm values={values} hospitals={hospitals?.results ?? []} />
                <ButtonContainer isDesktop={isDesktop}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading || submitting}
                    fullWidth
                    size="medium"
                  >
                    Add new patient
                  </Button>
                </ButtonContainer>
              </form>
            );
          }}
        </Form>
      </PageWrapper>
      {showWarningModal && (
        <ConfirmationModal
          onClose={() => {
            setShowWarningModal(false);
          }}
          title={'Cancel new addition?'}
          subtitle={
            'Are you sure you want to cancel adding a new patient? All information you’ve entered will be lost!'
          }
          buttonText={'Yes, cancel new addition'}
          onClick={() => navigate('/patients')}
        />
      )}
    </>
  );
};

export default RegisterPatient;
