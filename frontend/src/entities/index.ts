// Users
export type { User, UserRole, LoginCredentials, AuthResponse } from './user/model/user.types';
export { USER_ROLES, ROLE_PERMISSIONS } from './user/model/user.constants';

// Patients
export type { Patient, PatientWithUser, BloodGroup, Gender } from './patient/model/patient.types';
export { BLOOD_GROUPS, GENDERS, EMERGENCY_RELATIONSHIPS } from './patient/model/patient.constants';

// Doctors
export type { Doctor, DoctorWithUser, DoctorSchedule } from './doctor/model/doctor.types';
export { SPECIALTIES, DEPARTMENTS } from './doctor/model/doctor.constants';

// Appointments
export type { Appointment, AppointmentWithDetails, AppointmentStatus } from './appointment/model/appointment.types';
export { APPOINTMENT_STATUSES, APPOINTMENT_TYPES, TIME_SLOTS } from './appointment/model/appointment.constants';

// Medical Records
export type { MedicalRecord, VitalSigns } from './medicalRecord/model/medicalRecord.types';

// Prescriptions
export type { Prescription, PrescriptionStatus } from './prescription/model/prescription.types';
export { FREQUENCIES } from './prescription/model/prescription.constants';

// Labs
export type { LabTest, LabReport, LabStatus } from './lab/model/lab.types';

// Billing
export type { Billing, BillingItem, InsuranceProvider, PaymentStatus, PaymentMethod } from './billing/model/billing.types';
export { PAYMENT_STATUSES, PAYMENT_METHODS } from './billing/model/billing.constants';

// Discharge
export type { DischargeSummary } from './dischargeSummary/model/dischargeSummary.types';