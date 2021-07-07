import { HospitalsAPI, SelectOption } from '../../models/apiTypes';

export const getHospitalOptions = (hospitals: HospitalsAPI[]): SelectOption[] => {
  return hospitals.map((hospital) => ({
    label: hospital.name,
    value: hospital.id,
  }));
};
