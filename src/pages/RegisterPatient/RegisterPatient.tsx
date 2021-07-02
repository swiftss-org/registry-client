/** @jsxImportSource @emotion/react */
import React from 'react';

import { Button } from '@orfium/ictinus';
import { Form } from 'react-final-form';

import { LoginFormType } from '../../models/apiTypes';
import { ButtonContainer } from '../Login/components/LoginForm/LoginForm.style';
import RegisterPatientForm from './components/RegisterPatientForm';
import { FormHeading, ButtonsContainer } from './RegisterPatient.style';

const RegisterPatient = () => {
  const handleSubmit = (form: LoginFormType) => {
    // mutate(form);
    console.log(form);
  };

  return (
    <>
      <FormHeading>Fill in Patient Details</FormHeading>
      <Form initialValues={{ rememberMe: false }} onSubmit={handleSubmit}>
        {({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            css={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh)' }}
          >
            <RegisterPatientForm />
            <ButtonsContainer>
              <ButtonContainer>
                <Button color={'neutralBlack-700'} size="lg" onClick={() => 'll'}>
                  Save
                </Button>
              </ButtonContainer>

              <ButtonContainer>
                <Button color={'neutralBlack-700'} filled={false} size="lg" onClick={() => 'll'}>
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
