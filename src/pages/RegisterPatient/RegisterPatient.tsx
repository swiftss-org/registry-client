/** @jsxImportSource @emotion/react */
import React from 'react';
import { Form } from 'react-final-form';
import { Button } from '@orfium/ictinus';

import { FormHeading, ButtonsContainer } from './RegisterPatient.style';
import { LoginFormType } from '../Login/components/LoginForm/LoginForm';
import RegisterPatientForm from './components/RegisterPatientForm';
import { ButtonContainer } from '../Login/components/LoginForm/LoginForm.style';

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
