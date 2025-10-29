
import { EducationLevel, PedagogicalPractice, GraduateDimension } from './types';

export const educationLevels: { value: EducationLevel; label: string }[] = [
  { value: 'SD', label: 'SD / Sederajat' },
  { value: 'SMP', label: 'SMP / Sederajat' },
  { value: 'SMA', label: 'SMA / Sederajat' },
];

export const grades: Record<EducationLevel, string[]> = {
  SD: ['1', '2', '3', '4', '5', '6'],
  SMP: ['7', '8', '9'],
  SMA: ['10', '11', '12'],
};

export const pedagogicalPracticesOptions: { value: PedagogicalPractice; label: string }[] = [
  { value: 'Inkuiri', label: 'Inkuiri' },
  { value: 'PjBL', label: 'Project Based Learning (PjBL)' },
  { value: 'Diskusi', label: 'Diskusi' },
  { value: 'Kolaboratif', label: 'Kolaboratif' },
  { value: 'Problem Solving', label: 'Problem Solving' },
  { value: 'Game Based Learning', label: 'Game Based Learning' },
  { value: 'Station Learning', label: 'Station Learning' },
];

export const graduateDimensionsOptions: { value: GraduateDimension; label: string }[] = [
  { value: 'Keimanan & Ketakwaan', label: 'Keimanan & Ketakwaan' },
  { value: 'Kewargaan', label: 'Kewargaan' },
  { value: 'Penalaran Kritis', label: 'Penalaran Kritis' },
  { value: 'Kreativitas', label: 'Kreativitas' },
  { value: 'Kolaborasi', label: 'Kolaborasi' },
  { value: 'Kemandirian', label: 'Kemandirian' },
  { value: 'Kesehatan', label: 'Kesehatan' },
  { value: 'Komunikasi', label: 'Komunikasi' },
];
