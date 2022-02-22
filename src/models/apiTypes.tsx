export interface PaginationParams {
  offset?: number; // Number of results to return per page
  limit?: number; // The initial index from which to return the results
  ordering?: string; // Sorting option
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
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  token?: string;
  user: {
    email: string;
  };
}

export type HospitalsAPI = {
  id: number;
  hospital_id?: number;
  name?: string;
  address?: string;
  patient_hospital_id?: number;
};

export type EpisodesAPI = {
  episode_type: string;
  cepod: string;
  side: string;
  occurence: string;
  type: string;
  complexity: string;
  mesh_type: string;
  diathermy_used: boolean;
  comments?: string;
  anaesthetic_type: string;
  surgeons: SurgeonsAPI[];
};

export type RegisterEpisodePayload = {
  hospital_id: number;
  patient_id: number;
  surgery_date: string;
  episode_type: string;
  cepod: string;
  side: string;
  occurence: string;
  type: string;
  complexity: string;
  mesh_type: string;
  diathermy_used: boolean;
  comments?: string;
  anaesthetic_type: string;
  surgeon_ids: number[];
};

export interface HospitalsResponse extends PaginationResponse, PaginationParams {
  results: HospitalsAPI[];
}

export interface RegisterPatientPayload {
  full_name: string;
  national_id: string;
  patient_hospital_id: string;
  age: number;
  year_of_birth: number;
  hospital_id: number;
  gender: string;
  phone_1: string;
  phone_2: string;
  address: string;
}

export interface PatientsPayload extends PaginationParams {
  hospital_id?: number;
  search_term?: string;
}

export type PatientAPI = {
  id: number; // DB ID
  full_name: string;
  national_id: string;
  age: number;
  day_of_birth: string;
  month_of_birth: string;
  year_of_birth: string;
  gender: 'Male' | 'Female';
  phone_1: string;
  phone_2: string;
  address: string;
  hospital_mappings: HospitalsAPI[];
  episodes: EpisodesAPI[];
};

export interface PatientsResponse extends PaginationResponse, PaginationParams {
  results: PatientAPI[];
}

export type SurgeonsAPI = {
  id: number;
  user: {
    email: string;
  };
  level: string;
};
export interface SurgeonsResponse extends PaginationResponse, PaginationParams {
  results: SurgeonsAPI[];
}
