import { FollowUpForm, SelectOption } from '../../models/apiTypes';

export const dischargeFormValidation = (values: {
  date?: string;
  aware_of_mesh?: SelectOption;
  infection?: string;
  comments?: string;
  discharge_duration?: string;
}) => {
  const errors: {
    date?: string;
    discharge_duration?: string;
    aware_of_mesh?: string;
    infection?: string;
  } = {};

  if (!values.date?.trim()) {
    errors.date = 'Discharge date is required. Please select a date.';
  }

  if (values.date && new Date(values.date?.trim()) > new Date()) {
    errors.date = 'Discharge date cannot be set in the future.';
  }

  // aware_of_mesh is actually the "Antibiotics given on discharge" field
  if (!values.aware_of_mesh && typeof values.aware_of_mesh !== 'object') {
    errors.aware_of_mesh = 'Antibiotics given on discharge is required.';
  } else {
    if (values.aware_of_mesh.value === 0) {
      if (!values.discharge_duration && typeof values.discharge_duration !== 'object') {
        errors.discharge_duration = 'Discharge duration is required.';
      }
    }
  }

  if (values.infection === undefined || values.infection?.length == 0) {
    const errorMessage = "Please record the post-operative complication above. If there wasn't any then select the option 'None'";
    errors.infection = errorMessage;
  }
  return errors;
};

export const followUpFormValidation = (values: FollowUpForm) => {
  const errors: Partial<Record<keyof FollowUpForm, string>> = {};

  if (!values.date?.trim()) {
    errors.date = 'Follow up date is required. Please select a date.';
  }

  if (new Date(values.date?.trim()) > new Date()) {
    errors.date = 'Follow up date cannot be set in the future.';
  }

  if (!values.pain_severity && typeof values.pain_severity !== 'object') {
    errors.pain_severity = 'Pain severity is required.';
  }

  if (!values.primaryAttendee || !values.primaryAttendee.value || values.primaryAttendee.value < 0) {
    errors.primaryAttendee = 'Seen By is required.';
  }

  if (!values.mesh_awareness && typeof values.mesh_awareness !== 'object') {
    errors.mesh_awareness = 'Mesh awareness is required.';
  }

  if (!values.seroma && typeof values.seroma !== 'object') {
    errors.seroma = 'Seroma is required.';
  }

  if (!values.infection && typeof values.infection !== 'object') {
    errors.infection = 'Infection is required.';
  }

  if (!values.numbness && typeof values.numbness !== 'object') {
    errors.numbness = 'Numbness is required.';
  }

  if (!values.recurrence && typeof values.recurrence !== 'object') {
    errors.recurrence = 'Recurrence is required.';
  }

  if (!values.further_surgery_need && typeof values.further_surgery_need !== 'object') {
    errors.further_surgery_need = 'Need for further surgery? is required.';
  }

  return errors;
};

// TODO: This is a sign that something went wrong with the types; should be refactored end delete this function
export const getBooleanValue = (value: boolean | string | null | undefined): 0 | 1 | '' => {
  if (value === undefined || value === null || value === '') return '';
  if (value === true || value === 'Yes' || String(value).toLowerCase() === 'true') return 0;
  return 1;
};
