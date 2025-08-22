/** @jsxImportSource @emotion/react */
import React, { ChangeEvent } from 'react';

import { FormControl, FormHelperText, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { omit } from 'lodash';
import { Field } from 'react-final-form';
import { OnBlur } from 'react-final-form-listeners';

import { FormContainer, FormHeadingContainer, BirthdayFieldsContainer } from './RegisterPatientForm.style';
import {
  FieldsContainer,
  FieldWrapper,
  LongFieldWrapper,
  RadioText,
  SectionTitle,
} from '../../../../common.style';
import { useResponsiveLayout } from '../../../../hooks/useResponsiveSidebar';
import { HospitalsAPI } from '../../../../models/apiTypes';
import { RegisterPatientFormType } from '../../types';
import { getHospitalOptions } from '../../utils';

type Props = {
  values?: RegisterPatientFormType;
  hospitals: HospitalsAPI[];
};

const RegisterPatientForm: React.FC<Props> = ({ values, hospitals }) => {
  const { isDesktop } = useResponsiveLayout();

  const parseOnlyNumbers = (value: string) => {
    return value.replace(/[^0-9]+/g, '');
  };

  return (
    <FormContainer isDesktop={isDesktop}>
      <FormHeadingContainer>
        <SectionTitle>Hospital Details</SectionTitle>
        <FieldWrapper>
          <Field name="hospital">
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;

              return (
                <FormControl fullWidth error={hasError}>
                  <Select
                    id="hospital"
                    label="Hospital"
                    variant="outlined"
                    size="medium"
                    required
                    {...omit(props.input, ['onFocus'])}
                    value={props.input.value}
                    onChange={props.input.onChange}
                  >
                    {getHospitalOptions(hospitals).map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {hasError && <FormHelperText>{props.meta.error}</FormHelperText>}
                </FormControl>
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
                  variant="outlined"
                  size="medium"
                  error={hasError}
                  helperText={hasError ? props.meta.error : undefined}
                  {...props.input}
                />
              );
            }}
          </Field>
        </FieldWrapper>
        <FieldWrapper>
          <Field name="middleName" parse={(value) => value}>
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;
              return (
                <TextField
                  id="first_name"
                  label="Middle Name"
                  variant="outlined"
                  size="medium"
                  error={hasError}
                  helperText={hasError ? props.meta.error : undefined}
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
                  variant="outlined"
                  size="medium"
                  error={hasError}
                  helperText={hasError ? props.meta.error : undefined}
                  {...props.input}
                />
              );
            }}
          </Field>
        </FieldWrapper>
        <BirthdayFieldsContainer>
          <Field name="age">
            {({ input: { onChange } }) => (
              <OnBlur name="yearOfBirth">
                {() => {
                  const age = values?.yearOfBirth !== undefined ? new Date().getFullYear() - values.yearOfBirth : 0;
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
                    variant="outlined"
                    type="number"
                    size="medium"
                    error={hasError}
                    helperText={hasError ? props.meta.error : undefined}
                    {...props.input}
                  />
                );
              }}
            </Field>
          </FieldWrapper>
          <FieldWrapper>
            <Field name="monthOfBirth" parse={(value) => value}>
              {(props) => {
                const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;
                return (
                  <TextField
                    id="month_of_birth"
                    label="Month Of Birth"
                    variant="outlined"
                    type="number"
                    size="medium"
                    error={hasError}
                    helperText={hasError ? props.meta.error : undefined}
                    {...props.input}
                  />
                );
              }}
            </Field>
          </FieldWrapper>
          <FieldWrapper>
            <Field name="dayOfBirth" parse={(value) => value}>
              {(props) => {
                const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;
                return (
                  <TextField
                    id="day_of_birth"
                    label="Day Of Birth"
                    variant="outlined"
                    type="number"
                    size="medium"
                    error={hasError}
                    helperText={hasError ? props.meta.error : undefined}
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
                    variant="outlined"
                    size="medium"
                    {...props.input}
                  />
                );
              }}
            </Field>
          </FieldWrapper>
        </BirthdayFieldsContainer>
        <FieldWrapper>
          <Field name="nationalId" parse={parseOnlyNumbers}>
            {(props) => {
              return (
                <TextField
                  id="national_id"
                  label="National ID"
                  variant="outlined"
                  size="medium"
                  inputProps={{ maxLength: 20 }}
                  {...props.input}
                />
              );
            }}
          </Field>
        </FieldWrapper>
        <FieldWrapper>
          <Field name="patientHospitalId" parse={parseOnlyNumbers}>
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;
              return (
                <TextField
                  id="patient_hospital_id"
                  label="Patient Hospital ID"
                  required
                  variant="outlined"
                  size="medium"
                  inputProps={{ maxLength: 20 }}
                  error={hasError}
                  helperText={hasError ? props.meta.error : undefined}
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
                  value={values?.gender}
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
          <Field name="gender">
            {(props) => {
                          const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;
                          return (
                            <TextField
                              id="gender"
                              label="Gender"
                              variant="outlined"
                              disabled
                              size="medium"
                              inputProps={{ maxLength: 20 }}
                              error={hasError}
                              helperText={hasError ? props.meta.error : undefined}
                              {...props.input}
                            />
                          );
                        }}
          </Field>
        </FieldsContainer>
      </FormHeadingContainer>

      <FormHeadingContainer>
        <SectionTitle>Contact details:</SectionTitle>
        <LongFieldWrapper>
          <FieldWrapper>
            <Field name="phone1" parse={parseOnlyNumbers}>
              {(props) => {
                const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;
                return (
                  <TextField
                    id="phone1"
                    label="Phone #1"
                    variant="outlined"
                    required
                    size="medium"
                    inputProps={{ maxLength: 20 }}
                    error={hasError}
                    helperText={hasError ? props.meta.error : undefined}
                    {...props.input}
                  />
                );
              }}
            </Field>
          </FieldWrapper>
        </LongFieldWrapper>
        <FieldWrapper>
          <Field name="phone2" parse={parseOnlyNumbers}>
            {(props) => {
              return (
                <TextField
                  id="phone2"
                  label="Phone #2"
                  variant="outlined"
                  size="medium"
                  inputProps={{ maxLength: 20 }}
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
                  variant="outlined"
                  size="medium"
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
