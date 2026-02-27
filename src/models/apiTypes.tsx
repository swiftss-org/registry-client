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
    username: string;
    first_name: string;
    last_name: string;
    medical_personnel?: {
      level: string;
      level_display: string;
    } | null;
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
  patient_hospital_id?: number; // String in DB, but explicitly cast to int in backend serializers
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

export interface EpisodeStatsRow {
  total_episodes: number;
  past_year_episodes: number;
  past_month_episodes: number;
  past_week_episodes: number;
  last_episode_date: string | null;
  patients_without_episode: number;
}

export interface EpisodeStatsByHospital extends EpisodeStatsRow {
  hospital_id: number;
  hospital_name: string;
}

export interface EpisodeStatsAPI {
  global: EpisodeStatsRow;
  by_hospital?: EpisodeStatsByHospital[];
}

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
  recurrence: boolean;
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
  recurrence: boolean;
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
  recurrence: SelectOption;
  further_surgery_need: SelectOption;
  surgery_comments_box?: string;
};

export type DischargeAPI = {
  id: number;
  episode: EpisodesAPI;
  date: string;
  aware_of_mesh: boolean;
  infection: string;
  discharge_duration?: number;
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
  discharge_duration?: number;
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
  comments?: string | null;
  anaesthetic_type: string;
  surgeon_ids: number[];
};

export interface HospitalsResponse extends PaginationResponse, PaginationParams {
  results: HospitalsAPI[];
}

export interface RegisterPatientPayload {
  full_name: string;
  national_id?: number | null;
  patient_hospital_id: number;
  age: number;
  year_of_birth: number;
  month_of_birth?: number | null;
  day_of_birth?: number | null;
  hospital_id: number;
  gender: string;
  phone_1: string;
  phone_2?: string;
  address: string;
}

export interface PatientsPayload extends PaginationParams {
  hospital_id?: number;
  search_term?: string;
}

export type PatientAPI = {
  id: number; // DB ID
  full_name: string;
  national_id: number;
  age: number;
  day_of_birth: number;
  month_of_birth: number;
  year_of_birth: number;
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
  patient_hospital_id: number;
};

export interface PreferredHospital {
  hospital: {
    id: number;
  };
}

export type SurgeonEpisodeSummaryAPI = {
  episode_count: number;
  last_episode_date: string;
};

export type OwnedEpisodeAPI = {
  id: number;
  surgery_date: string;
  patient_name: string;
  discharge: DischargeAPI | null;
  follow_up_dates: FollowUpAPI[];
  patient_id: number;
  hospital_id: number;
};

export type UnlinkedPatient = {
  id: string;
  full_name: string;
  hospital_id: number;
  patient_hospital_id: number;
};

export type UnlinkedPatientsResponse = UnlinkedPatient[];

export interface AnnouncementAPI {
  id: number;
  announcement_text: string;
  display_from: string | null;
  display_until: string | null;
  created_at: string;
}

export interface AnnouncementsResponse extends PaginationResponse {
  results: AnnouncementAPI[];
}