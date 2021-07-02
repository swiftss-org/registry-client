import { SelectOption } from '../../models/apiTypes';

export type RegisterPatientFormType = {
  center: SelectOption;
  name: string;
  hospitalId: number;
  nationalId: string;
  yearOfBirth: number;
  age: number;
  gender: 'male' | 'female';
  phone1: string;
  phone2: string;
  address: string;
};
