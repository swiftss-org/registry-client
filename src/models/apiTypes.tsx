export interface PaginationParams {
  offset?: number; // Number of results to return per page
  limit?: number; // The initial index from which to return the results
}

export interface PaginationResponse {
  count: number;
  next: string;
  previous: string;
}

export type SelectOption = {
  label: string;
  value: number;
};

export interface LoginFormType {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  username: string;
  password: string;
  token?: string;
}

export type HospitalsAPI = {
  id: number;
  name: string;
  address: string;
  patient_hospital_id: number;
};

export interface HospitalsResponse extends PaginationResponse, PaginationParams {
  results: HospitalsAPI[];
}

export interface RegisterPatientPayload {
  full_name: string;
  national_id: string;
  age: number;
  year_of_birth: number;
  gender: string;
  phone_1: string;
  phone_2: string;
  address: string;
  hospital_id: number;
}