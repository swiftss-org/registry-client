import React, { FC, useEffect, useMemo, useState } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
  IconButton,
} from '@mui/material';
import { useFollowUp, useGetSurgeons } from 'hooks/api/patientHooks';
import { FollowUpAPI, FollowUpForm, SelectOption } from 'models/apiTypes';
import { followUpFormValidation, getBooleanValue } from 'pages/EpisodeDetails/utils';
import { BOOLEAN_OPTIONS, FOLLOW_UP_PAIN_OPTIONS } from 'pages/RegisterEpisode/constants';
import { getSurgeonOptionsSorted } from 'pages/RegisterEpisode/utils';
import { useParams } from 'react-router-dom';

interface FollowUpFormState {
  date: string;
  attendees: number[]; // Array of surgeon IDs
  pain_severity: string;
  mesh_awareness: number | '';
  seroma: number | '';
  infection: number | '';
  numbness: number | '';
  recurrence: number | '';
  further_surgery_need: number | '';
  surgery_comments_box: string;
}

const FollowUps: FC<{
  followUp?: FollowUpAPI;
}> = ({ followUp }) => {
  const { episodeID } = useParams<{ episodeID: string }>();
  if (!episodeID) {
    throw new Error('Episode ID is missing');
  }
  const { mutate, isPending } = useFollowUp(episodeID);

  const { data: surgeons, isLoading: isSurgeonsLoading } = useGetSurgeons({
    offset: 0,
    limit: 100,
  });

  const surgeonOptions = useMemo(() => getSurgeonOptionsSorted(surgeons?.results ?? []), [surgeons]);

  const [formState, setFormState] = useState<FollowUpFormState>({
    date: '',
    attendees: [],
    pain_severity: '',
    mesh_awareness: '',
    seroma: '',
    infection: '',
    numbness: '',
    recurrence: '',
    further_surgery_need: '',
    surgery_comments_box: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (followUp) {
      setFormState({
        date: followUp.date || '',
        attendees: followUp.attendees ? followUp.attendees.map((a: { id: number }) => a.id) : [],
        pain_severity: followUp.pain_severity || '',
        mesh_awareness: getBooleanValue(followUp.mesh_awareness),
        seroma: getBooleanValue(followUp.seroma),
        infection: getBooleanValue(followUp.infection),
        numbness: getBooleanValue(followUp.numbness),
        recurrence: getBooleanValue(followUp.recurrence),
        further_surgery_need: getBooleanValue(followUp.further_surgery_need),
        surgery_comments_box: followUp.surgery_comments_box || '',
      });
    } else {
      // Initialize with one empty attendee slot for new follow up if desired, or let user add
      setFormState((prev) => ({ ...prev, attendees: [] }));
    }
  }, [followUp]);

  const validate = React.useCallback(
    (values: FollowUpFormState) => {
      // Mapping back to the structure expected by validation utils (FollowUpForm)
      const validationValues: FollowUpForm = {
        date: values.date,
        mesh_awareness:
          values.mesh_awareness !== ''
            ? (BOOLEAN_OPTIONS.find((o: SelectOption) => o.value === values.mesh_awareness) as SelectOption)
            : (undefined as unknown as SelectOption),
        seroma:
          values.seroma !== ''
            ? (BOOLEAN_OPTIONS.find((o: SelectOption) => o.value === values.seroma) as SelectOption)
            : (undefined as unknown as SelectOption),
        infection:
          values.infection !== ''
            ? (BOOLEAN_OPTIONS.find((o: SelectOption) => o.value === values.infection) as SelectOption)
            : (undefined as unknown as SelectOption),
        numbness:
          values.numbness !== ''
            ? (BOOLEAN_OPTIONS.find((o: SelectOption) => o.value === values.numbness) as SelectOption)
            : (undefined as unknown as SelectOption),
        recurrence:
          values.recurrence !== ''
            ? (BOOLEAN_OPTIONS.find((o: SelectOption) => o.value === values.recurrence) as SelectOption)
            : (undefined as unknown as SelectOption),
        further_surgery_need:
          values.further_surgery_need !== ''
            ? (BOOLEAN_OPTIONS.find(
              (o: SelectOption) => o.value === values.further_surgery_need
            ) as SelectOption)
            : (undefined as unknown as SelectOption),
        pain_severity: FOLLOW_UP_PAIN_OPTIONS.find(
          (o: SelectOption) => o.label === values.pain_severity
        ) as SelectOption,
        surgery_comments_box: values.surgery_comments_box,
        attendees: values.attendees.map((id) => {
          const option = surgeonOptions.find((o: SelectOption) => o.value === id);
          return { label: option?.label || '', value: id };
        }),
      };

      return followUpFormValidation(validationValues);
    },
    [surgeonOptions]
  );

  useEffect(() => {
    const validationErrors = validate(formState);
    setErrors(validationErrors || {});
  }, [formState, validate]);

  const handleChange = (field: keyof FollowUpFormState, value: string | number) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleAttendeeChange = (index: number, value: number) => {
    setFormState((prev) => {
      const newAttendees = [...prev.attendees];
      newAttendees[index] = value;
      return { ...prev, attendees: newAttendees };
    });
    setTouched((prev) => ({ ...prev, attendees: true }));
  };

  const handleAddAttendee = () => {
    setFormState((prev) => ({ ...prev, attendees: [...prev.attendees, 0] })); // 0 or empty placeholder
  };

  const handleRemoveAttendee = (index: number) => {
    setFormState((prev) => ({
      ...prev,
      attendees: prev.attendees.filter((__, i) => i !== index)
    }));
  }

  const handleSubmit = () => {
    const validationErrors = validate(formState);
    setErrors(validationErrors || {});
    setTouched({
      date: true,
      attendees: true,
      pain_severity: true,
      mesh_awareness: true,
      seroma: true,
      infection: true,
      numbness: true,
      recurrence: true,
      further_surgery_need: true,
      surgery_comments_box: true,
    });

    if (!validationErrors || Object.keys(validationErrors).length === 0) {
      // transform state for submission to match FollowUpForm expected by useFollowUp
      const payload: FollowUpForm = {
        date: formState.date,
        mesh_awareness: BOOLEAN_OPTIONS.find((o: SelectOption) => o.value === formState.mesh_awareness)!,
        seroma: BOOLEAN_OPTIONS.find((o: SelectOption) => o.value === formState.seroma)!,
        infection: BOOLEAN_OPTIONS.find((o: SelectOption) => o.value === formState.infection)!,
        numbness: BOOLEAN_OPTIONS.find((o: SelectOption) => o.value === formState.numbness)!,
        recurrence: BOOLEAN_OPTIONS.find((o: SelectOption) => o.value === formState.recurrence)!,
        further_surgery_need: BOOLEAN_OPTIONS.find((o: SelectOption) => o.value === formState.further_surgery_need)!,
        pain_severity: FOLLOW_UP_PAIN_OPTIONS.find((o: SelectOption) => o.label === formState.pain_severity)!,
        surgery_comments_box: formState.surgery_comments_box,
        attendees: formState.attendees
          .filter((id) => id > 0)
          .map((id) => {
            const option = surgeonOptions.find((o: SelectOption) => o.value === id);
            return { label: option?.label || '', value: id };
          }),
      };

      mutate(payload);
    }
  };

  const canSubmit = followUp?.infection === undefined;

  return (
    <Box sx={{ py: 2 }}>
      <Stack spacing={3}>
        <Box>
          <TextField
            id="follow-up-date"
            label="Follow Up Date"
            type="date"
            disabled={!canSubmit}
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
          {formState.attendees.map((attendeeId, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <FormControl fullWidth>
                  <InputLabel id={`surgeon-label-${index}`}>Surgeon</InputLabel>
                  <Select
                    labelId={`surgeon-label-${index}`}
                    id={`surgeon-${index}`}
                    value={attendeeId === 0 ? '' : attendeeId}
                    label="Surgeon"
                    onChange={(e) => handleAttendeeChange(index, Number(e.target.value))}
                  >
                    {surgeonOptions.map((option: SelectOption) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              {index === formState.attendees.length - 1 && (
                <IconButton onClick={handleAddAttendee} color="primary">
                  <AddCircleOutlineIcon />
                </IconButton>
              )}
              {formState.attendees.length > 0 && (
                <IconButton onClick={() => handleRemoveAttendee(index)} color="error">
                  <RemoveCircleOutlineIcon />
                </IconButton>
              )}
            </Box>
          ))}
          {formState.attendees.length === 0 && (
            <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddAttendee}>
              Add Surgeon
            </Button>
          )}
          {touched.attendees && errors.attendees && (
            <FormHelperText error sx={{ mt: 1 }}>{errors.attendees}</FormHelperText>
          )}
        </Box>

        <Box>
          <FormControl fullWidth error={touched.pain_severity && !!errors.pain_severity}>
            <InputLabel id="pain_severity-label">Pain Severity</InputLabel>
            <Select
              disabled={!canSubmit}
              id="pain_severity-select"
              labelId="pain_severity-label"
              value={formState.pain_severity}
              label="Pain Severity"
              inputProps={{ id: 'pain_severity' }}
              onChange={(e) => handleChange('pain_severity', e.target.value)}
              onBlur={() => handleBlur('pain_severity')}
            >
              {FOLLOW_UP_PAIN_OPTIONS.map((option: SelectOption) => (
                <MenuItem key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {touched.pain_severity && errors.pain_severity && (
              <FormHelperText>{errors.pain_severity}</FormHelperText>
            )}
          </FormControl>
        </Box>

        <Box>
          <FormControl fullWidth error={touched.mesh_awareness && !!errors.mesh_awareness}>
            <InputLabel id="mesh_awareness-label">Mesh Awareness</InputLabel>
            <Select
              disabled={!canSubmit}
              id="mesh_awareness-select"
              labelId="mesh_awareness-label"
              value={formState.mesh_awareness}
              label="Mesh Awareness"
              inputProps={{ id: 'mesh_awareness' }}
              onChange={(e) => handleChange('mesh_awareness', e.target.value as number)}
              onBlur={() => handleBlur('mesh_awareness')}
            >
              {BOOLEAN_OPTIONS.map((option: SelectOption) => (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <MenuItem key={String(option.value)} value={option.value as any}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {touched.mesh_awareness && errors.mesh_awareness && (
              <FormHelperText>{errors.mesh_awareness}</FormHelperText>
            )}
          </FormControl>
        </Box>

        <Box>
          <FormControl fullWidth error={touched.seroma && !!errors.seroma}>
            <InputLabel id="seroma-label">Seroma</InputLabel>
            <Select
              disabled={!canSubmit}
              id="seroma-select"
              labelId="seroma-label"
              value={formState.seroma}
              label="Seroma"
              inputProps={{ id: 'seroma' }}
              onChange={(e) => handleChange('seroma', e.target.value as number)}
              onBlur={() => handleBlur('seroma')}
            >
              {BOOLEAN_OPTIONS.map((option: SelectOption) => (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <MenuItem key={String(option.value)} value={option.value as any}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {touched.seroma && errors.seroma && <FormHelperText>{errors.seroma}</FormHelperText>}
          </FormControl>
        </Box>

        <Box>
          <FormControl fullWidth error={touched.infection && !!errors.infection}>
            <InputLabel id="infection-label">Infection</InputLabel>
            <Select
              disabled={!canSubmit}
              id="infection-select"
              labelId="infection-label"
              value={formState.infection}
              label="Infection"
              inputProps={{ id: 'infection' }}
              onChange={(e) => handleChange('infection', e.target.value as number)}
              onBlur={() => handleBlur('infection')}
            >
              {BOOLEAN_OPTIONS.map((option: SelectOption) => (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <MenuItem key={String(option.value)} value={option.value as any}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {touched.infection && errors.infection && <FormHelperText>{errors.infection}</FormHelperText>}
          </FormControl>
        </Box>

        <Box>
          <FormControl fullWidth error={touched.numbness && !!errors.numbness}>
            <InputLabel id="numbness-label">Numbness</InputLabel>
            <Select
              disabled={!canSubmit}
              id="numbness-select"
              labelId="numbness-label"
              value={formState.numbness}
              label="Numbness"
              inputProps={{ id: 'numbness' }}
              onChange={(e) => handleChange('numbness', e.target.value as number)}
              onBlur={() => handleBlur('numbness')}
            >
              {BOOLEAN_OPTIONS.map((option: SelectOption) => (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <MenuItem key={String(option.value)} value={option.value as any}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {touched.numbness && errors.numbness && <FormHelperText>{errors.numbness}</FormHelperText>}
          </FormControl>
        </Box>

        <Box>
          <FormControl fullWidth error={touched.recurrence && !!errors.recurrence}>
            <InputLabel id="recurrence-label">Recurrence</InputLabel>
            <Select
              disabled={!canSubmit}
              id="recurrence-select"
              labelId="recurrence-label"
              value={formState.recurrence}
              label="Recurrence"
              inputProps={{ id: 'recurrence' }}
              onChange={(e) => handleChange('recurrence', e.target.value as number)}
              onBlur={() => handleBlur('recurrence')}
            >
              {BOOLEAN_OPTIONS.map((option: SelectOption) => (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <MenuItem key={String(option.value)} value={option.value as any}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {touched.recurrence && errors.recurrence && <FormHelperText>{errors.recurrence}</FormHelperText>}
          </FormControl>
        </Box>

        <Box>
          <FormControl fullWidth error={touched.further_surgery_need && !!errors.further_surgery_need}>
            <InputLabel id="further_surgery_need-label">Need for further surgery?</InputLabel>
            <Select
              disabled={!canSubmit}
              id="further_surgery_need-select"
              labelId="further_surgery_need-label"
              value={formState.further_surgery_need}
              label="Need for further surgery?"
              inputProps={{ id: 'further_surgery_need' }}
              onChange={(e) => handleChange('further_surgery_need', e.target.value as number)}
              onBlur={() => handleBlur('further_surgery_need')}
            >
              {BOOLEAN_OPTIONS.map((option: SelectOption) => (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <MenuItem key={String(option.value)} value={option.value as any}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {touched.further_surgery_need && errors.further_surgery_need && (
              <FormHelperText>{errors.further_surgery_need}</FormHelperText>
            )}
          </FormControl>
        </Box>

        <Box>
          <FormControl fullWidth error={touched.surgery_comments_box && !!errors.surgery_comments_box}>
            <TextareaAutosize
              id="surgery_comments_box"
              minRows={3}
              placeholder="Comments"
              style={{
                width: '100%',
                padding: '8px',
                borderColor: touched.surgery_comments_box && errors.surgery_comments_box ? '#d32f2f' : '#c4c4c4',
                borderRadius: '4px',
              }}
              disabled={!canSubmit}
              value={formState.surgery_comments_box}
              onChange={(e) => handleChange('surgery_comments_box', e.target.value)}
              onBlur={() => handleBlur('surgery_comments_box')}
            />
            {touched.surgery_comments_box && errors.surgery_comments_box && (
              <FormHelperText>{errors.surgery_comments_box}</FormHelperText>
            )}
          </FormControl>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isPending || isSurgeonsLoading}
          fullWidth
          size="medium"
        >
          Save changes
        </Button>
      </Stack >
    </Box >
  );
};

export default FollowUps;
