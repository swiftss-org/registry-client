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
import { followUpFormValidation } from 'pages/EpisodeDetails/utils';
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
        mesh_awareness: followUp.mesh_awareness !== undefined ? (followUp.mesh_awareness ? 0 : 1) : '',
        seroma: followUp.seroma !== undefined ? (followUp.seroma ? 0 : 1) : '',
        infection: followUp.infection !== undefined ? (followUp.infection ? 0 : 1) : '',
        numbness: followUp.numbness !== undefined ? (followUp.numbness ? 0 : 1) : '',
        recurrence: followUp.recurrence !== undefined ? (followUp.recurrence ? 0 : 1) : '',
        further_surgery_need:
          followUp.further_surgery_need !== undefined ? (followUp.further_surgery_need ? 0 : 1) : '',
        surgery_comments_box: followUp.surgery_comments_box || '',
      });
    } else {
      // Initialize with one empty attendee slot for new follow up if desired, or let user add
      setFormState((prev) => ({ ...prev, attendees: [] }));
    }
  }, [followUp]);

  const validate = (values: FollowUpFormState) => {
    // Mapping back to the structure expected by validation utils if needed
    // Assuming followUpFormValidation expects basic key-value pairs
    return followUpFormValidation(values as unknown as FollowUpForm);
  };

  useEffect(() => {
    const validationErrors = validate(formState);
    setErrors(validationErrors || {});
  }, [formState]);

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
            label="Date"
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

        {canSubmit ? (
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
          </Box>
        ) : (
          <Stack spacing={2}>
            {followUp?.attendees.map((attendee: { user: { first_name: string; last_name: string } }, index: number) => (
              <TextField
                key={`attendee_disabled_${index}`}
                disabled
                variant="outlined"
                label="Surgeon"
                size="medium"
                fullWidth
                value={`${attendee.user.first_name} ${attendee.user.last_name}`}
              />
            ))}
          </Stack>
        )}

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

        {(
          [
            { label: 'Mesh Awareness', field: 'mesh_awareness' },
            { label: 'Seroma', field: 'seroma' },
            { label: 'Infection', field: 'infection' },
            { label: 'Numbness', field: 'numbness' },
            { label: 'Recurrence', field: 'recurrence' },
            { label: 'Need for further surgery?', field: 'further_surgery_need' },
          ] as const
        ).map(({ label, field }) => (
          <Box key={field}>
            <FormControl fullWidth error={touched[field] && !!errors[field]}>
              <InputLabel id={`${field}-label`}>{label}</InputLabel>
              <Select
                disabled={!canSubmit}
                id={`${field}-select`}
                labelId={`${field}-label`}
                value={formState[field]}
                label={label}
                inputProps={{ id: field }}
                onChange={(e) => handleChange(field, e.target.value as string | number)}
                onBlur={() => handleBlur(field)}
              >
                {BOOLEAN_OPTIONS.map((option: SelectOption) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {touched[field] && errors[field] && <FormHelperText>{errors[field]}</FormHelperText>}
            </FormControl>
          </Box>
        ))}

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
      </Stack>
    </Box>
  );
};

export default FollowUps;
