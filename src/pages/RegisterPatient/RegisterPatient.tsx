/** @jsxImportSource @emotion/react */
import React from 'react';

import { Button } from '@orfium/ictinus';
import { Form } from 'react-final-form';

import { useGetHospitals, useRegisterPatient } from '../../hooks/api/patientHooks';
import { ButtonContainer } from '../Login/components/LoginForm/LoginForm.style';
import RegisterPatientForm from './components/RegisterPatientForm';
import { FormHeading, ButtonsContainer } from './RegisterPatient.style';
import { RegisterPatientFormType } from './types';

const RegisterPatient = () => {
  const { data: hospitals } = useGetHospitals({ offset: 0, limit: 100 });
  const { mutate, isLoading } = useRegisterPatient();

  const handleSubmit = (form: RegisterPatientFormType) => {
    mutate(form);
  };

  return (
    <>
      <FormHeading>Fill in Patient Details</FormHeading>
      <Form initialValues={{ rememberMe: false }} onSubmit={handleSubmit}>
        {({ handleSubmit, values, form }) => (
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
            <ButtonsContainer>
              <ButtonContainer>
                <Button
                  disabled={isLoading}
                  buttonType="submit"
                  color={'neutralBlack-700'}
                  size="lg"
                >
                  Save
                </Button>
              </ButtonContainer>

              <ButtonContainer>
                <Button
                  color={'neutralBlack-700'}
                  filled={false}
                  size="lg"
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
              </ButtonContainer>
            </ButtonsContainer>
          </form>
        )}
      </Form>
    </>
  );
};

export default RegisterPatient;
