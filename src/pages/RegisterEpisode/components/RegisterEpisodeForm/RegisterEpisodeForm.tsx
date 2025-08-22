/** @jsxImportSource @emotion/react */
import React, { useMemo } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Select, TextField, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
interface SelectOption {
  value: string | number;
  label: string;
}
import { CheckBoxWrapper, FieldWrapper, SectionTitle } from 'common.style';
import Checkbox from 'components/FormElements/Checkbox';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  ArrayContainer,
  FormContainer,
  FormHeadingContainer,
  SelectWrapper,
} from './RegisterEpisodeForm.style';
import { useResponsiveLayout } from '../../../../hooks/useResponsiveSidebar';
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
  SIZE_OPTIONS,
  EPISODE_TYPE_OPTIONS,
} from '../../constants';
import { RegisterEpisodeFormType } from '../../types';
import {getHospitalOptions, getSurgeonOptionsSorted} from '../../utils';

type Props = {
  values: RegisterEpisodeFormType;
  patient: PatientAPI;
  selectedHospital: HospitalsAPI;
  surgeons: SurgeonsAPI[];
  hospitals: HospitalsAPI[];
  addField: (fieldName: string, value: unknown) => void;
  setIsNewHospital: (isNewHospital: boolean) => void;
  isNewHospital: boolean;
};

export const EMPTY_ARRAY = [{}];

const PROPHYLACTIC_OPTIONS = [
  { label: 'IV at start / before surgery' },
  { label: '+24hrs Post Op IV' },
  { label: '+24hrs Post Op Oral' },
  { label: '+48hrs Post Op IV' },
  { label: '+48hrs Post Op Oral' },
];

const RegisterEpisodeForm: React.FC<Props> = ({
  addField,
  surgeons,
  hospitals,
  patient,
  selectedHospital,
  setIsNewHospital,
  isNewHospital,
  values,
}) => {
  const { isDesktop } = useResponsiveLayout();
  const hospitalOptions = useMemo(() => getHospitalOptions(hospitals), [hospitals]);
  const surgeonOptions = useMemo(() => getSurgeonOptionsSorted(surgeons), [surgeons]);

  const defaultHospital = useMemo(
    () => ({ value: selectedHospital?.id, label: selectedHospital?.name }),
    [selectedHospital?.id, selectedHospital?.name]
  );

  return (
    <FormContainer isDesktop={isDesktop}>
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
                  <FormControl fullWidth variant="outlined" required error={hasError}>
                    <InputLabel id="hospital-label">Hospital</InputLabel>
                    <Select
                      labelId="hospital-label"
                      id="hospital"
                      value={props.input.value.value || ''}
                      onChange={(event: SelectChangeEvent<string>) => {
                        const selectedOption = hospitalOptions.find(
                          (option) => option.value === event.target.value
                        );
                        handleSelectHospital(selectedOption || { value: '', label: '' });
                      }}
                      label="Hospital"
                    >
                      {hospitalOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {hasError && <Typography color="error">{props.meta.error}</Typography>}
                  </FormControl>
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
        )}
      </FormHeadingContainer>
      <FormHeadingContainer>
        <SectionTitle>Episode Details</SectionTitle>
        <FieldWrapper>
          <Field name="episodeType">
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;

              return (
                <SelectWrapper>
                  <FormControl fullWidth variant="outlined" required error={hasError}>
                    <InputLabel id="episode-type-label">Episode Type</InputLabel>
                    <Select
                      labelId="episode-type-label"
                      id="episode_type"
                      value={props.input.value.value || ''}
                      onChange={(event: SelectChangeEvent<string>) =>
                        props.input.onChange({ value: event.target.value, label: event.target.value })
                      }
                      label="Episode Type"
                    >
                      {EPISODE_TYPE_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {hasError && <Typography color="error">{props.meta.error}</Typography>}
                  </FormControl>
                </SelectWrapper>
              );
            }}
          </Field>
        </FieldWrapper>
        <FieldWrapper>
          <Field name="cepod">
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;

              return (
                <SelectWrapper>
                  <FormControl fullWidth variant="outlined" required error={hasError}>
                    <InputLabel id="cepod-label">CEPOD</InputLabel>
                    <Select
                      labelId="cepod-label"
                      id="cepod"
                      value={props.input.value.value || ''}
                      onChange={(event: SelectChangeEvent<string>) =>
                        props.input.onChange({ value: event.target.value, label: event.target.value })
                      }
                      label="CEPOD"
                    >
                      {CEPOD_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {hasError && <Typography color="error">{props.meta.error}</Typography>}
                  </FormControl>
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
                  <FormControl fullWidth variant="outlined" required error={hasError}>
                    <InputLabel id="side-label">Side</InputLabel>
                    <Select
                      labelId="side-label"
                      id="side"
                      value={props.input.value.value || ''}
                      onChange={(event: SelectChangeEvent<string>) =>
                        props.input.onChange({ value: event.target.value, label: event.target.value })
                      }
                      label="Side"
                    >
                      {SIDE_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {hasError && <Typography color="error">{props.meta.error}</Typography>}
                  </FormControl>
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
                  <FormControl fullWidth variant="outlined" required error={hasError}>
                    <InputLabel id="occurrence-label">Occurrence</InputLabel>
                    <Select
                      labelId="occurrence-label"
                      id="occurence"
                      value={props.input.value.value || ''}
                      onChange={(event: SelectChangeEvent<string>) =>
                        props.input.onChange({ value: event.target.value, label: event.target.value })
                      }
                      label="Occurrence"
                    >
                      {OCCURRENCE_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {hasError && <Typography color="error">{props.meta.error}</Typography>}
                  </FormControl>
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
                  <FormControl fullWidth variant="outlined" required error={hasError}>
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select
                      labelId="type-label"
                      id="type"
                      value={props.input.value.value || ''}
                      onChange={(event: SelectChangeEvent<string>) =>
                        props.input.onChange({ value: event.target.value, label: event.target.value })
                      }
                      label="Type"
                    >
                      {TYPE_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {hasError && <Typography color="error">{props.meta.error}</Typography>}
                  </FormControl>
                </SelectWrapper>
              );
            }}
          </Field>
        </FieldWrapper>
        <FieldWrapper>
          <Field name="size">
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;

              return (
                <SelectWrapper>
                  <FormControl fullWidth variant="outlined" required error={hasError}>
                    <InputLabel id="size-label">Size</InputLabel>
                    <Select
                      labelId="size-label"
                      id="size"
                      value={props.input.value.value || ''}
                      onChange={(event: SelectChangeEvent<string>) =>
                        props.input.onChange({ value: event.target.value, label: event.target.value })
                      }
                      label="Size"
                    >
                      {SIZE_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {hasError && <Typography color="error">{props.meta.error}</Typography>}
                  </FormControl>
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
                  <FormControl fullWidth variant="outlined" required error={hasError}>
                    <InputLabel id="complexity-label">Complexity</InputLabel>
                    <Select
                      labelId="complexity-label"
                      id="complexity"
                      value={props.input.value.value || ''}
                      onChange={(event: SelectChangeEvent<string>) =>
                        props.input.onChange({ value: event.target.value, label: event.target.value })
                      }
                      label="Complexity"
                    >
                      {COMPLEXITY_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {hasError && <Typography color="error">{props.meta.error}</Typography>}
                  </FormControl>
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
                    type="date"
                    required
                    variant="outlined"
                    size="medium"
                    error={hasError}
                    helperText={hasError ? props.meta.error : undefined}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                  <FormControl fullWidth variant="outlined" required error={hasError}>
                    <InputLabel id="mesh-type-label">Mesh Type</InputLabel>
                    <Select
                      labelId="mesh-type-label"
                      id="mesh_type"
                      value={props.input.value.value || ''}
                      onChange={(event: SelectChangeEvent<string>) =>
                        props.input.onChange({ value: event.target.value, label: event.target.value })
                      }
                      label="Mesh Type"
                    >
                      {MESH_TYPE_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {hasError && <Typography color="error">{props.meta.error}</Typography>}
                  </FormControl>
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
                  <FormControl fullWidth variant="outlined" required error={hasError}>
                    <InputLabel id="anaesthetic-type-label">Anaesthetic Type</InputLabel>
                    <Select
                      labelId="anaesthetic-type-label"
                      id="anaesthetic_type"
                      value={props.input.value.value || ''}
                      onChange={(event: SelectChangeEvent<string>) =>
                        props.input.onChange({ value: event.target.value, label: event.target.value })
                      }
                      label="Anaesthetic Type"
                    >
                      {ANAESTHETIC_TYPE_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {hasError && <Typography color="error">{props.meta.error}</Typography>}
                  </FormControl>
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
                  <FormControl fullWidth variant="outlined" required error={hasError}>
                    <InputLabel id="diathermy-used-label">Diathermy Used</InputLabel>
                    <Select
                      labelId="diathermy-used-label"
                      id="diathermy_used"
                      value={props.input.value.value || ''}
                      onChange={(event: SelectChangeEvent<string>) =>
                        props.input.onChange({ value: event.target.value, label: event.target.value })
                      }
                      label="Diathermy Used"
                    >
                      {BOOLEAN_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {hasError && <Typography color="error">{props.meta.error}</Typography>}
                  </FormControl>
                </SelectWrapper>
              );
            }}
          </Field>
        </FieldWrapper>
        <FieldWrapper>
          <Field name="antibioticUsed">
            {(props) => {
              const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;

              return (
                <SelectWrapper>
                  <FormControl fullWidth variant="outlined" required error={hasError}>
                    <InputLabel id="antibiotic-used-label">Prophylactic antibiotics given?</InputLabel>
                    <Select
                      labelId="antibiotic-used-label"
                      id="antibiotic_used"
                      value={props.input.value.value || ''}
                      onChange={(event: SelectChangeEvent<string>) =>
                        props.input.onChange({ value: event.target.value, label: event.target.value })
                      }
                      label="Prophylactic antibiotics given?"
                    >
                      {BOOLEAN_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {hasError && <Typography color="error">{props.meta.error}</Typography>}
                  </FormControl>
                </SelectWrapper>
              );
            }}
          </Field>
        </FieldWrapper>
        {values?.antibioticUsed?.value === 0 && (
          <CheckBoxWrapper>
            {PROPHYLACTIC_OPTIONS.map((option) => (
              <div key={option.label}>
                <Field
                  name={`antibioticType`}
                  type="checkbox"
                  value={option.label}
                  label={option.label}
                  component={Checkbox}
                />
              </div>
            ))}
          </CheckBoxWrapper>
        )}
        <FieldArray name={'surgeons'} initialValue={EMPTY_ARRAY}>
          {({ fields }) =>
            fields.map((name, index) => (
              <Field name={`${name}`} key={name}>
                {(props) => {
                  const hasError = props.meta.touched && props.meta.invalid && !props.meta.active;

                  return (
                    <ArrayContainer>
                      <SelectWrapper>
                        <FormControl fullWidth variant="outlined" required error={hasError}>
                        <InputLabel id="surgeon-label">Surgeon</InputLabel>
                        <Select
                          labelId="surgeon-label"
                          id="id"
                          value={props.input.value.value || ''}
                          onChange={(event: SelectChangeEvent<string>) =>
                            props.input.onChange({ value: event.target.value, label: event.target.value })
                          }
                          label="Surgeon"
                        >
                          {surgeonOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {hasError && <Typography color="error">{props.meta.error}</Typography>}
                      </FormControl>
                      </SelectWrapper>
                      {index === 0 && (
                        <AddIcon
                          onClick={() => addField('surgeons', undefined)}
                          sx={{ cursor: 'pointer' }}
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
                <TextField
                  id="comments"
                  placeholder="Comments"
                  variant="outlined"
                  multiline
                  rows={4}
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
