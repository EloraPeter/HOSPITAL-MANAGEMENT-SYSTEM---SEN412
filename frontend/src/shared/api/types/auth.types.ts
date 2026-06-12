// Login
export interface LoginRequest {
  email: string;
  password: string;
}

// Register
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
}

// User object from backend
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
}

export type UserRole = 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'patient';

// Auth response from login/register
export interface AuthResponse {
  user: User;
  token: string;
}