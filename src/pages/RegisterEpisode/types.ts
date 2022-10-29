import { SelectOption } from '../../models/apiTypes';

export type RegisterEpisodeFormType = {
  hospital: SelectOption;
  patientHospitalId: number;
  episodeType: SelectOption;
  surgeryDate: string;
  cepod: SelectOption;
  side: SelectOption;
  occurence: SelectOption;
  type: SelectOption;
  size: SelectOption;
  complexity: SelectOption;
  meshType: SelectOption;
  anaestheticType: SelectOption;
  diathermyUsed: SelectOption;
  surgeons: {
    label: string;
    value: number;
  }[];
  comments?: string;
};
