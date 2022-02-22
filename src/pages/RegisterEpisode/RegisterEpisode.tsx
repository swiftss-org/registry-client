/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

import { Button, Icon } from '@orfium/ictinus';
import { ButtonContainer, PageSubtitle, PageTitle, PageWrapper } from 'common.style';
import ConfirmationModal from 'components/ConfirmationModal';
import arrayMutators from 'final-form-arrays';
import { Form } from 'react-final-form';
import { useHistory } from 'react-router';
import { useRouteMatch } from 'react-router-dom';
import urls from 'routing/urls';

import {
  useGetHospital,
  useGetHospitals,
  useGetPatient,
  useGetSurgeons,
  useRegisterEpisode,
} from '../../hooks/api/patientHooks';
import RegisterEpisodeForm from './components/RegisterEpisodeForm';
import { RegisterEpisodeFormType } from './types';
import { formValidation } from './utils';

const RegisterEpisode: React.FC = () => {
  const match = useRouteMatch<{ hospitalID?: string; patientID?: string }>();
  const { hospitalID, patientID } = match.params;

  const { data: hospitals, isLoading: isHospitalsLoading } = useGetHospitals({
    offset: 0,
    limit: 100,
  });
  const { data: patient, isLoading: isPatientLoading } = useGetPatient(patientID ?? '');
  const { data: hospital, isLoading: isHospitalLoading } = useGetHospital(hospitalID ?? '');
  const { data: surgeons, isLoading: isSurgeonsLoading } = useGetSurgeons({
    offset: 0,
    limit: 100,
  });

  const isLoading =
    isHospitalLoading || isHospitalsLoading || isSurgeonsLoading || isPatientLoading;

  const { mutate, isLoading: isSubmitLoading } = useRegisterEpisode(hospitalID, patientID);

  const handleSubmit = (form: RegisterEpisodeFormType) => {
    mutate(form);
  };

  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const history = useHistory();

  return (
    <>
      <PageWrapper>
        <PageTitle>
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
          validate={formValidation}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            values,
            dirty,
            form: {
              mutators: { push },
            },
            valid,
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
                  height: 'calc(100vh)',
                  overflow: 'hidden',
                }}
              >
                {patient && surgeons && hospitals && hospital && (
                  <RegisterEpisodeForm
                    values={values}
                    surgeons={surgeons?.results ?? []}
                    patient={patient}
                    selectedHospital={hospital}
                    hospitals={hospitals?.results ?? []}
                    addField={push}
                  />
                )}
                <ButtonContainer>
                  <Button
                    color={'blue-500'}
                    buttonType="button"
                    onClick={handleSubmit}
                    disabled={isLoading || !valid || submitting || isSubmitLoading}
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
