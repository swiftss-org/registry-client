/** @jsxImportSource @emotion/react */
import { FieldsContainer, FieldWrapper, LongFieldWrapper } from '../../../../common.style';
import { Field } from 'react-final-form';
import { Button, TextField } from '@orfium/ictinus';
import React from 'react';
import { FormHeadingContainer, FormSectionHeading } from './RegisterPatientForm.style';
import { ButtonsContainer } from '../../RegisterPatient.style';
import { ButtonContainer } from '../../../Login/components/LoginForm/LoginForm.style';

const RegisterPatientForm = () => {
  return (
    <>
      <FormHeadingContainer>
        <FormSectionHeading>Hospital Details</FormSectionHeading>
        <FieldsContainer withMargin>
          <LongFieldWrapper>
            <FieldWrapper>
              <Field name="email" parse={(value) => value}>
                {(props) => {
                  return (
                    <TextField
                      id="email"
                      label="Email"
                      styleType="outlined"
                      size="md"
                      {...props.input}
                    />
                  );
                }}
              </Field>
            </FieldWrapper>
          </LongFieldWrapper>
        </FieldsContainer>
      </FormHeadingContainer>
      <FormHeadingContainer>
        <FormSectionHeading>Personal Details</FormSectionHeading>
        <FieldsContainer withMargin>
          <LongFieldWrapper>
            <FieldWrapper>
              <Field name="name" parse={(value) => value}>
                {(props) => {
                  return (
                    <TextField
                      id="name"
                      label="Name"
                      styleType="outlined"
                      size="md"
                      {...props.input}
                    />
                  );
                }}
              </Field>
            </FieldWrapper>
          </LongFieldWrapper>
        </FieldsContainer>
      </FormHeadingContainer>
      <FieldsContainer withMargin>
        <LongFieldWrapper>
          <FieldWrapper>
            <Field name="name" parse={(value) => value}>
              {(props) => {
                return (
                  <TextField
                    id="name"
                    label="Name"
                    styleType="outlined"
                    size="md"
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
            <Field name="name" parse={(value) => value}>
              {(props) => {
                return (
                  <TextField
                    id="name"
                    label="Name"
                    styleType="outlined"
                    size="md"
                    {...props.input}
                  />
                );
              }}
            </Field>
          </FieldWrapper>
        </LongFieldWrapper>
      </FieldsContainer>{' '}
      <FieldsContainer withMargin>
        <LongFieldWrapper>
          <FieldWrapper>
            <Field name="name" parse={(value) => value}>
              {(props) => {
                return (
                  <TextField
                    id="name"
                    label="Name"
                    styleType="outlined"
                    size="md"
                    {...props.input}
                  />
                );
              }}
            </Field>
          </FieldWrapper>
        </LongFieldWrapper>
      </FieldsContainer>{' '}
      <FieldsContainer withMargin>
        <LongFieldWrapper>
          <FieldWrapper>
            <Field name="name" parse={(value) => value}>
              {(props) => {
                return (
                  <TextField
                    id="name"
                    label="Name"
                    styleType="outlined"
                    size="md"
                    {...props.input}
                  />
                );
              }}
            </Field>
          </FieldWrapper>
        </LongFieldWrapper>
      </FieldsContainer>
      <FieldsContainer withMargin>
        <FieldWrapper>
          <Field name="name" parse={(value) => value}>
            {(props) => {
              return (
                <TextField id="name" label="Name" styleType="outlined" size="md" {...props.input} />
              );
            }}
          </Field>
        </FieldWrapper>
        <FieldWrapper>
          <Field name="name" parse={(value) => value}>
            {(props) => {
              return (
                <TextField id="name" label="Name" styleType="outlined" size="md" {...props.input} />
              );
            }}
          </Field>
        </FieldWrapper>
      </FieldsContainer>
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
    </>
  );
};

export default RegisterPatientForm;
