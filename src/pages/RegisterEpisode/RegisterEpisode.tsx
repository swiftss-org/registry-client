/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, IconButton } from '@mui/material';
import { ButtonContainer, PageSubtitle, PageTitle, PageWrapper } from 'common.style';
import ConfirmationModal from 'components/ConfirmationModal';
import arrayMutators from 'final-form-arrays';
import { Form } from 'react-final-form';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import urls from 'routing/urls';

import RegisterEpisodeForm from './components/RegisterEpisodeForm';
import { RegisterEpisodeFormType } from './types';
import { episodeFormValidation } from './utils';
import {
  useCreateHospitalMapping,
  useGetHospital,
  useGetHospitals,
  useGetPatient,
  useGetSurgeons,
  useRegisterEpisode,
} from '../../hooks/api/patientHooks';
import { useResponsiveLayout } from '../../hooks/useResponsiveSidebar';

const RegisterEpisode: React.FC = () => {
  const { isDesktop } = useResponsiveLayout();
  const { hospitalID, patientID } = useParams<{ hospitalID?: string; patientID?: string }>();

  const [isNewHospital, setIsNewHospital] = useState(false);

  const { data: hospitals, isLoading: isHospitalsLoading } = useGetHospitals({
    offset: 0,
    limit: 100,
  });
  const { data: patient, isLoading: isPatientLoading } = useGetPatient(patientID ?? '');
  const { data: selectedHospital, isLoading: isHospitalLoading } = useGetHospital(hospitalID ?? '');
  const { data: surgeons, isLoading: isSurgeonsLoading } = useGetSurgeons({
    offset: 0,
    limit: 100,
  });

  const isLoading =
    isHospitalLoading || isHospitalsLoading || isSurgeonsLoading || isPatientLoading;

  const { mutate: registerEpisode, isLoading: isSubmitLoading } = useRegisterEpisode(
    hospitalID,
    patientID
  );

  const { mutateAsync: createMapping } = useCreateHospitalMapping();

  const handleSubmit = (form: RegisterEpisodeFormType) => {
    if (isNewHospital) {
      createMapping({
        patient_id: parseInt(patientID ?? ''),
        hospital_id: form.hospital.value,
        patient_hospital_id: form.patientHospitalId.toString(),
      }).then(() => registerEpisode(form));
    } else {
      registerEpisode(form);
    }
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
          Register an Episode
        </PageTitle>
        <PageSubtitle>
          Please verify that the hospital of the surgery is correct. If you wish, you can choose
          another hospital.
        </PageSubtitle>
        <Form
          mutators={{
            ...arrayMutators,
          }}
          validate={(values) => episodeFormValidation(values, isNewHospital)}
          onSubmit={(values) => {
            const newValues = {
              ...values,
              antibioticType: values.antibioticType ? values.antibioticType.join(',') : undefined,
            };
            handleSubmit(newValues);
          }}
        >
          {({
            handleSubmit,
            values,
            dirty,
            form: {
              mutators: { push },
            },
            submitting,
          }) => {
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
                {patient && surgeons && hospitals && selectedHospital && (
                  <RegisterEpisodeForm
                    values={values}
                    surgeons={surgeons?.results ?? []}
                    patient={patient}
                    selectedHospital={selectedHospital}
                    hospitals={hospitals?.results ?? []}
                    addField={push}
                    setIsNewHospital={setIsNewHospital}
                    isNewHospital={isNewHospital}
                  />
                )}
                <ButtonContainer isDesktop={isDesktop}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isLoading || submitting || isSubmitLoading}
                    fullWidth
                    size="medium"
                  >
                    Register an Episode
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
          title={'Cancel new registration?'}
          subtitle={
            'Are you sure you want to cancel registering an episode? All information you’ve entered will be lost!'
          }
          buttonText={'Yes, cancel new registration'}
          onClick={() => navigate(`${urls.patients()}/${hospitalID}/${patientID}`)}
        />
      )}
    </>
  );
};

export default RegisterEpisode;
