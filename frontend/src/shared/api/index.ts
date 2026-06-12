// Client
export { default as apiClient } from './client';
export { API_ENDPOINTS } from './endpoints';

// Services
export {
  authService,
  patientService,
  doctorService,
  appointmentService,
} from './services';

// Hooks
export {
  useAuthApi,
  usePatientsApi,
} from './hooks';

// Types
export type {
  ApiResponse,
  ApiListResponse,
  ApiErrorResponse,
  PaginationParams,
  LoginRequest,
  RegisterRequest,
  User,
  UserRole,
  AuthResponse,
  CreatePatientRequest,
  UpdatePatientRequest,
  Patient,
  BloodType,
  CreateDoctorRequest,
  UpdateDoctorRequest,
  Doctor,
  DoctorStatus,
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
  Appointment,
  AppointmentStatus,
} from './types';