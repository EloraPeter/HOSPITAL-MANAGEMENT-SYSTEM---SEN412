import type { StaffStatus, StaffType } from './staff.types';

export const STAFF_STATUSES: { value: StaffStatus; label: string; color: string }[] = [
  { value: 'active', label: 'Active', color: 'success' },
  { value: 'on-leave', label: 'On Leave', color: 'warning' },
  { value: 'suspended', label: 'Suspended', color: 'danger' },
  { value: 'terminated', label: 'Terminated', color: 'secondary' },
  { value: 'probation', label: 'Probation', color: 'info' },
];

export const STAFF_TYPES: { value: StaffType; label: string }[] = [
  { value: 'doctor', label: 'Doctor' },
  { value: 'nurse', label: 'Nurse' },
  { value: 'administrative', label: 'Administrative' },
  { value: 'lab-technician', label: 'Lab Technician' },
  { value: 'pharmacist', label: 'Pharmacist' },
  { value: 'receptionist', label: 'Receptionist' },
];

export const DEPARTMENTS = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Emergency',
  'Pharmacy',
  'Radiology',
  'Pathology',
  'Administration',
];

export const SORT_OPTIONS = [
  { value: 'firstName', label: 'First Name' },
  { value: 'lastName', label: 'Last Name' },
  { value: 'department', label: 'Department' },
  { value: 'joiningDate', label: 'Joining Date' },
  { value: 'yearsOfExperience', label: 'Experience' },
];