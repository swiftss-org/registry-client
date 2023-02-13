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
    label: 'Not Applicable',
  },
  {
    value: 1,
    label: 'Left',
  },
  {
    value: 2,
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
    label: 'Not Applicable',
  },
  {
    value: 1,
    label: 'Direct',
  },
  {
    value: 2,
    label: 'Indirect',
  },
  {
    value: 3,
    label: 'Pantaloon',
  },
];
export const SIZE_OPTIONS: SelectOption[] = [
  {
    value: 0,
    label: 'Very Small (<1 finger breadth)',
  },
  {
    value: 1,
    label: 'Small (1-2 finger breadths)',
  },
  {
    value: 2,
    label: 'Medium (2-3 finger breadths)',
  },
  {
    value: 3,
    label: 'Large (3-4 finger breadths)',
  },
  {
    value: 4,
    label: 'Very Large (>4 finger breadths)',
  },
  {
    value: 5,
    label: 'Massive (extends beyond midpoint of thigh)',
  },  
];
export const COMPLEXITY_OPTIONS: SelectOption[] = [
  {
    value: 0,
    label: 'Simple',
  },
  {
    value: 1,
    label: 'Irreducible',
  },
  {
    value: 2,
    label: 'With bowel obstruction',
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
  {
    value: 1,
    label: 'Hernia International Mesh'
  }
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
    label: 'Umbilical/Periumbilicial Mesh Hernia Repair',
  },
];
