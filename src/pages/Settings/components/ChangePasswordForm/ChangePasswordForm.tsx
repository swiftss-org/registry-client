/** @jsxImportSource @emotion/react */
import React from 'react';

import { Button, TextField } from '@orfium/ictinus';
import { FieldsContainer, FieldWrapper, LongFieldWrapper } from 'common.style';
import { useChangePassword } from 'hooks/api/userHooks';
import { ChangePasswordFormType } from 'models/apiTypes';
import { Field, Form } from 'react-final-form';
import { useHistory } from 'react-router-dom';

import { useSetNotification } from '../../../../hooks/useSetNotification';
import { ButtonContainer } from '../../../Login/components/LoginForm/LoginForm.style';

const ChangePasswordForm: React.FC = () => {
  const { mutateAsync, isLoading } = useChangePassword();

  const setNotification = useSetNotification();

  const history = useHistory();

  const handleSubmit = (form: ChangePasswordFormType) => {
    return new Promise((resolve) => {
      mutateAsync(form)
        .then(() => {
          setNotification('Password changed successfully', 'success', true, true);
          history.push('/');
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
                        styleType="outlined"
                        size="md"
                        status={hasError && 'error'}
                        hintMsg={hasError && (props.meta.error || props.meta.submitError)}
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
                        styleType="outlined"
                        size="md"
                        status={hasError && 'error'}
                        hintMsg={hasError && (props.meta.error || props.meta.submitError)}
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
                        styleType="outlined"
                        size="md"
                        status={hasError && 'error'}
                        hintMsg={hasError && (props.meta.error || props.meta.submitError)}
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
              disabled={isLoading || submitting}
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
