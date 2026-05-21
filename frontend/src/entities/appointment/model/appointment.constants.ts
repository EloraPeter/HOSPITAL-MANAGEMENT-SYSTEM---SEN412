import type { AppointmentStatus } from './appointment.types';

export const APPOINTMENT_STATUSES: Record<AppointmentStatus, string> = {
  pending: 'Pending Approval',
  approved: 'Approved',
  confirmed: 'Confirmed',
  'in-progress': 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
  'no-show': 'No Show',
};

export const APPOINTMENT_TYPES = [
  'Consultation',
  'Check-up',
  'Follow-up',
  'Emergency',
  'Surgery',
  'Procedure',
  'Vaccination',
] as const;

export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30',
] as const;