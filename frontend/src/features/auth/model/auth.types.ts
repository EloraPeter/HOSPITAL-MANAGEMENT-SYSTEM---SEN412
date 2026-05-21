import type { UserRole } from '@/entities/user/model/user.types';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: UserRole;
  phone: string;
  date_of_birth: string;
  blood_group?: string;
  gender?: string;
  specialty?: string;
  department?: string;
  license_number?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  emergency_contact_relationship?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  new_password: string;
  confirm_password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    role: UserRole;
  };
  token: string;
  refresh_token: string;
}

export interface AuthState {
  user: AuthResponse['user'] | null;
  token: string | null;
  refresh_token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}