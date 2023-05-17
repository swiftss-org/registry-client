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

export interface ChangePasswordFormType {
  old_password: string;
  new_password1: string;
  new_password2: string;
}

export interface ChangePasswordResponse {
  token?: string;
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
  id: number;
  cepod: string;
  surgery_date: string;
  side: string;
  occurence: string;
  type: string;
  size: string;
  complexity: string;
  mesh_type: string;
  diathermy_used: boolean;
  antibiotic_used: boolean;
  antibiotic_type?: string;
  comments?: string;
  anaesthetic_type: string;
  surgeons: SurgeonsAPI[];
};

export type FollowUpAPI = {
  id: number;
  episode: EpisodesAPI;
  pain_severity: string;
  date: string;
  attendees: SurgeonsAPI[];
  mesh_awareness: boolean;
  seroma: boolean;
  infection: boolean;
  numbness: boolean;
  further_surgery_need: boolean;
  surgery_comments_box?: string;
};

export type FollowUpPayload = {
  pain_severity: string;
  date: string;
  attendee_ids: number[];
  mesh_awareness: boolean;
  seroma: boolean;
  infection: boolean;
  numbness: boolean;
};

export type FollowUpForm = {
  pain_severity: SelectOption;
  date: string;
  attendees: {
    label: string;
    value: number;
  }[];
  mesh_awareness: SelectOption;
  seroma: SelectOption;
  infection: SelectOption;
  numbness: SelectOption;
  further_surgery_need: SelectOption;
  surgery_comments_box?: string;
};

export type DischargeAPI = {
  id: number;
  episode: EpisodesAPI;
  date: string;
  aware_of_mesh: boolean;
  infection: string;
  discharge_duration?: string;
  comments?: string;
};

export type DischargePayload = {
  episode_id: number;
  date: string;
  aware_of_mesh: boolean;
  infection: string;
};

export type DischargeForm = {
  episode_id: number;
  date: string;
  discharge_duration?: string;
  aware_of_mesh: SelectOption;
  infection?: string;
  comments?: string;
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
  size: string;
  complexity: string;
  mesh_type: string;
  diathermy_used: boolean;
  antibiotic_used: boolean;
  antibiotic_type?: string;
  comments?: string;
  anaesthetic_type: string;
  surgeon_ids: number[];
};

export interface HospitalsResponse extends PaginationResponse, PaginationParams {
  results: HospitalsAPI[];
}

export interface RegisterPatientPayload {
  full_name: string;
  national_id: number;
  patient_hospital_id: number;
  age: number;
  year_of_birth: number;
  month_of_birth: number;
  day_of_birth: number;
  hospital_id: number;
  gender: string;
  phone_1: number;
  phone_2: number;
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
    first_name: string;
    last_name: string;
  };
  level: string;
};
export interface SurgeonsResponse extends PaginationResponse, PaginationParams {
  results: SurgeonsAPI[];
}

export type HospitalMappingPayload = {
  patient_id: number;
  hospital_id: number;
  patient_hospital_id: string;
};
