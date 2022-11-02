import { FilterOption } from '@orfium/ictinus/dist/components/Filter/types';

import { HospitalsAPI } from '../../models/apiTypes';
import { RegisterPatientFormType } from './types';

const REQUIRED_FIELD_MSG = 'This field is required';

export const getHospitalOptions = (hospitals: HospitalsAPI[]): FilterOption[] => {
  return hospitals.map((hospital) => ({
    label: hospital?.name ?? '',
    value: hospital?.id,
  }));
};

export const formValidation = (values: RegisterPatientFormType) => {
  const errors = {} || {
    hospital: '',
    firstName: '',
    lastName: '',
    yearOfBirth: '',
    patientHospitalId: '',
  };

  if (!values.hospital && typeof values.hospital !== 'object') {
    errors.hospital = REQUIRED_FIELD_MSG;
  }

  if (!values.firstName?.trim()) {
    errors.firstName = REQUIRED_FIELD_MSG;
  }

  if (!values.lastName?.trim()) {
    errors.lastName = REQUIRED_FIELD_MSG;
  }

  if (!values.yearOfBirth) {
    errors.yearOfBirth = REQUIRED_FIELD_MSG;
  }

  if (!values.patientHospitalId) {
    errors.patientHospitalId = REQUIRED_FIELD_MSG;
  }

  return errors;
};
