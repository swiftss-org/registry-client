/** @jsxImportSource @emotion/react */
import React, { ChangeEvent } from 'react';

import { Radio, RadioGroup, Select, TextField } from '@orfium/ictinus';
import { omit } from 'lodash';
import { Field } from 'react-final-form';
import { OnBlur } from 'react-final-form-listeners';

import {
  FieldsContainer,
  FieldWrapper,
  LongFieldWrapper,
  RadioText,
} from '../../../../common.style';
import { HospitalsAPI } from '../../../../models/apiTypes';
import { RegisterPatientFormType } from '../../types';
import { getHospitalOptions } from '../../utils';
import {
  FormContainer,
  FormHeadingContainer,
  FormSectionHeading,
} from './RegisterPatientForm.style';

type Props = {
  values: RegisterPatientFormType;
  hospitals: HospitalsAPI[];
};

const RegisterPatientForm: React.FC<Props> = ({ values, hospitals }) => {
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
                    options={getHospitalOptions(hospitals)}
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
                      label="Name"
                      required
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
            <Field name="patientHospitalId" parse={(value) => value}>
              {(props) => {
                return (
                  <TextField
                    id="patient_hospital_id"
                    label="Patient Hospital ID"
                    required
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
        <Field name="age">
          {({ input: { onChange } }) => (
            <OnBlur name="yearOfBirth">
              {() => {
                const age = new Date().getFullYear() - values.yearOfBirth;
                onChange(age < 150 ? age : '');
              }}
            </OnBlur>
          )}
        </Field>
        <FieldWrapper>
          <Field name="yearOfBirth" parse={(value) => value}>
            {(props) => {
              return (
                <TextField
                  id="year_of_birth"
                  label="Year Of Birth"
                  required
                  styleType="outlined"
                  type="number"
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
                <TextField
                  disabled
                  id="age"
                  label="Age"
                  type="number"
                  styleType="outlined"
                  size="md"
                  {...props.input}
                />
              );
            }}
          </Field>
        </FieldWrapper>
      </FieldsContainer>
      <FormHeadingContainer>
        <FormSectionHeading>Gender</FormSectionHeading>
        <FieldsContainer withMargin>
          <Field name="gender">
            {({ input: { onChange } }) => {
              return (
                <RadioGroup
                  name="gender"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    onChange(e.target.value);
                  }}
                >
                  <div>
                    <Radio value="Male" />

                    <RadioText>Male</RadioText>
                  </div>
                  <div>
                    <Radio value="Female" />
                    <RadioText>Female</RadioText>
                  </div>
                </RadioGroup>
              );
            }}
          </Field>
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
                      type="tel"
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
                      type="tel"
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
