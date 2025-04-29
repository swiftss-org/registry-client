/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

import { Button, Icon } from '@orfium/ictinus';
import { IconWrapper } from 'App.style';
import { ButtonContainer, PageTitle, PageWrapper } from 'common.style';
import ConfirmationModal from 'components/ConfirmationModal';
import { Form } from 'react-final-form';
import { useHistory } from 'react-router';
import urls from 'routing/urls';

import { useGetHospitals, useRegisterPatient } from '../../hooks/api/patientHooks';
import { useResponsiveLayout } from '../../hooks/useResponsiveSidebar';
import RegisterPatientForm from './components/RegisterPatientForm';
import { RegisterPatientFormType } from './types';
import { patientFormValidation } from './utils';

const RegisterPatient: React.FC = () => {
  const { isDesktop } = useResponsiveLayout();
  const { data: hospitals } = useGetHospitals({ offset: 0, limit: 100 });
  const { mutate, isLoading } = useRegisterPatient();

  const handleSubmit = (form: RegisterPatientFormType) => {
    mutate(form);
  };

  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const history = useHistory();

  return (
    <>
      <PageWrapper isDesktop={isDesktop}>
        <PageTitle>
          <IconWrapper>
            <Icon
              name="fatArrowLeft"
              size={24}
              color={'lightGray-700'}
              onClick={() => {
                if (isFormDirty) {
                  setShowWarningModal(true);
                } else {
                  history.push(urls.patients());
                }
              }}
            />
          </IconWrapper>
          Add new patient
        </PageTitle>
        <Form onSubmit={handleSubmit} validate={patientFormValidation}>
          {({ handleSubmit, values, submitting, dirty }) => {
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
                    color={'blue-500'}
                    buttonType="submit"
                    disabled={isLoading || submitting}
                    block
                    size="md"
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
          onClick={() => history.push('/patients')}
        />
      )}
    </>
  );
};

export default RegisterPatient;
