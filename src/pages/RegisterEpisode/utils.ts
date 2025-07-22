import { FilterOption } from '@orfium/ictinus/dist/components/Filter/types';

import { RegisterEpisodeFormType } from './types';
import { HospitalsAPI, SelectOption, SurgeonsAPI } from '../../models/apiTypes';

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

export const getSurgeonOptionsSorted = (surgeons: SurgeonsAPI[]): SelectOption[] => {
  const options: SelectOption[] = surgeons.map((surgeon) => ({
    label: `${surgeon?.user.first_name} ${surgeon?.user.last_name}` ?? '',
    value: surgeon?.id,
  }));
  // Sort the options by label
  options.sort((a, b) => a.label.localeCompare(b.label));
  return options;
};

export const episodeFormValidation = (values: RegisterEpisodeFormType, isNewHospital: boolean) => {
  const errors = {} || {
    hospital: '',
    firstName: '',
    lastName: '',
    yearOfBirth: '',
    patientHospitalId: '',
    surgeons: '',
    episodeType: '',
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
    antibioticUsed: '',
    antibioticType: '',
  };

  if (!values.hospital && typeof values.hospital !== 'object') {
    errors.hospital = REQUIRED_FIELD_MSG;
  }

  if (isNewHospital && !values.patientHospitalId) {
    errors.patientHospitalId = REQUIRED_FIELD_MSG;
  }

  if (!values.episodeType && typeof values.episodeType !== 'object') {
    errors.episodeType = REQUIRED_FIELD_MSG
  }

  if (!values.cepod && typeof values.cepod !== 'object') {
    errors.cepod = REQUIRED_FIELD_MSG;
  }

  if (!values.side && typeof values.side !== 'object') {
    errors.side = REQUIRED_FIELD_MSG;
  }

  if (!values.surgeryDate?.trim()) {
    errors.surgeryDate = REQUIRED_FIELD_MSG + '. Please select a date.';
  }

  if (new Date(values.surgeryDate?.trim()) > new Date()) {
    errors.surgeryDate = 'Surgery date cannot be set in the future.';
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

  if (!values.antibioticUsed && typeof values.antibioticUsed !== 'object') {
    errors.antibioticUsed = REQUIRED_FIELD_MSG;
  } else if (
    values.antibioticUsed.value == 0 &&
    (!values.antibioticType || values.antibioticType.length == 0)
  ) {
    const errorMessage = 'If antibiotics have been used you must record the type';
    errors.antibioticUsed = errorMessage;
    errors.antibioticType = errorMessage;
  }

  if (values.surgeons?.length === 0) {
    errors.surgeons = REQUIRED_FIELD_MSG;
  }

  return errors;
};
