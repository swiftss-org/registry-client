import { FollowUpForm, SelectOption } from '../../models/apiTypes';

const REQUIRED_FIELD_MSG = 'This field is required';

export const dischargeFormValidation = (values: {
                                                    date?: string;
                                                    aware_of_mesh?: SelectOption;
                                                    infection?: string;
                                                    comments?: string;
                                                    discharge_duration?: string;
                                                  }) => {
    const errors = {} || {
        date: '',
        discharge_duration: '',
        aware_of_mesh: '',
        infection: ''
    };

    if (!values.date?.trim()) {
        errors.date = REQUIRED_FIELD_MSG + '. Please select a date.';
    }

    if (values.date && new Date(values.date?.trim()) > new Date()) {
        errors.date = 'Discharge date cannot be set in the future.';
    }

    if (!values.aware_of_mesh && typeof values.aware_of_mesh !== 'object') {
        errors.aware_of_mesh = REQUIRED_FIELD_MSG;
    } else {
        console.log(values)

        if (!values.discharge_duration && typeof values.discharge_duration !== 'object') {
            errors.discharge_duration = REQUIRED_FIELD_MSG;
        }
    }

    if (values.infection === undefined || values.infection?.length == 0) {
        const errorMessage = "Please record the post-operative complication above. if there wasn't any then select the option 'None'";
        errors.infection = errorMessage;
    }
    return errors;
};

export const followUpFormValidation = (values: FollowUpForm) => {
  const errors = {} || {
    pain_severity: '',
    date: '',
    attendees: '',
    mesh_awareness: '',
    seroma: '',
    infection: '',
    numbness: '',
    recurrence: '',
    further_surgery_need: ''
  };

  if (!values.date?.trim()) {
    errors.date = REQUIRED_FIELD_MSG + '. Please select a date.';
  }

  if (new Date(values.date?.trim()) > new Date()) {
    errors.date = 'Follow up date cannot be set in the future.';
  }

  if (!values.pain_severity && typeof values.pain_severity !== 'object') {
    errors.pain_severity = REQUIRED_FIELD_MSG;
  }

// Does not work, needs more attention
//     console.log(values)
//   if (values.attendees?.length === 1) {
//       console.log(REQUIRED_FIELD_MSG)
//     errors.attendees = REQUIRED_FIELD_MSG;
//   }

  if (!values.mesh_awareness && typeof values.mesh_awareness !== 'object') {
    errors.mesh_awareness = REQUIRED_FIELD_MSG;
  }

  if (!values.seroma && typeof values.seroma !== 'object') {
    errors.seroma = REQUIRED_FIELD_MSG;
  }

  if (!values.infection && typeof values.infection !== 'object') {
    errors.infection = REQUIRED_FIELD_MSG;
  }

  if (!values.numbness && typeof values.numbness !== 'object') {
    errors.numbness = REQUIRED_FIELD_MSG;
  }

  if (!values.recurrence && typeof values.recurrence !== 'object') {
    errors.recurrence = REQUIRED_FIELD_MSG;
  }

  if (!values.further_surgery_need && typeof values.further_surgery_need !== 'object') {
    errors.further_surgery_need = REQUIRED_FIELD_MSG;
  }

  return errors;
};
