import { SelectOption } from '../../models/apiTypes';

export type RegisterEpisodeFormType = {
  hospital: SelectOption;
  patientHospitalId: number;
  surgeryDate: string;
  cepod: SelectOption;
  side: SelectOption;
  occurence: SelectOption;
  type: SelectOption;
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
