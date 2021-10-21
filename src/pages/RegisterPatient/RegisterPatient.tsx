/** @jsxImportSource @emotion/react */
import React from 'react';

import { Button, Icon } from '@orfium/ictinus';
import { ButtonContainer, PageTitle, PageWrapper } from 'common.style';
import { Form } from 'react-final-form';
import { useHistory } from 'react-router';
import urls from 'routing/urls';

import { useGetHospitals, useRegisterPatient } from '../../hooks/api/patientHooks';
import RegisterPatientForm from './components/RegisterPatientForm';
import { RegisterPatientFormType } from './types';

const REQUIRED_FIELD_MSG = 'This field is required';

const RegisterPatient = () => {
  const { data: hospitals } = useGetHospitals({ offset: 0, limit: 100 });
  const { mutate, isLoading } = useRegisterPatient();

  const handleSubmit = (form: RegisterPatientFormType) => {
    mutate(form);
  };

  const history = useHistory();

  const formValidation = (values: RegisterPatientFormType) => {
    const errors = {} || {
      hospital: '',
      firstName: '',
      lastName: '',
      yearOfBirth: '',
      patientHospitalId: '',
    };

    if (!values.hospital && typeof values.hospital !== 'object') {
      errors.hospital = REQUIRED_FIELD_MSG;
    }

    if (!values.firstName?.trim()) {
      errors.firstName = REQUIRED_FIELD_MSG;
    }

    if (!values.lastName?.trim()) {
      errors.lastName = REQUIRED_FIELD_MSG;
    }

    if (!values.yearOfBirth) {
      errors.yearOfBirth = REQUIRED_FIELD_MSG;
    }

    if (!values.patientHospitalId?.trim()) {
      errors.patientHospitalId = REQUIRED_FIELD_MSG;
    }

    return errors;
  };

  return (
    <PageWrapper>
      <PageTitle>
        <Icon
          name="fatArrowLeft"
          size={24}
          color={'lightGray-700'}
          onClick={() => history.push(urls.patients())}
        />
        Add new patient
      </PageTitle>
      <Form initialValues={{ rememberMe: false }} onSubmit={handleSubmit} validate={formValidation}>
        {({ handleSubmit, values, valid, submitting }) => (
          <form
            onSubmit={handleSubmit}
            css={{
              display: 'flex',
              flexDirection: 'column',
              height: 'calc(100vh)',
              overflow: 'hidden',
            }}
          >
            <RegisterPatientForm values={values} hospitals={hospitals?.results ?? []} />

            <ButtonContainer>
              <Button
                color={'blue-500'}
                buttonType="submit"
                disabled={isLoading || !valid || submitting}
                block
                size="md"
              >
                Add new patient
              </Button>
            </ButtonContainer>
          </form>
        )}
      </Form>
    </PageWrapper>
  );
};

export default RegisterPatient;
