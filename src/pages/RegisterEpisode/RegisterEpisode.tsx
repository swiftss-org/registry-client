/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

import { Button, Icon } from '@orfium/ictinus';
import { IconWrapper } from 'App.style';
import { ButtonContainer, PageSubtitle, PageTitle, PageWrapper } from 'common.style';
import ConfirmationModal from 'components/ConfirmationModal';
import arrayMutators from 'final-form-arrays';
import { Form } from 'react-final-form';
import { useHistory } from 'react-router';
import { useRouteMatch } from 'react-router-dom';
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
  const match = useRouteMatch<{ hospitalID?: string; patientID?: string }>();
  const { hospitalID, patientID } = match.params;

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
                    color={'blue-500'}
                    buttonType="button"
                    onClick={handleSubmit}
                    disabled={isLoading || submitting || isSubmitLoading}
                    block
                    size="md"
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
          onClick={() => history.push(`${urls.patients()}/${hospitalID}/${patientID}`)}
        />
      )}
    </>
  );
};

export default RegisterEpisode;
