import { FilterOption } from '@orfium/ictinus/dist/components/Filter/types';

import { HospitalsAPI, SelectOption, SurgeonsAPI } from '../../models/apiTypes';
import { RegisterEpisodeFormType } from './types';

const REQUIRED_FIELD_MSG = 'This field is required';

export const getHospitalOptions = (hospitals: HospitalsAPI[]): FilterOption[] => {
  return hospitals.map((hospital) => ({
    label: hospital?.name ?? '',
    value: hospital?.id,
  }));
};

export const getSurgeonOptions = (surgeons: SurgeonsAPI[]): SelectOption[] => {
  return surgeons.map((surgeon) => ({
    label: `${surgeon?.user.first_name} ${surgeon.user.last_name}` ?? '',
    value: surgeon?.id,
  }));
};

export const formValidation = (values: RegisterEpisodeFormType, isNewHospital: boolean) => {
  const errors = {} || {
    hospital: '',
    firstName: '',
    lastName: '',
    yearOfBirth: '',
    patientHospitalId: '',
    surgeons: '',
    cepod: '',
    side: '',
    surgeryDate: '',
    occurence: '',
    type: '',
    size: '',
    complexity: '',
    meshType: '',
    anaestheticType: '',
    diathermyUsed: '',
  };

  if (!values.hospital && typeof values.hospital !== 'object') {
    errors.hospital = REQUIRED_FIELD_MSG;
  }

  if (isNewHospital && !values.patientHospitalId) {
    errors.patientHospitalId = REQUIRED_FIELD_MSG;
  }

  if (!values.cepod && typeof values.cepod !== 'object') {
    errors.cepod = REQUIRED_FIELD_MSG;
  }

  if (!values.side && typeof values.side !== 'object') {
    errors.side = REQUIRED_FIELD_MSG;
  }

  if (!values.surgeryDate?.trim()) {
    errors.surgeryDate = REQUIRED_FIELD_MSG;
  }
  if (!values.occurence && typeof values.occurence !== 'object') {
    errors.occurence = REQUIRED_FIELD_MSG;
  }
  if (!values.type && typeof values.type !== 'object') {
    errors.type = REQUIRED_FIELD_MSG;
  }
  if (!values.size && typeof values.size !== 'object') {
    errors.size = REQUIRED_FIELD_MSG;
  }
  if (!values.complexity && typeof values.complexity !== 'object') {
    errors.complexity = REQUIRED_FIELD_MSG;
  }
  if (!values.meshType && typeof values.meshType !== 'object') {
    errors.meshType = REQUIRED_FIELD_MSG;
  }
  if (!values.anaestheticType && typeof values.anaestheticType !== 'object') {
    errors.anaestheticType = REQUIRED_FIELD_MSG;
  }
  if (!values.diathermyUsed && typeof values.diathermyUsed !== 'object') {
    errors.diathermyUsed = REQUIRED_FIELD_MSG;
  }
  if (values.surgeons?.length === 0) {
    errors.surgeons = REQUIRED_FIELD_MSG;
  }

  return errors;
};
