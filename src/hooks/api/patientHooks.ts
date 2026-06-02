import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ReactQueryKeys } from 'hooks/constants';
import { useSetNotification } from 'hooks/useSetNotification';
import { useNavigate, useParams } from 'react-router-dom';

import patientsAPI from '../../api/patientsAPI';
import {
  AnnouncementsResponse,
  DischargeAPI,
  DischargeForm,
  EpisodesAPI,
  EpisodeStatsAPI,
  FollowUpAPI,
  FollowUpForm,
  FollowUpPayload,
  HospitalMappingPayload,
  HospitalsAPI,
  HospitalsResponse,
  OwnedEpisodeAPI,
  PaginationParams,
  PatientAPI,
  PatientsPayload,
  PatientsResponse,
  PreferredHospital,
  RegisterEpisodePayload,
  RegisterPatientPayload,
  SurgeonEpisodeSummaryAPI,
  SurgeonsResponse,
  UnlinkedPatientsResponse,
} from '../../models/apiTypes';
import { RegisterEpisodeFormType } from '../../pages/RegisterEpisode/types';
import { RegisterPatientFormType } from '../../pages/RegisterPatient/types';
import urls from '../../routing/urls';

export const useGetHospitals = (params?: PaginationParams) => {
  return useQuery<HospitalsResponse, AxiosError>({
    queryKey: [ReactQueryKeys.HospitalsQuery, params],
    queryFn: async () => {
      const { request } = patientsAPI.single.getHospitals(params);
      return await request();
    },
    retry: false,
  });
};

export const useGetPreferredHospital = () => {
  return useQuery<PreferredHospital, AxiosError>({
    queryKey: [ReactQueryKeys.PreferredHospitalQuery],
    queryFn: async () => {
      const { request } = patientsAPI.single.getPreferredHospital();
      return await request();
    },
    retry: false,
  });
};

export const useGetSurgeonEpisodeSummary = () => {
  return useQuery<SurgeonEpisodeSummaryAPI, AxiosError>({
    queryKey: [ReactQueryKeys.SurgeonEpisodeSummaryQuery],
    queryFn: async () => {
      const { request } = patientsAPI.single.getSurgeonEpisodeSummary();
      return await request();
    },
    retry: false,
  });
};

export const useGetEpisodeStats = (period?: string, groupBy?: 'hospital') => {
  return useQuery<EpisodeStatsAPI, AxiosError>({
    queryKey: [ReactQueryKeys.EpisodeStatsQuery, period, groupBy],
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (period) params.period = period;
      if (groupBy) params.group_by = groupBy;
      const { request } = patientsAPI.single.getEpisodeStats(params);
      return await request();
    },
    retry: false,
  });
};

export const useGetOwnedEpisodes = () => {
  return useQuery<OwnedEpisodeAPI[], AxiosError>({
    queryKey: [ReactQueryKeys.OwnedEpisodesQuery],
    queryFn: async () => {
      const { request } = patientsAPI.single.getOwnedEpisodes();
      return await request();
    },
    retry: false,
  });
};

export const useGetHospital = (id: string) => {
  return useQuery<HospitalsAPI, AxiosError>({
    queryKey: [ReactQueryKeys.HospitalsQuery, id],
    queryFn: async () => {
      const { request } = patientsAPI.single.getHospital(id);
      return await request();
    },
    retry: false,
  });
};

export const useGetPatients = (params?: PatientsPayload) => {
  return useQuery<PatientsResponse, AxiosError>({
    queryKey: [
      ReactQueryKeys.PatientsQuery,
      params?.hospital_id,
      params?.limit,
      params?.offset,
      params?.search_term,
      params?.ordering,
    ],
    queryFn: async () => {
      if (params?.hospital_id === undefined) {
        return undefined;
      }
      const { request } = patientsAPI.single.getPatients(params);
      return await request();
    },
    retry: false,
  });
};

export const useGetUnlinkedPatients = () => {
  return useQuery<UnlinkedPatientsResponse, AxiosError>({
    queryKey: [ReactQueryKeys.UnlinkedPatientsQuery],
    queryFn: async () => {
      const { request } = patientsAPI.single.getUnlinkedPatients();
      return await request();
    },
    retry: false,
  });
};

export const useGetSurgeons = (params?: PaginationParams) => {
  return useQuery<SurgeonsResponse, AxiosError>({
    queryKey: [
      ReactQueryKeys.SurgeonsQuery,
      params?.limit,
      params?.offset,
      params?.ordering,
    ],
    queryFn: async () => {
      const { request } = patientsAPI.single.getSurgeons(params);
      return await request();
    },
    retry: false,
  });
};

export const useGetPatient = (id: string) => {
  return useQuery<PatientAPI, AxiosError>({
    queryKey: [ReactQueryKeys.PatientsQuery, id],
    queryFn: async () => {
      const { request } = patientsAPI.single.getPatient(id);
      return await request();
    },
    retry: false,
  });
};

export const useCreateHospitalMapping = () => {
  const setNotification = useSetNotification();

  return useMutation<PatientAPI, Record<string, string[] | string>, HospitalMappingPayload>({
    mutationFn: async ({ patient_id, hospital_id, patient_hospital_id }) => {
      const { request } = patientsAPI.single.createHospitalMapping({
        patient_hospital_id: String(patient_hospital_id),
        patient_id,
        hospital_id,
      });
      return await request();
    },
    onError: (error) => {
      const errorMessages = Object.values(error).flat();
      const errorMessage =
        errorMessages.length > 0 ? errorMessages.join(' ') : 'Failed to create hospital mapping.';
      setNotification(errorMessage, 'error');
    },
  });
};

export const useRegisterPatient = () => {
  const navigate = useNavigate();
  const setNotification = useSetNotification();

  return useMutation<
    RegisterPatientPayload,
    Record<string, string[] | string>,
    RegisterPatientFormType
  >({
    mutationFn: (params) => {
      const { request } = patientsAPI.single.registerPatient({
        hospital_id: params.hospital.value,
        full_name: `${params.firstName}${params.middleName ? ' ' + params.middleName : ''} ${params.lastName}`,
        year_of_birth: params.yearOfBirth,
        month_of_birth: params.monthOfBirth,
        day_of_birth: params.dayOfBirth,
        age: params.age,
        national_id: params.nationalId,
        patient_hospital_id: params.patientHospitalId,
        gender: params.gender,
        address: params.address,
        phone_1: params.phone1 || '',
        phone_2: params.phone2 || undefined,
      });
      return request();
    },
    onSuccess: () => {
      setNotification('Patient has been successfully saved', 'success');
      navigate(urls.patients(), { replace: true });
    },
    onError: (error) => {
      const errorMessages = Object.values(error).flat();
      const errorMessage =
        errorMessages.length > 0
          ? errorMessages.join(' ')
          : 'Failed to save patient.';
      setNotification(errorMessage, 'error');
    },
  });
};

export const useRegisterEpisode = (
  hospitalID?: string,
  patientID?: string,
) => {
  const navigate = useNavigate();
  const setNotification = useSetNotification();

  return useMutation<
    RegisterEpisodePayload,
    Record<string, string[] | string>,
    RegisterEpisodeFormType
  >({
    mutationFn: (params) => {
      const payload = {
        hospital_id: params?.hospital?.value,
        patient_id: parseInt(patientID ?? '0'),
        anaesthetic_type: params?.anaestheticType?.label,
        diathermy_used: params?.diathermyUsed?.label === 'Yes',
        antibiotic_used: params?.antibioticUsed?.label === 'Yes',
        antibiotic_type: params?.antibioticType,
        surgeon_ids: [
          params?.primarySurgeon?.value,
          params?.secondarySurgeon?.value,
          params?.tertiarySurgeon?.value,
        ].filter((id) => id && id !== -1) as number[],
        primary_surgeon_id: params?.primarySurgeon?.value !== -1 ? params?.primarySurgeon?.value : undefined,
        secondary_surgeon_id: params?.secondarySurgeon?.value !== -1 ? params?.secondarySurgeon?.value : undefined,
        tertiary_surgeon_id: params?.tertiarySurgeon?.value !== -1 ? params?.tertiarySurgeon?.value : undefined,
        ...(params?.comments?.trim() ? { comments: params.comments.trim() } : {}),
        mesh_type: params?.meshType?.label,
        episode_type: params?.episodeType.label,
        type: params.type?.label,
        size: params.size?.label,
        cepod: params.cepod?.label,
        complexity: params?.complexity?.label,
        occurence: params?.occurence?.label,
        side: params?.side?.label,
        surgery_date: params?.surgeryDate,
      };

      const { request } = patientsAPI.single.registerEpisode(payload);

      return request();
    },
    onSuccess: () => {
      setNotification('Episode has been successfully saved', 'success');
      navigate(urls.patientDetails(hospitalID ?? '', patientID ?? '', 'episodes'), { replace: true });
    },
    onError: (error) => {
      const errorMessages = Object.values(error).flat();
      const errorMessage =
        errorMessages.length > 0
          ? errorMessages.join(' ')
          : 'Failed to save episode.';
      setNotification(errorMessage, 'error');
    },
  });
};

export const useGetEpisode = (id: string) => {
  return useQuery<EpisodesAPI, AxiosError>({
    queryKey: [ReactQueryKeys.EpisodesQuery, id],
    queryFn: async () => {
      const { request } = patientsAPI.single.getEpisode(id);
      return await request();
    },
    retry: false,
  });
};

export const useGetEpisodeDischarge = (id: string) => {
  return useQuery<DischargeAPI, AxiosError>({
    queryKey: [ReactQueryKeys.EpisodesQuery, id, 'discharge'],
    queryFn: async () => {
      const { request } = patientsAPI.single.getEpisodeDischarge(id);
      return await request();
    },
    retry: false,
  });
};

export const useGetEpisodeFollowUps = (id: string) => {
  return useQuery<FollowUpAPI, AxiosError, FollowUpAPI[]>({
    queryKey: [ReactQueryKeys.EpisodesQuery, id, 'follow-up'],
    queryFn: async () => {
      const { request } = patientsAPI.single.getEpisodeFollowUps(id);
      return await request();
    },
    retry: false,
  });
};

export const useDischarge = (episodeID: string) => {
  const navigate = useNavigate();
  const setNotification = useSetNotification();
  const { hospitalID, patientID } = useParams<{ hospitalID: string; patientID: string }>();

  return useMutation<DischargeAPI, Record<string, string[] | string>, DischargeForm>({
    mutationFn: (params) => {
      const payload = {
        episode_id: parseInt(episodeID),
        date: params?.date,
        discharge_duration: params?.discharge_duration,
        aware_of_mesh: params?.aware_of_mesh.label === 'Yes',
        ...(params?.comments?.trim() ? { comments: params.comments.trim() } : {}),
        infection: params?.infection || '',
      };

      const { request } = patientsAPI.single.dischargePatient(payload);

      return request();
    },
    onSuccess: () => {
      setNotification('Discharge has been successfully saved', 'success');
      if (hospitalID && patientID) {
        navigate(urls.patientDetails(hospitalID ?? '', patientID ?? '', 'episodes'), { replace: true });
      } else {
        window.location.reload();
      }
    },
    onError: (error) => {
      const errorMessages = Object.values(error).flat();
      const errorMessage =
        errorMessages.length > 0
          ? errorMessages.join(' ')
          : 'Failed to save discharge.';
      setNotification(errorMessage, 'error');
    },
  });
};

export const useFollowUp = (episodeID: string) => {
  const queryClient = useQueryClient();
  const setNotification = useSetNotification();

  return useMutation<FollowUpPayload, Record<string, string[] | string>, FollowUpForm>({
    mutationFn: (params) => {
      const payload = {
        episode_id: parseInt(episodeID),
        date: params?.date,
        attendee_ids: [
          params?.primaryAttendee?.value,
          ...(params?.attendees?.map((attendee) => attendee?.value) || []),
        ].filter((id) => id && id !== -1) as number[],
        primary_attendee_id:
          params?.primaryAttendee?.value !== -1 ? params?.primaryAttendee?.value : undefined,
        mesh_awareness: params?.mesh_awareness.label === 'Yes',
        seroma: params?.seroma.label === 'Yes',
        infection: params?.infection.label === 'Yes',
        numbness: params?.numbness.label === 'Yes',
        recurrence: params?.recurrence.label === 'Yes',
        pain_severity: params?.pain_severity.label,
        further_surgery_need: params?.further_surgery_need.label === 'Yes',
        ...(params?.surgery_comments_box?.trim()
          ? { surgery_comments_box: params.surgery_comments_box.trim() }
          : {}),
      };

      const { request } = patientsAPI.single.followUpPatient(payload);

      return request();
    },
    onSuccess: () => {
      setNotification('Follow up has been successfully saved', 'success');
      queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.EpisodesQuery, episodeID, 'follow-up'] });
    },
    onError: (error) => {
      const errorMessages = Object.values(error).flat();
      const errorMessage =
        errorMessages.length > 0
          ? errorMessages.join(' ')
          : 'Failed to save follow up.';
      setNotification(errorMessage, 'error');
    },
  });
};

export const useGetAnnouncements = () => {
  return useQuery<AnnouncementsResponse, AxiosError>({
    queryKey: [ReactQueryKeys.AnnouncementsQuery],
    queryFn: async () => {
      const { request } = patientsAPI.single.getAnnouncements();
      return await request();
    },
    retry: false,
  });
};