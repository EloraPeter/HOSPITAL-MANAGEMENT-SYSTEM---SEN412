import type { UserRole } from './user.types';

export const USER_ROLES: Record<UserRole, string> = {
  patient: 'Patient',
  doctor: 'Doctor',
  admin: 'Administrator',
  nurse: 'Nurse',
  receptionist: 'Receptionist',
  pharmacist: 'Pharmacist',
  accountant: 'Accountant',
};

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ['all'],
  doctor: ['patients:read', 'patients:write', 'appointments:read', 'appointments:write', 'medical_records:write', 'prescriptions:write', 'labs:write'],
  nurse: ['patients:read', 'appointments:read', 'medical_records:read'],
  receptionist: ['patients:read', 'appointments:read', 'appointments:write'],
  pharmacist: ['prescriptions:read', 'prescriptions:write'],
  accountant: ['billing:read', 'billing:write', 'insurance:read'],
  patient: ['appointments:read', 'appointments:write', 'medical_records:read', 'prescriptions:read', 'labs:read', 'billing:read'],
};