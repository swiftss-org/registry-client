import { HospitalsAPI, SelectOption, SurgeonsAPI } from '../../models/apiTypes';
import { FilterOption } from '../types';

export const getHospitalOptions = (hospitals: HospitalsAPI[]): FilterOption[] => {
  return hospitals.map((hospital) => ({
    label: hospital?.name ?? '',
    value: hospital?.id,
  }));
};

export const getSurgeonOptionsSorted = (surgeons: SurgeonsAPI[]): SelectOption[] => {
  const options: SelectOption[] = surgeons.map((surgeon) => ({
    label: `${surgeon.user.first_name} ${surgeon.user.last_name}`,
    value: surgeon?.id,
  }));
  // Sort the options by label
  options.sort((a, b) => a.label.localeCompare(b.label));
  return options;
};
