/** @jsxImportSource @emotion/react */
import React from 'react';

import { Select, TextArea, TextField } from '@orfium/ictinus';
import { omit } from 'lodash';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import { FieldWrapper, SectionTitle } from '../../../../common.style';
import { HospitalsAPI, PatientAPI, SurgeonsAPI } from '../../../../models/apiTypes';
import {
  ANAESTHETIC_TYPE_OPTIONS,
  CEPOD_OPTIONS,
  COMPLEXITY_OPTIONS,
  DIATHERMY_USED_OPTIONS,
  MESH_TYPE_OPTIONS,
  OCCURRENCE_OPTIONS,
  SIDE_OPTIONS,
  TYPE_OPTIONS,
} from '../../constants';
import { RegisterEpisodeFormType } from '../../types';
import { getHospitalOptions, getSurgeonOptions } from '../../utils';
import { FormContainer, FormHeadingContainer, SelectWrapper } from './RegisterEpisodeForm.style';

type Props = {
  values: RegisterEpisodeFormType;
  patient: PatientAPI;
  selectedHospital: HospitalsAPI;
  surgeons: SurgeonsAPI[];
  hospitals: HospitalsAPI[];
};

const RegisterEpisodeForm: React.FC<Props> = ({ surgeons, hospitals }) => {
  const hospitalOptions = getHospitalOptions(hospitals);
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
                    options={hospitalOptions}
                    {...omit(props.input, ['onFocus'])}
                    handleSelectedOption={(option) => {
                      props.input.onChange(option);
                    }}
                  />
                </SelectWrapper>
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
        <SectionTitle>Episode Details</SectionTitle>
        <FieldWrapper>
          <Field name="cepod">
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;

              return (
                <SelectWrapper>
                  <Select
                    id="cepod"
                    label="Cepod"
                    styleType="outlined"
                    size="sm"
                    required
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
                    options={CEPOD_OPTIONS}
                    {...omit(props.input, ['onFocus'])}
                    handleSelectedOption={props.input.onChange}
                  />
                </SelectWrapper>
              );
            }}
          </Field>
        </FieldWrapper>
        <FieldWrapper>
          <Field name="side">
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;

              return (
                <SelectWrapper>
                  <Select
                    id="side"
                    label="Side"
                    styleType="outlined"
                    size="sm"
                    required
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
                    options={SIDE_OPTIONS}
                    {...omit(props.input, ['onFocus'])}
                    handleSelectedOption={props.input.onChange}
                  />
                </SelectWrapper>
              );
            }}
          </Field>
        </FieldWrapper>
        <FieldWrapper>
          <Field name="occurence">
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;

              return (
                <SelectWrapper>
                  <Select
                    id="occurence"
                    label="Occurrence"
                    styleType="outlined"
                    size="sm"
                    required
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
                    options={OCCURRENCE_OPTIONS}
                    {...omit(props.input, ['onFocus'])}
                    handleSelectedOption={props.input.onChange}
                  />
                </SelectWrapper>
              );
            }}
          </Field>
        </FieldWrapper>
        <FieldWrapper>
          <Field name="type">
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;

              return (
                <SelectWrapper>
                  <Select
                    id="type"
                    label="Type"
                    styleType="outlined"
                    size="sm"
                    required
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
                    options={TYPE_OPTIONS}
                    {...omit(props.input, ['onFocus'])}
                    handleSelectedOption={props.input.onChange}
                  />
                </SelectWrapper>
              );
            }}
          </Field>
        </FieldWrapper>
        <FieldWrapper>
          <Field name="complexity">
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;

              return (
                <SelectWrapper>
                  <Select
                    id="complexity"
                    label="Complexity"
                    styleType="outlined"
                    size="sm"
                    required
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
                    options={COMPLEXITY_OPTIONS}
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
        <SectionTitle>Surgery Details</SectionTitle>
        <FieldWrapper>
          <Field name="surgeryDate" parse={(value) => value}>
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;
              return (
                <TextField
                  id="surgery_date"
                  label="Surgery Date"
                  type={'date'}
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
          <Field name="meshType">
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;

              return (
                <SelectWrapper>
                  <Select
                    id="mesh_type"
                    label="Mesh Type"
                    styleType="outlined"
                    size="sm"
                    required
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
                    options={MESH_TYPE_OPTIONS}
                    {...omit(props.input, ['onFocus'])}
                    handleSelectedOption={props.input.onChange}
                  />
                </SelectWrapper>
              );
            }}
          </Field>
        </FieldWrapper>
        <FieldWrapper>
          <Field name="anaestheticType">
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;

              return (
                <SelectWrapper>
                  <Select
                    id="anaesthetic_type"
                    label="Anaesthetic Type"
                    styleType="outlined"
                    size="sm"
                    required
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
                    options={ANAESTHETIC_TYPE_OPTIONS}
                    {...omit(props.input, ['onFocus'])}
                    handleSelectedOption={props.input.onChange}
                  />
                </SelectWrapper>
              );
            }}
          </Field>
        </FieldWrapper>
        <FieldWrapper>
          <Field name="diathermyUsed">
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;

              return (
                <SelectWrapper>
                  <Select
                    id="diathermy_used"
                    label="Diathermy Used"
                    styleType="outlined"
                    size="sm"
                    required
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
                    options={DIATHERMY_USED_OPTIONS}
                    {...omit(props.input, ['onFocus'])}
                    handleSelectedOption={props.input.onChange}
                  />
                </SelectWrapper>
              );
            }}
          </Field>
        </FieldWrapper>
        <FieldArray name={'surgeons'}>
          {({ fields }) =>
            fields.map((name) => (
              <Field name={`${name}`}>
                {(props) => {
                  const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;

                  return (
                    <SelectWrapper>
                      <Select
                        id="id"
                        label="Surgeon"
                        styleType="outlined"
                        size="sm"
                        required
                        status={hasError ? 'error' : 'hint'}
                        hintMsg={hasError ? props.meta.error : undefined}
                        options={getSurgeonOptions(surgeons)}
                        {...omit(props.input, ['onFocus'])}
                        handleSelectedOption={props.input.onChange}
                      />
                    </SelectWrapper>
                  );
                }}
              </Field>
            ))
          }
        </FieldArray>
        <FieldWrapper>
          <Field name="comments">
            {(props) => {
              return (
                <TextArea
                  id="comments"
                  placeholder="Comments"
                  styleType="outlined"
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

export default RegisterEpisodeForm;
