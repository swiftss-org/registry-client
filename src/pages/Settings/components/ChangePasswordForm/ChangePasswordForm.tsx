/** @jsxImportSource @emotion/react */
import React from 'react';

import { Button, TextField } from '@mui/material';
import { FieldsContainer, FieldWrapper, LongFieldWrapper } from 'common.style';
import { useChangePassword } from 'hooks/api/userHooks';
import { ChangePasswordFormType } from 'models/apiTypes';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import { useSetNotification } from '../../../../hooks/useSetNotification';
import { ButtonContainer } from '../../../Login/components/LoginForm/LoginForm.style';

const ChangePasswordForm: React.FC = () => {
  const { mutateAsync, isLoading } = useChangePassword();

  const setNotification = useSetNotification();

  const navigate = useNavigate();

  const handleSubmit = (form: ChangePasswordFormType) => {
    return new Promise((resolve) => {
      mutateAsync(form)
        .then(() => {
          setNotification('Password changed successfully', 'success', true, true);
          navigate('/');
          resolve(true);
        })
        .catch((error) => {
          resolve(error.errors);
        });
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {({ handleSubmit, submitting }) => (
        <form style={{ height: '100%' }} onSubmit={handleSubmit}>
          <FieldsContainer withMargin>
            <LongFieldWrapper>
              <FieldWrapper>
                <Field name="old_password" parse={(value) => value}>
                  {(props) => {
                    const hasError =
                      props.meta.touched &&
                      props.meta.invalid &&
                      (props.meta.submitError || props.meta.error);

                    return (
                      <TextField
                        id="old_password"
                        label="Old password"
                        variant="outlined"
                        size="medium"
                        error={hasError}
                        helperText={hasError && (props.meta.error || props.meta.submitError)}
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
                    const hasError =
                      props.meta.touched &&
                      props.meta.invalid &&
                      (props.meta.submitError || props.meta.error);
                    return (
                      <TextField
                        id="new_password1"
                        label="New password"
                        variant="outlined"
                        size="medium"
                        error={hasError}
                        helperText={hasError && (props.meta.error || props.meta.submitError)}
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
                    const hasError =
                      props.meta.touched &&
                      props.meta.invalid &&
                      (props.meta.submitError || props.meta.error);
                    return (
                      <TextField
                        id="new_password2"
                        label="New password (again)"
                        variant="outlined"
                        size="medium"
                        error={hasError}
                        helperText={hasError && (props.meta.error || props.meta.submitError)}
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
              fullWidth
              variant="contained"
              disabled={isLoading || submitting}
              size="large"
              type="submit"
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
