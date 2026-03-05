import { HospitalsAPI } from '../../models/apiTypes';
import { FilterOption } from '../types';

export const getHospitalOptions = (hospitals: HospitalsAPI[]): FilterOption[] => {
  return hospitals.map((hospital) => ({
    label: hospital?.name ?? '',
    value: hospital?.id,
  }));
};
