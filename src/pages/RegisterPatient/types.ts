import { SelectOption } from '../../models/apiTypes';

export type RegisterPatientFormType = {
  hospital: SelectOption;
  firstName: string;
  lastName: string;
  patientHospitalId: string;
  nationalId: string;
  yearOfBirth: number;
  age: number;
  gender: 'male' | 'female';
  phone1: string;
  phone2: string;
  address: string;
};
