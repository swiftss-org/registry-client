import { SelectOption } from '../../models/apiTypes';

export type RegisterEpisodeFormType = {
  hospital: SelectOption;
  patientHospitalId: string;
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
  antibioticUsed: SelectOption;
  antibioticType: string;
  primarySurgeon: SelectOption;
  secondarySurgeon?: SelectOption;
  tertiarySurgeon?: SelectOption;
  comments?: string;
};
