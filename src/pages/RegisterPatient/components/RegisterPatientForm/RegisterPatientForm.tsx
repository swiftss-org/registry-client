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
  SectionTitle,
} from '../../../../common.style';
import { HospitalsAPI } from '../../../../models/apiTypes';
import { RegisterPatientFormType } from '../../types';
import { getHospitalOptions } from '../../utils';
import { FormContainer, FormHeadingContainer, SelectWrapper } from './RegisterPatientForm.style';

type Props = {
  values: RegisterPatientFormType;
  hospitals: HospitalsAPI[];
};

const RegisterPatientForm: React.FC<Props> = ({ values, hospitals }) => {
  return (
    <FormContainer>
      <FormHeadingContainer>
        <SectionTitle>Hospital Details</SectionTitle>
        <FieldWrapper>
          <Field name="hospital">
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;

              return (
                <SelectWrapper>
                  <Select
                    id="hospital"
                    label="Hospital"
                    styleType="outlined"
                    size="sm"
                    required
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
                    options={getHospitalOptions(hospitals)}
                    {...omit(props.input, ['onFocus'])}
                    handleSelectedOption={props.input.onChange}
                  />
                </SelectWrapper>
              );
            }}
          </Field>
        </FieldWrapper>
      </FormHeadingContainer>
      <FormHeadingContainer>
        <SectionTitle>Personal Details</SectionTitle>
        <FieldWrapper>
          <Field name="firstName" parse={(value) => value}>
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;
              return (
                <TextField
                  id="first_name"
                  label="First Name"
                  required
                  styleType="outlined"
                  size="sm"
                  status={hasError ? 'error' : 'hint'}
                  hintMsg={hasError ? props.meta.error : undefined}
                  {...props.input}
                />
              );
            }}
          </Field>
        </FieldWrapper>
        <FieldWrapper>
          <Field name="lastName" parse={(value) => value}>
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;
              return (
                <TextField
                  id="last_name"
                  label="Last Name"
                  required
                  styleType="outlined"
                  size="sm"
                  status={hasError ? 'error' : 'hint'}
                  hintMsg={hasError ? props.meta.error : undefined}
                  {...props.input}
                />
              );
            }}
          </Field>
        </FieldWrapper>
        <FieldsContainer>
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
                const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;
                return (
                  <TextField
                    id="year_of_birth"
                    label="Year Of Birth"
                    required
                    styleType="outlined"
                    type="number"
                    size="sm"
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
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
                    size="sm"
                    {...props.input}
                  />
                );
              }}
            </Field>
          </FieldWrapper>
        </FieldsContainer>
        <FieldWrapper>
          <Field name="nationalId" parse={(value) => value}>
            {(props) => {
              return (
                <TextField
                  id="national_id"
                  label="National ID"
                  styleType="outlined"
                  size="sm"
                  {...props.input}
                />
              );
            }}
          </Field>
        </FieldWrapper>
        <FieldWrapper>
          <Field name="patientHospitalId" parse={(value) => value}>
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;
              return (
                <TextField
                  id="patient_hospital_id"
                  label="Patient Hospital ID"
                  required
                  styleType="outlined"
                  size="sm"
                  status={hasError ? 'error' : 'hint'}
                  hintMsg={hasError ? props.meta.error : undefined}
                  {...props.input}
                />
              );
            }}
          </Field>
        </FieldWrapper>
      </FormHeadingContainer>

      <FormHeadingContainer>
        <SectionTitle>Gender</SectionTitle>
        <FieldsContainer>
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
        <SectionTitle>Contact details:</SectionTitle>
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
                    size="sm"
                    {...props.input}
                  />
                );
              }}
            </Field>
          </FieldWrapper>
        </LongFieldWrapper>
        <FieldWrapper>
          <Field name="phone2" parse={(value) => value}>
            {(props) => {
              return (
                <TextField
                  id="phone2"
                  type="tel"
                  label="Phone #2"
                  styleType="outlined"
                  size="sm"
                  {...props.input}
                />
              );
            }}
          </Field>
        </FieldWrapper>
        <FieldWrapper>
          <Field name="address" parse={(value) => value}>
            {(props) => {
              return (
                <TextField
                  id="address"
                  label="Address"
                  styleType="outlined"
                  size="sm"
                  {...props.input}
                />
              );
            }}
          </Field>
        </FieldWrapper>
      </FormHeadingContainer>
    </FormContainer>
  );
};

export default RegisterPatientForm;
