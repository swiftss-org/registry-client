import React, { useEffect, useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Grid,
} from '@mui/material';

import { HospitalsAPI, PatientAPI, SurgeonsAPI } from '../../../../models/apiTypes';
import { scrollToError } from '../../../../utils/formUtils';
import { FilterOption } from '../../../types';
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
import { getHospitalOptions, getSurgeonOptionsSorted } from '../../utils';

type Props = {
  patient: PatientAPI;
  selectedHospital?: HospitalsAPI;
  surgeons: SurgeonsAPI[];
  hospitals: HospitalsAPI[];
  setIsNewHospital: (isNewHospital: boolean) => void;
  isNewHospital: boolean;
  onSubmit: (data: RegisterEpisodeFormType) => void;
  onDirtyChange?: (isDirty: boolean) => void;
};

export const EMPTY_ARRAY = [{}];

const PROPHYLACTIC_OPTIONS = [
  { label: 'IV at start / before surgery', value: 'IV at start / before surgery' },
  { label: '+24hrs Post Op IV', value: '+24hrs Post Op IV' },
  { label: '+24hrs Post Op Oral', value: '+24hrs Post Op Oral' },
  { label: '+48hrs Post Op IV', value: '+48hrs Post Op IV' },
  { label: '+48hrs Post Op Oral', value: '+48hrs Post Op Oral' },
];

const initialValues = {
  hospital: { value: -1, label: '' },
  patientHospitalId: '',
  episodeType: { value: -1, label: '' },
  surgeryDate: '',
  cepod: { value: -1, label: '' },
  side: { value: -1, label: '' },
  occurence: { value: -1, label: '' },
  type: { value: -1, label: '' },
  size: { value: -1, label: '' },
  complexity: { value: -1, label: '' },
  meshType: { value: -1, label: '' },
  anaestheticType: { value: -1, label: '' },
  diathermyUsed: { value: -1, label: '' },
  antibioticUsed: { value: -1, label: '' },
  antibioticType: [] as string[],
  comments: '',
};

const RegisterEpisodeForm: React.FC<Props> = ({
  surgeons,
  hospitals,
  patient,
  selectedHospital,
  setIsNewHospital,
  isNewHospital,
  onSubmit,
  onDirtyChange,
}) => {
  const hospitalOptions = useMemo(() => getHospitalOptions(hospitals), [hospitals]);
  const surgeonOptions = useMemo(() => getSurgeonOptionsSorted(surgeons), [surgeons]);

  const defaultHospital = useMemo(() => {
    if (selectedHospital?.id) {
      return { value: selectedHospital.id, label: selectedHospital.name };
    }

    if (patient?.hospital_mappings && patient.hospital_mappings.length > 0) {
      const firstMapping = patient.hospital_mappings[0];
      const matchedHospital = hospitals.find((h) => h.id === firstMapping.hospital_id);
      if (matchedHospital) {
        return { value: matchedHospital.id, label: matchedHospital.name };
      }
    }

    return { value: -1, label: '' };
  }, [selectedHospital, patient, hospitals]);

  const [values, setValues] = useState({
    ...initialValues,
    hospital: defaultHospital,
  });
  const [surgeonsList, setSurgeonsList] = useState<Array<{ value: number; label: string }>>([
    { value: -1, label: '' },
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const isDirty =
      JSON.stringify(values) !== JSON.stringify({ ...initialValues, hospital: defaultHospital }) ||
      surgeonsList.length > 1 ||
      surgeonsList[0].value !== -1;
    onDirtyChange?.(isDirty);
  }, [values, surgeonsList, onDirtyChange, defaultHospital]);

  useEffect(() => {
    if (values.hospital.value !== -1) {
      const isMapped = patient?.hospital_mappings.some(
        (mapping) => mapping.hospital_id === Number(values.hospital.value)
      );
      setIsNewHospital(!isMapped);
    }
  }, [values.hospital.value, patient?.hospital_mappings, setIsNewHospital]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name as string]: value });
    if (errors[name as string]) {
      setErrors({ ...errors, [name as string]: '' });
    }
  };

  const handleSelectChange = (name: string, value: FilterOption | { value: number; label: string }) => {
    setValues({ ...values, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleAntibioticCheckboxChange = (value: string, checked: boolean) => {
    const currentTypes = values.antibioticType;
    const newTypes = checked
      ? [...currentTypes, value]
      : currentTypes.filter((type) => type !== value);
    setValues({ ...values, antibioticType: newTypes });
    if (errors.antibioticType) {
      setErrors({ ...errors, antibioticType: '' });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!values.hospital || values.hospital.value < 0) newErrors.hospital = 'Hospital field is required';
    if (isNewHospital && !values.patientHospitalId) {
      newErrors.patientHospitalId = 'Patient Hospital ID field is required';
    } else if (values.patientHospitalId && !/^\d+$/.test(values.patientHospitalId)) {
      newErrors.patientHospitalId = 'Patient Hospital ID field must be a number';
    }
    if (!values.episodeType || values.episodeType.value < 0) newErrors.episodeType = 'Episode Type field is required';
    if (!values.cepod || values.cepod.value < 0) newErrors.cepod = 'CEPOD field is required';
    if (!values.side || values.side.value < 0) newErrors.side = 'Side field is required';
    if (!values.surgeryDate?.trim()) newErrors.surgeryDate = 'Surgery Date field is required. Please select a date.';
    if (new Date(values.surgeryDate?.trim()) > new Date()) newErrors.surgeryDate = 'Surgery date cannot be set in the future.';
    if (!values.occurence || values.occurence.value < 0) newErrors.occurence = 'Occurrence field is required';
    if (!values.type || values.type.value < 0) newErrors.type = 'Type field is required';
    if (!values.size || values.size.value < 0) newErrors.size = 'Size field is required';
    if (!values.complexity || values.complexity.value < 0) newErrors.complexity = 'Complexity field is required';
    if (!values.meshType || values.meshType.value < 0) newErrors.meshType = 'Mesh Type field is required';
    if (!values.anaestheticType || values.anaestheticType.value < 0) newErrors.anaestheticType = 'Anaesthetic Type field is required';
    if (!values.diathermyUsed || values.diathermyUsed.value < 0) newErrors.diathermyUsed = 'Diathermy Used field is required';
    if (!values.antibioticUsed || values.antibioticUsed.value < 0) newErrors.antibioticUsed = 'Prophylactic antibiotics field is required';
    if (values.antibioticUsed.value === 0 && values.antibioticType.length === 0) {
      const errorMessage = 'If antibiotics have been used you must record the type';
      newErrors.antibioticUsed = errorMessage;
      newErrors.antibioticType = errorMessage;
    }
    if (surgeonsList.length === 0 || surgeonsList[0].value < 0) newErrors['surgeons[0]'] = 'Surgeon field is required';

    return newErrors;
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    setTouched({ ...touched, [target.name]: true });
    const newErrors = validate();
    setErrors(newErrors);
  };

  const handleSelectBlur = (name: string) => {
    setTouched({ ...touched, [name]: true });
    const newErrors = validate();
    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        ...values,
        patientHospitalId: values.patientHospitalId,
        antibioticType:
          values.antibioticType.length > 0 ? values.antibioticType.join(',') : 'none',
        surgeons: surgeonsList.filter((s) => s.value >= 0),
      } as RegisterEpisodeFormType);
    } else {
      setErrors(newErrors);
      const allTouched: Record<string, boolean> = {};
      Object.keys(values).forEach((key) => {
        allTouched[key] = true;
      });
      surgeonsList.forEach((__unused, index) => {
        allTouched[`surgeons[${index}]`] = true;
      });
      setTouched(allTouched);

      scrollToError(newErrors);
    }
  };

  const addSurgeon = () => {
    setSurgeonsList([...surgeonsList, { value: -1, label: '' }]);
  };

  const removeSurgeon = (index: number) => {
    const newList = surgeonsList.filter((__unused, i) => i !== index);
    setSurgeonsList(newList);
  };

  const updateSurgeon = (index: number, surgeon: { value: number; label: string }) => {
    const newList = [...surgeonsList];
    newList[index] = surgeon;
    setSurgeonsList(newList);
    if (errors[`surgeons[${index}]`]) {
      setErrors({ ...errors, [`surgeons[${index}]`]: '' });
    }
  };

  return (
    <Box
      id="register-episode-form"
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="primary.dark" gutterBottom>
          Hospital Details
        </Typography>
        <FormControl fullWidth margin="normal" error={touched.hospital && !!errors.hospital}>
          <InputLabel>Hospital</InputLabel>
          <Select
            id="hospital"
            name="hospital"
            value={values.hospital.value === -1 ? '' : values.hospital.value}
            label="Hospital"
            onChange={(e: SelectChangeEvent<number>) => {
              const selectedOption = hospitalOptions.find(
                (option) => option.value === Number(e.target.value)
              );
              if (selectedOption) {
                handleSelectChange('hospital', selectedOption);
              }
            }}
            onBlur={() => handleSelectBlur('hospital')}
          >
            {hospitalOptions.map((h) => (
              <MenuItem key={h.value} value={h.value}>
                {h.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{touched.hospital && errors.hospital}</FormHelperText>
        </FormControl>

        {isNewHospital && (
          <TextField
            id="patient_hospital_id"
            label="Patient Hospital ID"
            name="patientHospitalId"
            value={values.patientHospitalId}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.patientHospitalId && !!errors.patientHospitalId}
            helperText={touched.patientHospitalId && errors.patientHospitalId}
            fullWidth
            margin="normal"
            required
          />
        )}

        <Typography variant="h6" color="primary.dark" gutterBottom sx={{ mt: 3 }}>
          Episode Details
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl
              fullWidth
              error={touched.episodeType && !!errors.episodeType}
              required
            >
              <InputLabel>Episode Type</InputLabel>
              <Select
                id="episode_type"
                name="episodeType"
                value={values.episodeType.value === -1 ? '' : values.episodeType.value}
                label="Episode Type"
                onChange={(e: SelectChangeEvent<number>) => {
                  const selectedOption = EPISODE_TYPE_OPTIONS.find(
                    (option) => option.value === Number(e.target.value)
                  );
                  if (selectedOption) {
                    handleSelectChange('episodeType', selectedOption);
                  }
                }}
                onBlur={() => handleSelectBlur('episodeType')}
              >
                {EPISODE_TYPE_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{touched.episodeType && errors.episodeType}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth error={touched.cepod && !!errors.cepod} required>
              <InputLabel>CEPOD</InputLabel>
              <Select
                id="cepod"
                name="cepod"
                value={values.cepod.value === -1 ? '' : values.cepod.value}
                label="CEPOD"
                onChange={(e: SelectChangeEvent<number>) => {
                  const selectedOption = CEPOD_OPTIONS.find(
                    (option) => option.value === Number(e.target.value)
                  );
                  if (selectedOption) {
                    handleSelectChange('cepod', selectedOption);
                  }
                }}
                onBlur={() => handleSelectBlur('cepod')}
              >
                {CEPOD_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{touched.cepod && errors.cepod}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth error={touched.side && !!errors.side} required>
              <InputLabel>Side</InputLabel>
              <Select
                id="side"
                name="side"
                value={values.side.value === -1 ? '' : values.side.value}
                label="Side"
                onChange={(e: SelectChangeEvent<number>) => {
                  const selectedOption = SIDE_OPTIONS.find(
                    (option) => option.value === Number(e.target.value)
                  );
                  if (selectedOption) {
                    handleSelectChange('side', selectedOption);
                  }
                }}
                onBlur={() => handleSelectBlur('side')}
              >
                {SIDE_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{touched.side && errors.side}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth error={touched.occurence && !!errors.occurence} required>
              <InputLabel>Occurrence</InputLabel>
              <Select
                id="occurence"
                name="occurence"
                value={values.occurence.value === -1 ? '' : values.occurence.value}
                label="Occurrence"
                onChange={(e: SelectChangeEvent<number>) => {
                  const selectedOption = OCCURRENCE_OPTIONS.find(
                    (option) => option.value === Number(e.target.value)
                  );
                  if (selectedOption) {
                    handleSelectChange('occurence', selectedOption);
                  }
                }}
                onBlur={() => handleSelectBlur('occurence')}
              >
                {OCCURRENCE_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{touched.occurence && errors.occurence}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth error={touched.type && !!errors.type} required>
              <InputLabel>Type</InputLabel>
              <Select
                id="type"
                name="type"
                value={values.type.value === -1 ? '' : values.type.value}
                label="Type"
                onChange={(e: SelectChangeEvent<number>) => {
                  const selectedOption = TYPE_OPTIONS.find(
                    (option) => option.value === Number(e.target.value)
                  );
                  if (selectedOption) {
                    handleSelectChange('type', selectedOption);
                  }
                }}
                onBlur={() => handleSelectBlur('type')}
              >
                {TYPE_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{touched.type && errors.type}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth error={touched.size && !!errors.size} required>
              <InputLabel>Size</InputLabel>
              <Select
                id="size"
                name="size"
                value={values.size.value === -1 ? '' : values.size.value}
                label="Size"
                onChange={(e: SelectChangeEvent<number>) => {
                  const selectedOption = SIZE_OPTIONS.find(
                    (option) => option.value === Number(e.target.value)
                  );
                  if (selectedOption) {
                    handleSelectChange('size', selectedOption);
                  }
                }}
                onBlur={() => handleSelectBlur('size')}
              >
                {SIZE_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{touched.size && errors.size}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth error={touched.complexity && !!errors.complexity} required>
              <InputLabel>Complexity</InputLabel>
              <Select
                id="complexity"
                name="complexity"
                value={values.complexity.value === -1 ? '' : values.complexity.value}
                label="Complexity"
                onChange={(e: SelectChangeEvent<number>) => {
                  const selectedOption = COMPLEXITY_OPTIONS.find(
                    (option) => option.value === Number(e.target.value)
                  );
                  if (selectedOption) {
                    handleSelectChange('complexity', selectedOption);
                  }
                }}
                onBlur={() => handleSelectBlur('complexity')}
              >
                {COMPLEXITY_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{touched.complexity && errors.complexity}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        <Typography variant="h6" color="primary.dark" gutterBottom sx={{ mt: 3 }}>
          Surgery Details
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              id="surgery_date"
              label="Surgery Date"
              name="surgeryDate"
              type="date"
              value={values.surgeryDate}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.surgeryDate && !!errors.surgeryDate}
              helperText={touched.surgeryDate && errors.surgeryDate}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth error={touched.meshType && !!errors.meshType} required>
              <InputLabel>Mesh Type</InputLabel>
              <Select
                id="mesh_type"
                name="meshType"
                value={values.meshType.value === -1 ? '' : values.meshType.value}
                label="Mesh Type"
                onChange={(e: SelectChangeEvent<number>) => {
                  const selectedOption = MESH_TYPE_OPTIONS.find(
                    (option) => option.value === Number(e.target.value)
                  );
                  if (selectedOption) {
                    handleSelectChange('meshType', selectedOption);
                  }
                }}
                onBlur={() => handleSelectBlur('meshType')}
              >
                {MESH_TYPE_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{touched.meshType && errors.meshType}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl
              fullWidth
              error={touched.anaestheticType && !!errors.anaestheticType}
              required
            >
              <InputLabel>Anaesthetic Type</InputLabel>
              <Select
                id="anaesthetic_type"
                name="anaestheticType"
                value={values.anaestheticType.value === -1 ? '' : values.anaestheticType.value}
                label="Anaesthetic Type"
                onChange={(e: SelectChangeEvent<number>) => {
                  const selectedOption = ANAESTHETIC_TYPE_OPTIONS.find(
                    (option) => option.value === Number(e.target.value)
                  );
                  if (selectedOption) {
                    handleSelectChange('anaestheticType', selectedOption);
                  }
                }}
                onBlur={() => handleSelectBlur('anaestheticType')}
              >
                {ANAESTHETIC_TYPE_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {touched.anaestheticType && errors.anaestheticType}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl
              fullWidth
              error={touched.diathermyUsed && !!errors.diathermyUsed}
              required
            >
              <InputLabel>Diathermy Used</InputLabel>
              <Select
                id="diathermy_used"
                name="diathermyUsed"
                value={values.diathermyUsed.value === -1 ? '' : values.diathermyUsed.value}
                label="Diathermy Used"
                onChange={(e: SelectChangeEvent<number>) => {
                  const selectedOption = BOOLEAN_OPTIONS.find(
                    (option) => option.value === Number(e.target.value)
                  );
                  if (selectedOption) {
                    handleSelectChange('diathermyUsed', selectedOption);
                  }
                }}
                onBlur={() => handleSelectBlur('diathermyUsed')}
              >
                {BOOLEAN_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{touched.diathermyUsed && errors.diathermyUsed}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl
              fullWidth
              error={touched.antibioticUsed && !!errors.antibioticUsed}
              required
            >
              <InputLabel>Prophylactic antibiotics given?</InputLabel>
              <Select
                id="antibiotic_used"
                name="antibioticUsed"
                value={values.antibioticUsed.value === -1 ? '' : values.antibioticUsed.value}
                label="Prophylactic antibiotics given?"
                onChange={(e: SelectChangeEvent<number>) => {
                  const selectedOption = BOOLEAN_OPTIONS.find(
                    (option) => option.value === Number(e.target.value)
                  );
                  if (selectedOption) {
                    handleSelectChange('antibioticUsed', selectedOption);
                  }
                }}
                onBlur={() => handleSelectBlur('antibioticUsed')}
              >
                {BOOLEAN_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{touched.antibioticUsed && errors.antibioticUsed}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        {values.antibioticUsed.value === 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Antibiotic Type(s)
            </Typography>
            {PROPHYLACTIC_OPTIONS.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    id={option.value.toLowerCase().replaceAll(' ', '_').replaceAll('/', '_').replaceAll('+', '_')}
                    checked={values.antibioticType.includes(option.value)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleAntibioticCheckboxChange(option.value, e.target.checked)
                    }
                  />
                }
                label={option.label}
              />
            ))}
            {touched.antibioticType && errors.antibioticType && (
              <Typography color="error" variant="caption">
                {errors.antibioticType}
              </Typography>
            )}
          </Box>
        )}

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Surgeon(s)
          </Typography>
          {surgeonsList.map((surgeon, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'flex-start' }}>
              <FormControl
                fullWidth
                id={`surgeon-selector-${index}`}
                error={touched[`surgeons[${index}]`] && !!errors[`surgeons[${index}]`]}
                required={index === 0}
              >
                <InputLabel>Surgeon</InputLabel>
                <Select
                  id={`surgeon-${index}`}
                  name={`surgeons[${index}]`}
                  value={surgeon.value === -1 ? '' : surgeon.value}
                  label="Surgeon"
                  onChange={(e: SelectChangeEvent<number>) => {
                    const selectedOption = surgeonOptions.find(
                      (option) => option.value === Number(e.target.value)
                    );
                    if (selectedOption) {
                      updateSurgeon(index, selectedOption);
                    }
                  }}
                  onBlur={() => handleSelectBlur(`surgeons[${index}]`)}
                >
                  {surgeonOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched[`surgeons[${index}]`] && errors[`surgeons[${index}]`]}
                </FormHelperText>
              </FormControl>
              {index === 0 ? (
                <IconButton id="AddIcon" onClick={addSurgeon} color="primary" sx={{ mt: 1 }}>
                  <AddIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => removeSurgeon(index)} color="error" sx={{ mt: 1 }}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>

        <TextField
          id="comments"
          label="Comments"
          name="comments"
          value={values.comments}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
      </Box>

    </Box>
  );
};

export default RegisterEpisodeForm;
