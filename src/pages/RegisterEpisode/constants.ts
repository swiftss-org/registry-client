import { SelectOption } from '../../models/apiTypes';

export const CEPOD_OPTIONS: SelectOption[] = [
  {
    value: 0,
    label: 'Planned',
  },
  {
    value: 1,
    label: 'Emergency',
  },
];
export const SIDE_OPTIONS: SelectOption[] = [
  {
    value: 0,
    label: 'Left',
  },
  {
    value: 1,
    label: 'Right',
  },
];
export const OCCURRENCE_OPTIONS: SelectOption[] = [
  {
    value: 0,
    label: 'Primary',
  },
  {
    value: 1,
    label: 'Recurrent',
  },
  {
    value: 2,
    label: 'Rerecurrent',
  },
];
export const TYPE_OPTIONS: SelectOption[] = [
  {
    value: 0,
    label: 'Direct',
  },
  {
    value: 1,
    label: 'Indirect',
  },
  {
    value: 2,
    label: 'Pantaloon',
  },
];
export const COMPLEXITY_OPTIONS: SelectOption[] = [
  {
    value: 0,
    label: 'Simple',
  },
  {
    value: 1,
    label: 'Incarcerated',
  },
  {
    value: 2,
    label: 'Obstructed',
  },
  {
    value: 3,
    label: 'Strangulated',
  },
];
export const MESH_TYPE_OPTIONS: SelectOption[] = [
  {
    value: 0,
    label: 'TNMHP Mesh',
  },
  {
    value: 1,
    label: 'KCMC Generic Mesh',
  },
  {
    value: 1,
    label: 'Commercial Mesh',
  },
];
export const ANAESTHETIC_TYPE_OPTIONS: SelectOption[] = [
  {
    value: 0,
    label: 'Local Anaesthetic',
  },
  {
    value: 1,
    label: 'Spinal Anaesthetic',
  },
  {
    value: 1,
    label: 'General Anaesthetic',
  },
];
export const BOOLEAN_OPTIONS: SelectOption[] = [
  {
    value: 0,
    label: 'Yes',
  },
  {
    value: 1,
    label: 'No',
  },
];

export const FOLLOW_UP_PAIN_OPTIONS: SelectOption[] = [
  {
    value: 0,
    label: 'No Pain',
  },
  {
    value: 1,
    label: 'Minimal',
  },
  {
    value: 2,
    label: 'Mild',
  },
  {
    value: 3,
    label: 'Moderate',
  },
  {
    value: 4,
    label: 'Severe',
  },
];

export const EPISODE_TYPE_OPTIONS: SelectOption[] = [
  {
    value: 0,
    label: 'Inguinal Mesh Hernia Repair',
  },
  {
    value: 1,
    label: 'Incisional Mesh Hernia Repair',
  },
  {
    value: 2,
    label: 'Femoral Mesh Hernia Repair',
  },
  {
    value: 3,
    label: 'Hiatus Mesh Hernia Repair',
  },
  {
    value: 4,
    label: 'Umbilical/Periumbilicial Mesh Hernia Repair',
  },
];
