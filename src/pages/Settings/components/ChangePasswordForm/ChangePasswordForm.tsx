/** @jsxImportSource @emotion/react */
import React from 'react';

import { Button, TextField } from '@orfium/ictinus';
import { FieldsContainer, FieldWrapper, LongFieldWrapper } from 'common.style';
import { useChangePassword } from 'hooks/api/userHooks';
import { ChangePasswordFormType } from 'models/apiTypes';
import { Field, Form } from 'react-final-form';

import { ButtonContainer } from '../../../Login/components/LoginForm/LoginForm.style';


const ChangePasswordForm: React.FC = () => {
  const { mutate, isLoading } = useChangePassword();

  const handleSubmit = (form: ChangePasswordFormType) => {
    mutate(form);
  };

  return (
  <Form onSubmit={handleSubmit}>
    {({ handleSubmit, valid, submitting }) => (
      <form style={{ height: '100%' }} onSubmit={handleSubmit}>
        <FieldsContainer withMargin>
          <LongFieldWrapper>
            <FieldWrapper>
              <Field name="old_password" parse={(value) => value}>
                {(props) => {
                  const hasError = props.meta.touched && props.meta.invalid;

                  return (
                    <TextField
                      id="old_password"
                      label="Old password"
                      styleType="outlined"
                      size="md"
                      status={hasError && 'error'}
                      hintMsg={hasError && props.meta.error}
                      type="password"
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
              <Field name="new_password1" parse={(value) => value}>
                {(props) => {
                  const hasError = props.meta.touched && props.meta.invalid;
                  return (
                    <TextField
                      id="new_password1"
                      label="New password"
                      styleType="outlined"
                      size="md"
                      status={hasError && 'error'}
                      hintMsg={hasError && props.meta.error}
                      type="password"
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
              <Field name="new_password2" parse={(value) => value}>
                {(props) => {
                  const hasError = props.meta.touched && props.meta.invalid;
                  return (
                    <TextField
                      id="new_password2"
                      label="New password (again)"
                      styleType="outlined"
                      size="md"
                      status={hasError && 'error'}
                      hintMsg={hasError && props.meta.error}
                      type="password"
                      {...props.input}
                    />
                  );
                }}
              </Field>
            </FieldWrapper>
          </LongFieldWrapper>
        </FieldsContainer>

        <ButtonContainer>
          <Button
            block
            color={'blue-500'}
            disabled={isLoading || !valid || submitting}
            filled
            size="lg"
            buttonType="submit"
          >
            Change Password
          </Button>
        </ButtonContainer>
      </form>
    )}
  </Form>
  );
};

export default ChangePasswordForm;
