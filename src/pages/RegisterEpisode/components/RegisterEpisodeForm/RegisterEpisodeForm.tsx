/** @jsxImportSource @emotion/react */
import React, { useMemo } from 'react';

import { Icon, Select, TextArea, TextField } from '@orfium/ictinus';
import { SelectOption } from '@orfium/ictinus/dist/components/Select/Select';
import { omit } from 'lodash';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import { FieldWrapper, SectionTitle } from '../../../../common.style';
import { HospitalsAPI, PatientAPI, SurgeonsAPI } from '../../../../models/apiTypes';
import {
  ANAESTHETIC_TYPE_OPTIONS,
  CEPOD_OPTIONS,
  COMPLEXITY_OPTIONS,
  BOOLEAN_OPTIONS,
  MESH_TYPE_OPTIONS,
  OCCURRENCE_OPTIONS,
  SIDE_OPTIONS,
  TYPE_OPTIONS,
} from '../../constants';
import { RegisterEpisodeFormType } from '../../types';
import { getHospitalOptions, getSurgeonOptions } from '../../utils';
import {
  ArrayContainer,
  FormContainer,
  FormHeadingContainer,
  SelectWrapper,
} from './RegisterEpisodeForm.style';

type Props = {
  values: RegisterEpisodeFormType;
  patient: PatientAPI;
  selectedHospital: HospitalsAPI;
  surgeons: SurgeonsAPI[];
  hospitals: HospitalsAPI[];
  addField: (fieldName: string, value: any) => void;
  setIsNewHospital: (isNewHospital: boolean) => void;
  isNewHospital: boolean;
};

export const EMPTY_ARRAY = [{}];

const RegisterEpisodeForm: React.FC<Props> = ({
  addField,
  surgeons,
  hospitals,
  patient,
  selectedHospital,
  setIsNewHospital,
  isNewHospital,
}) => {
  const hospitalOptions = useMemo(() => getHospitalOptions(hospitals), [hospitals]);
  const surgeonOptions = useMemo(() => getSurgeonOptions(surgeons), [surgeons]);

  const defaultHospital = useMemo(
    () => ({ value: selectedHospital?.id, label: selectedHospital?.name }),
    [selectedHospital?.id, selectedHospital?.name]
  );

  return (
    <FormContainer>
      <FormHeadingContainer>
        <SectionTitle>Hospital Details</SectionTitle>
        <FieldWrapper>
          <Field name="hospital" initialValue={defaultHospital}>
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;

              const handleSelectHospital = (option: SelectOption) => {
                props.input.onChange(option);

                if (
                  patient?.hospital_mappings.find(
                    (mapping) => mapping.hospital_id === option.value
                  ) === undefined
                ) {
                  setIsNewHospital(true);
                } else {
                  setIsNewHospital(false);
                }
              };

              return (
                <SelectWrapper>
                  <Select
                    id="hospital"
                    label="Hospital"
                    styleType="outlined"
                    size="md"
                    required
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
                    options={hospitalOptions}
                    {...omit(props.input, ['onFocus'])}
                    selectedOption={hospitalOptions.find(
                      (option) => option.value === props.input.value.value
                    )}
                    handleSelectedOption={handleSelectHospital}
                  />
                </SelectWrapper>
              );
            }}
          </Field>
        </FieldWrapper>
        {isNewHospital && (
          <FieldWrapper>
            <Field name="patientHospitalId" parse={(value) => value}>
              {(props) => {
                const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;
                return (
                  <TextField
                    id="patient_hospital_id"
                    label="Patient Hospital ID"
                    required={isNewHospital}
                    styleType="outlined"
                    size="md"
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
                    {...props.input}
                  />
                );
              }}
            </Field>
          </FieldWrapper>
        )}
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
                    size="md"
                    required
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
                    options={CEPOD_OPTIONS}
                    {...omit(props.input, ['onFocus'])}
                    selectedOption={CEPOD_OPTIONS.find(
                      (option) => option.value === props.input.value.value
                    )}
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
                    size="md"
                    required
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
                    options={SIDE_OPTIONS}
                    selectedOption={SIDE_OPTIONS.find(
                      (option) => option.value === props.input.value.value
                    )}
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
                    size="md"
                    required
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
                    options={OCCURRENCE_OPTIONS}
                    {...omit(props.input, ['onFocus'])}
                    selectedOption={OCCURRENCE_OPTIONS.find(
                      (option) => option.value === props.input.value.value
                    )}
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
                    size="md"
                    required
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
                    options={TYPE_OPTIONS}
                    {...omit(props.input, ['onFocus'])}
                    selectedOption={TYPE_OPTIONS.find(
                      (option) => option.value === props.input.value.value
                    )}
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
                    size="md"
                    required
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
                    options={COMPLEXITY_OPTIONS}
                    {...omit(props.input, ['onFocus'])}
                    selectedOption={COMPLEXITY_OPTIONS.find(
                      (option) => option.value === props.input.value.value
                    )}
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
                  size="md"
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
                    size="md"
                    required
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
                    options={MESH_TYPE_OPTIONS}
                    {...omit(props.input, ['onFocus'])}
                    selectedOption={MESH_TYPE_OPTIONS.find(
                      (option) => option.value === props.input.value.value
                    )}
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
                    size="md"
                    required
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
                    options={ANAESTHETIC_TYPE_OPTIONS}
                    {...omit(props.input, ['onFocus'])}
                    selectedOption={ANAESTHETIC_TYPE_OPTIONS.find(
                      (option) => option.value === props.input.value.value
                    )}
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
                    size="md"
                    required
                    status={hasError ? 'error' : 'hint'}
                    hintMsg={hasError ? props.meta.error : undefined}
                    options={BOOLEAN_OPTIONS}
                    {...omit(props.input, ['onFocus'])}
                    selectedOption={BOOLEAN_OPTIONS.find(
                      (option) => option.value === props.input.value.value
                    )}
                    handleSelectedOption={props.input.onChange}
                  />
                </SelectWrapper>
              );
            }}
          </Field>
        </FieldWrapper>
        <FieldArray name={'surgeons'} initialValue={EMPTY_ARRAY}>
          {({ fields }) =>
            fields.map((name, index) => (
              <Field name={`${name}`} key={name}>
                {(props) => {
                  const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;

                  return (
                    <ArrayContainer>
                      <SelectWrapper>
                        <Select
                          id="id"
                          label="Surgeon"
                          isSearchable={false}
                          styleType="outlined"
                          size="md"
                          required
                          status={hasError ? 'error' : 'hint'}
                          hintMsg={hasError ? props.meta.error : undefined}
                          options={surgeonOptions}
                          {...omit(props.input, ['onFocus'])}
                          selectedOption={surgeonOptions.find(
                            (option) => option.value === props.input.value.value
                          )}
                          handleSelectedOption={props.input.onChange}
                        />
                      </SelectWrapper>
                      {index === 0 && (
                        <Icon
                          name={'plus'}
                          size={24}
                          onClick={() => addField('surgeons', undefined)}
                        />
                      )}
                    </ArrayContainer>
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
