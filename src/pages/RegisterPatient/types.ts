import { SelectOption } from '../../models/apiTypes';

export type RegisterPatientFormType = {
  hospital: SelectOption;
  firstName: string;
  lastName: string;
  patientHospitalId: number;
  nationalId: number;
  yearOfBirth: number;
  age: number;
  gender: 'male' | 'female';
  phone1: number;
  phone2: number;
  address: string;
};
