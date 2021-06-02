import React from 'react';
import { Form } from 'react-final-form';

import { FormHeading } from './RegisterPatient.style';
import { LoginFormType } from '../Login/components/LoginForm/LoginForm';
import RegisterPatientForm from './components/RegisterPatientForm';

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
          <form onSubmit={handleSubmit}>
            <RegisterPatientForm />
          </form>
        )}
      </Form>
    </>
  );
};

export default RegisterPatient;
