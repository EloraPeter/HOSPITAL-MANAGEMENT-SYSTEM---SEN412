import type { BloodGroup, Gender } from './patient.types';

export const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const GENDERS: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export const EMERGENCY_RELATIONSHIPS = [
  'Spouse', 'Parent', 'Child', 'Sibling', 'Guardian', 'Friend', 'Other'
];