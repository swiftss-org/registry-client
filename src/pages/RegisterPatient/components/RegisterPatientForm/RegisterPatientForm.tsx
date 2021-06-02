/** @jsxImportSource @emotion/react */
import React, { ChangeEvent } from 'react';
import { Field } from 'react-final-form';
import { Radio, RadioGroup, Select, TextField } from '@orfium/ictinus';
import { omit } from 'lodash';

import {
  FieldsContainer,
  FieldWrapper,
  LongFieldWrapper,
  RadioText,
} from '../../../../common.style';
import {
  FormContainer,
  FormHeadingContainer,
  FormSectionHeading,
} from './RegisterPatientForm.style';

const RegisterPatientForm = () => {
  return (
    <FormContainer>
      <FormHeadingContainer>
        <FormSectionHeading>Hospital Details</FormSectionHeading>
        <FieldsContainer withMargin>
          <LongFieldWrapper>
            <FieldWrapper>
              <Field name="center">
                {(props) => (
                  <Select
                    label="Center"
                    styleType="outlined"
                    size="md"
                    required
                    hintMsg={props.meta.error}
                    options={[{ label: 'Hospital Number 1', value: 1 }]}
                    {...omit(props.input, ['onFocus'])}
                    handleSelectedOption={props.input.onChange}
                  />
                )}
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
                      label="Name *"
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
            <Field name="hospitalId" parse={(value) => value}>
              {(props) => {
                return (
                  <TextField
                    id="hospital_id"
                    label="Patient Hospital ID *"
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
            <Field name="nationalId" parse={(value) => value}>
              {(props) => {
                return (
                  <TextField
                    id="national_id"
                    label="National ID"
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
          <Field name="yearOfBirth" parse={(value) => value}>
            {(props) => {
              return (
                <TextField
                  id="year_of_birth"
                  label="Year Of Birth *"
                  styleType="outlined"
                  size="md"
                  {...props.input}
                />
              );
            }}
          </Field>
        </FieldWrapper>
        <FieldWrapper>
          <Field name="age" parse={(value) => value}>
            {(props) => {
              return (
                <TextField id="age" label="Age *" styleType="outlined" size="md" {...props.input} />
              );
            }}
          </Field>
        </FieldWrapper>
      </FieldsContainer>
      <FormHeadingContainer>
        <FormSectionHeading>Gender</FormSectionHeading>
        <FieldsContainer withMargin>
          <RadioGroup
            name="gender"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              console.log(e.target.value);
            }}
          >
            <div>
              <Radio value="male" />
              <RadioText>Male</RadioText>
            </div>
            <div>
              <Radio value="female" />
              <RadioText>Female</RadioText>
            </div>
          </RadioGroup>
        </FieldsContainer>
      </FormHeadingContainer>
      <FormHeadingContainer>
        <FormSectionHeading>Contact Details</FormSectionHeading>
        <FieldsContainer>
          <LongFieldWrapper>
            <FieldWrapper>
              <Field name="phone1" parse={(value) => value}>
                {(props) => {
                  return (
                    <TextField
                      id="phone1"
                      label="Phone #1"
                      styleType="outlined"
                      size="md"
                      {...props.input}
                    />
                  );
                }}
              </Field>
            </FieldWrapper>
          </LongFieldWrapper>
          <LongFieldWrapper>
            <FieldWrapper>
              <Field name="phone2" parse={(value) => value}>
                {(props) => {
                  return (
                    <TextField
                      id="phone2"
                      label="Phone #2"
                      styleType="outlined"
                      size="md"
                      {...props.input}
                    />
                  );
                }}
              </Field>
            </FieldWrapper>
          </LongFieldWrapper>
          <LongFieldWrapper>
            <FieldWrapper>
              <Field name="address" parse={(value) => value}>
                {(props) => {
                  return (
                    <TextField
                      id="address"
                      label="Address"
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
    </FormContainer>
  );
};

export default RegisterPatientForm;
