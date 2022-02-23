import { AxiosError } from 'axios';
import { ReactQueryKeys } from 'hooks/constants';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

import patientsAPI from '../../api/patientsAPI';
import {
  DischargeAPI,
  DischargeForm,
  EpisodesAPI,
  HospitalMappingPayload,
  HospitalsAPI,
  HospitalsResponse,
  PaginationParams,
  PatientAPI,
  PatientsPayload,
  PatientsResponse,
  RegisterEpisodePayload,
  RegisterPatientPayload,
  SurgeonsResponse,
} from '../../models/apiTypes';
import { RegisterEpisodeFormType } from '../../pages/RegisterEpisode/types';
import { RegisterPatientFormType } from '../../pages/RegisterPatient/types';
import urls from '../../routing/urls';

export const useGetHospitals = (params?: PaginationParams) => {
  return useQuery<HospitalsResponse, AxiosError, HospitalsResponse>(
    ReactQueryKeys.HospitalsQuery,
    async () => {
      const { request } = patientsAPI.single.getHospitals(params);
      return await request();
    },
    {
      onError: (errors) => {
        console.log(errors);
      },

      retry: false,
    }
  );
};

export const useGetHospital = (id: string) => {
  return useQuery<HospitalsAPI, AxiosError, HospitalsAPI>(
    [ReactQueryKeys.HospitalsQuery, id],
    async () => {
      const { request } = patientsAPI.single.getHospital(id);
      return await request();
    },
    {
      onError: (errors) => {
        console.log(errors);
      },

      retry: false,
    }
  );
};

export const useGetPatients = (params?: PatientsPayload) => {
  return useQuery<PatientsResponse, AxiosError, PatientsResponse>(
    [
      ReactQueryKeys.PatientsQuery,
      params?.hospital_id,
      params?.limit,
      params?.offset,
      params?.search_term,
      params?.ordering,
    ],
    async () => {
      if (params?.hospital_id === undefined) {
        return undefined;
      }
      const { request } = patientsAPI.single.getPatients(params);
      return await request();
    },
    {
      onError: (errors) => {
        console.log(errors);
      },

      retry: false,
    }
  );
};

export const useGetSurgeons = (params?: PaginationParams) => {
  return useQuery<SurgeonsResponse, AxiosError, SurgeonsResponse>(
    [ReactQueryKeys.SurgeonsQuery, params?.limit, params?.offset, params?.ordering],
    async () => {
      const { request } = patientsAPI.single.getSurgeons(params);
      return await request();
    },
    {
      onError: (errors) => {
        console.log(errors);
      },
      retry: false,
    }
  );
};

export const useGetPatient = (id: string) => {
  return useQuery<PatientAPI, AxiosError, PatientAPI>(
    [ReactQueryKeys.PatientsQuery, id],
    async () => {
      const { request } = patientsAPI.single.getPatient(id);
      return await request();
    },
    {
      onError: (errors) => {
        console.log(errors);
      },
      retry: false,
    }
  );
};

export const useCreateHospitalMapping = () => {
  return useMutation<PatientAPI, AxiosError, HospitalMappingPayload>(
    async ({ patient_id, hospital_id, patient_hospital_id }) => {
      const { request } = patientsAPI.single.createHospitalMapping({
        patient_hospital_id,
        patient_id,
        hospital_id,
      });
      return await request();
    },
    {
      onError: (errors) => {
        console.log(errors);
      },
    }
  );
};

export const useRegisterPatient = () => {
  const history = useHistory();

  return useMutation<RegisterPatientPayload, AxiosError, RegisterPatientFormType>(
    (params) => {
      const { request } = patientsAPI.single.registerPatient({
        hospital_id: params.hospital.value,
        full_name: `${params.firstName} ${params.lastName}`,
        year_of_birth: params.yearOfBirth,
        age: params.age,
        national_id: params.nationalId,
        patient_hospital_id: params.patientHospitalId,
        gender: params.gender,
        address: params.address,
        phone_1: params.phone1,
        phone_2: params.phone2,
      });
      return request();
    },
    {
      onSuccess: () => {
        history.replace(urls.patients());
      },
      onError: (errors) => {
        console.log(errors);
      },
    }
  );
};

export const useRegisterEpisode = (
  hospitalID?: string,
  patientID?: string,
  episodeType = 'Inguinal Mesh Hernia Repair'
) => {
  const history = useHistory();

  return useMutation<RegisterEpisodePayload, AxiosError, RegisterEpisodeFormType>(
    (params) => {
      const payload = {
        hospital_id: params?.hospital?.value,
        patient_id: parseInt(patientID ?? '0'),
        anaesthetic_type: params?.anaestheticType?.label,
        diathermy_used: params?.diathermyUsed?.label === 'Yes',
        surgeon_ids: params?.surgeons?.map((surgeon) => surgeon?.value) ?? ['1'],
        comments: params?.comments,
        mesh_type: params?.meshType?.label,
        episode_type: episodeType,
        type: params.type?.label,
        cepod: params.cepod?.label,
        complexity: params?.complexity?.label,
        occurence: params?.occurence?.label,
        side: params?.side?.label,
        surgery_date: params?.surgeryDate,
      };

      const { request } = patientsAPI.single.registerEpisode(payload);

      return request();
    },
    {
      onSuccess: () => {
        history.replace(`${urls.patients()}/${hospitalID}/${patientID}`);
      },
      onError: (errors) => {
        console.log(errors);
      },
    }
  );
};

export const useGetEpisode = (id: string) => {
  return useQuery<EpisodesAPI, AxiosError, EpisodesAPI>(
    [ReactQueryKeys.EpisodesQuery, id],
    async () => {
      const { request } = patientsAPI.single.getEpisode(id);
      return await request();
    },
    {
      onError: (errors) => {
        console.log(errors);
      },
      retry: false,
    }
  );
};

export const useGetEpisodeDischarge = (id: string) => {
  return useQuery<EpisodesAPI, AxiosError, EpisodesAPI>(
    [ReactQueryKeys.EpisodesQuery, id, 'discharge'],
    async () => {
      const { request } = patientsAPI.single.getEpisodeDischarge(id);
      return await request();
    },
    {
      onError: (errors) => {
        console.log(errors);
      },
      retry: false,
    }
  );
};

export const useGetEpisodeFollowUps = (id: string) => {
  return useQuery<EpisodesAPI, AxiosError, EpisodesAPI>(
    [ReactQueryKeys.EpisodesQuery, id, 'follow-up'],
    async () => {
      const { request } = patientsAPI.single.getEpisodeFollowUps(id);
      return await request();
    },
    {
      onError: (errors) => {
        console.log(errors);
      },
      retry: false,
    }
  );
};

export const useDischarge = (episodeID: string) => {
  return useMutation<DischargeAPI, AxiosError, DischargeForm>(
    (params) => {
      const payload = {
        episode_id: parseInt(episodeID),
        date: params?.date,
        aware_of_mesh: params?.aware_of_mesh.label === 'Yes',
        infection: params?.infection.label === 'Yes',
      };

      const { request } = patientsAPI.single.dischargePatient(payload);

      return request();
    },
    {
      onError: (errors) => {
        console.log(errors);
      },
    }
  );
};
