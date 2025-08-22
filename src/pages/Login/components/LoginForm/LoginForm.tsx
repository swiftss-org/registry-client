/** @jsxImportSource @emotion/react */
import React from 'react';

import { Button, Checkbox, TextField } from '@mui/material';
import { CheckBoxContainer, FieldsContainer, FieldWrapper, LongFieldWrapper } from 'common.style';
import { useSignIn } from 'hooks/api/userHooks';
import { LoginFormType } from 'models/apiTypes';
import { Field, Form } from 'react-final-form';

import { ButtonContainer, FormBottom, FormContainer } from './LoginForm.style';

const SignIn: React.FC = () => {
  const { mutate } = useSignIn();

  const handleSubmit = (form: LoginFormType) => {
    mutate(form);
  };

  return (
    <FormContainer>
      <Form initialValues={{ rememberMe: false }} onSubmit={handleSubmit}>
        {({ handleSubmit }) => (
          <form style={{ height: '100%' }} onSubmit={handleSubmit}>
            <FieldsContainer withMargin>
              <LongFieldWrapper>
                <FieldWrapper>
                  <Field name="username" parse={(value) => value}>
                    {(props) => {
                      return (
                        <TextField
                          id="username"
                          label="Username"
                          variant="outlined"
                          size="medium"
                          {...props.input}
                        />
                      );
                    }}
                  </Field>
                </FieldWrapper>
              </LongFieldWrapper>
            </FieldsContainer>

            <FieldsContainer withMargin>
              <LongFieldWrapper>
                <FieldWrapper>
                  <Field name="password" parse={(value) => value}>
                    {(props) => {
                      const hasError = props.meta.touched && props.meta.invalid;
                      return (
                        <TextField
                          id="currentPassword"
                          label="Password"
                          variant="outlined"
                          size="medium"
                          error={hasError}
                          helperText={hasError && props.meta.error}
                          type="password"
                          {...props.input}
                        />
                      );
                    }}
                  </Field>
                </FieldWrapper>
              </LongFieldWrapper>
            </FieldsContainer>

            <FormBottom>
              <Field name="rememberMe">
                {(props) => {
                  return (
                    <CheckBoxContainer>
                      <Checkbox
                        {...props.input}
                        onClick={props.input.onChange}
                        checked={props.input.value}
                      />
                      <span>Remember Me</span>
                    </CheckBoxContainer>
                  );
                }}
              </Field>
            </FormBottom>

            <ButtonContainer>
              <Button fullWidth variant="contained" size="large" type="submit">
                Sign In
              </Button>
            </ButtonContainer>
          </form>
        )}
      </Form>
    </FormContainer>
  );
};

export default SignIn;
