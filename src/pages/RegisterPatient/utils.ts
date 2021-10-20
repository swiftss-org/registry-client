import { FilterOption } from '@orfium/ictinus/dist/components/Filter/types';

import { HospitalsAPI } from '../../models/apiTypes';

export const getHospitalOptions = (hospitals: HospitalsAPI[]): FilterOption[] => {
  return hospitals.map((hospital) => ({
    label: hospital.name,
    value: hospital.id,
  }));
};
