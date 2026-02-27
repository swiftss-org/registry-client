/** @jsxImportSource @emotion/react */
import React, { FC, useEffect, useState } from 'react';

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
  Checkbox as MuiCheckbox,
} from '@mui/material';
import { useDischarge } from 'hooks/api/patientHooks';
import { DischargeAPI, SelectOption } from 'models/apiTypes';
import { dischargeFormValidation, getBooleanValue } from 'pages/EpisodeDetails/utils';
import { BOOLEAN_OPTIONS } from 'pages/RegisterEpisode/constants';
import { useParams } from 'react-router-dom';
import { scrollToError } from 'utils/formUtils';

const POST_OPERATIVE_COMPLICATIONS = [
  'None',
  'Bleeding',
  'Haematoma',
  'Urinary Retention',
  'Return to theatre',
  'Death',
];

interface DischargeFormState {
  date: string;
  aware_of_mesh: number | ''; // value of SelectOption
  discharge_duration: string;
  infection: string[];
  comments: string;
}

const Discharge: FC<{
  discharge?: DischargeAPI;
}> = ({ discharge }) => {
  const { episodeID } = useParams<{ episodeID: string }>();
  if (!episodeID) {
    throw new Error('Episode ID is missing');
  }
  const { mutate, isPending } = useDischarge(episodeID);

  const [formState, setFormState] = useState<DischargeFormState>({
    date: '',
    aware_of_mesh: '',
    discharge_duration: '',
    infection: [],
    comments: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (discharge) {
      setFormState({
        date: discharge.date || '',
        aware_of_mesh: getBooleanValue(discharge.aware_of_mesh),
        discharge_duration: discharge.discharge_duration !== undefined ? String(discharge.discharge_duration) : '',
        infection: discharge.infection ? discharge.infection.split(',') : [],
        comments: discharge.comments || '',
      });
    }
  }, [discharge]);

  const validate = (values: DischargeFormState) => {
    // Adapter for existing validation function which expects specific structure
    const validationValues = {
      date: values.date,
      aware_of_mesh:
        values.aware_of_mesh !== ''
          ? BOOLEAN_OPTIONS.find((o: SelectOption) => o.value === values.aware_of_mesh)
          : undefined,
      discharge_duration: values.discharge_duration,
      infection: values.infection.length > 0 ? values.infection.join(',') : undefined,
      comments: values.comments,
    };

    return dischargeFormValidation(validationValues);
  };

  useEffect(() => {
    const validationErrors = validate(formState);
    setErrors(validationErrors || {});
  }, [formState]);

  const handleChange = (field: keyof DischargeFormState, value: string | number) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof DischargeFormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Clear discharge_duration errors and touched state when antibiotics is set to "No"
  useEffect(() => {
    if (formState.aware_of_mesh !== 0) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.discharge_duration;
        return newErrors;
      });
      setTouched((prev) => {
        const newTouched = { ...prev };
        delete newTouched.discharge_duration;
        return newTouched;
      });
    }
  }, [formState.aware_of_mesh]);

  const handleCheckboxChange = (option: string) => {
    setFormState((prev) => {
      const newInfection = prev.infection.includes(option)
        ? prev.infection.filter((i) => i !== option)
        : [...prev.infection, option];
      return { ...prev, infection: newInfection };
    });
  };

  const handleSubmit = () => {
    const validationErrors = validate(formState);
    setErrors(validationErrors || {});
    setTouched({
      date: true,
      aware_of_mesh: true,
      discharge_duration: true,
      infection: true,
      comments: true,
    });

    if (!validationErrors || Object.keys(validationErrors).length === 0) {
      mutate({
        episode_id: parseInt(episodeID),
        date: formState.date,
        aware_of_mesh:
          formState.aware_of_mesh !== ''
            ? BOOLEAN_OPTIONS.find((o: SelectOption) => o.value === formState.aware_of_mesh)!
            : ({} as SelectOption),
        discharge_duration: formState.discharge_duration ? parseInt(formState.discharge_duration, 10) : undefined,
        infection: formState.infection.length > 0 ? formState.infection.join(',') : 'none',
        comments: formState.comments,
      });
    } else {
      scrollToError(validationErrors);
    }
  };

  const canSubmit = discharge?.infection === undefined;
  const isAntibioticsYes = formState.aware_of_mesh === 0;

  return (
    <Box sx={{ py: 2 }}>
      <Stack spacing={3}>
        <Box>
          <TextField
            id="discharge_date"
            name="date"
            disabled={!canSubmit}
            label="Discharge Date"
            type="date"
            required={canSubmit}
            variant="outlined"
            size="medium"
            fullWidth
            value={formState.date}
            onChange={(e) => handleChange('date', e.target.value)}
            onBlur={() => handleBlur('date')}
            error={touched.date && !!errors.date}
            helperText={touched.date && errors.date}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Box>
          <FormControl fullWidth error={touched.aware_of_mesh && !!errors.aware_of_mesh}>
            <InputLabel id="aware_of_mesh-label">Antibiotics given on discharge</InputLabel>
            <Select
              disabled={!canSubmit}
              labelId="aware_of_mesh-label"
              id="aware_of_mesh-select"
              name="aware_of_mesh"
              label="Antibiotics given on discharge"
              variant="outlined"
              size="medium"
              required={canSubmit}
              value={formState.aware_of_mesh}
              inputProps={{ id: 'aware_of_mesh' }}
              onChange={(e) => handleChange('aware_of_mesh', e.target.value)}
              onBlur={() => handleBlur('aware_of_mesh')}
            >
              {BOOLEAN_OPTIONS.map((option: SelectOption) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {touched.aware_of_mesh && errors.aware_of_mesh && (
              <FormHelperText>{errors.aware_of_mesh}</FormHelperText>
            )}
          </FormControl>
        </Box>

        {isAntibioticsYes && (
          <Box>
            <TextField
              id="discharge_duration"
              name="discharge_duration"
              disabled={!canSubmit}
              label="Discharge Duration (days)"
              required={canSubmit}
              variant="outlined"
              size="medium"
              fullWidth
              value={formState.discharge_duration}
              onChange={(e) => handleChange('discharge_duration', e.target.value)}
              onBlur={() => handleBlur('discharge_duration')}
              error={touched.discharge_duration && !!errors.discharge_duration}
              helperText={touched.discharge_duration && errors.discharge_duration}
            />
          </Box>
        )}

        <FormControl fullWidth error={touched.infection && !!errors.infection}>
          <Typography variant="body1" gutterBottom>
            Post-operative complications
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
            {POST_OPERATIVE_COMPLICATIONS.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <MuiCheckbox
                    id={`infection-${option.toLowerCase().replaceAll(' ', '_')}`}
                    checked={formState.infection.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                    disabled={!canSubmit}
                    name="infection"
                  />
                }
                label={option}
              />
            ))}
          </Box>
          {touched.infection && errors.infection && (
            <FormHelperText>{errors.infection}</FormHelperText>
          )}
        </FormControl>

        <Box>
          <FormControl fullWidth error={touched.comments && !!errors.comments}>
            <TextareaAutosize
              id="comments"
              name="comments"
              minRows={3}
              placeholder="Comments"
              style={{
                width: '100%',
                padding: '8px',
                borderColor: touched.comments && errors.comments ? '#d32f2f' : '#c4c4c4',
                borderRadius: '4px',
              }}
              disabled={!canSubmit}
              value={formState.comments}
              onChange={(e) => handleChange('comments', e.target.value)}
              onBlur={() => handleBlur('comments')}
            />
            {touched.comments && errors.comments && (
              <FormHelperText>{errors.comments}</FormHelperText>
            )}
          </FormControl>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isPending}
          fullWidth
          size="medium"
        >
          Save Discharge
        </Button>
      </Stack >
    </Box >
  );
};

export default Discharge;
