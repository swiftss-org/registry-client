import { SelectOption } from '../../models/apiTypes';

export type RegisterPatientFormType = {
  hospital: SelectOption;
  firstName: string;
  middleName: string;
  lastName: string;
  patientHospitalId: number;
  nationalId: number;
  yearOfBirth: number;
  monthOfBirth: number;
  dayOfBirth: number;
  age: number;
  gender: 'male' | 'female';
  phone1: number;
  phone2: number;
  address: string;
};
