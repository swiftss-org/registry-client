import { SelectOption } from '../../models/apiTypes';

export type RegisterPatientFormType = {
  hospital: SelectOption;
  firstName: string;
  middleName: string;
  lastName: string;
  patientHospitalId: string;
  nationalId?: string;
  yearOfBirth: number;
  monthOfBirth?: number;
  dayOfBirth?: number;
  age: number;
  gender: 'male' | 'female';
  phone1: string;
  phone2?: string;
  address: string;
};
