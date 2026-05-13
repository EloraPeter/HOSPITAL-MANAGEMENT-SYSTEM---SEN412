import axios from 'axios';

// ============================================
// API Client Configuration
// ============================================
const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================
// Types
// ============================================
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    avatar?: string;
  };
  token: string;
  refreshToken: string;
}

// ============================================
// Auth API Service
// ============================================
export const authService = {
  /**
   * Login with email and password
   * Currently uses mock - replace with real API call when backend is ready
   */
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    // TODO: Uncomment when backend is ready
    // const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
    // return data;

    // Mock response for development
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      user: {
        id: '1',
        email: payload.email,
        firstName: 'Dr. John',
        lastName: 'Smith',
        role: 'admin',
      },
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
    };
  },

  /**
   * Register a new user
   * Currently uses mock - replace with real API call when backend is ready
   */
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    // TODO: Uncomment when backend is ready
    // const { data } = await apiClient.post<AuthResponse>('/auth/register', payload);
    // return data;

    // Mock response for development
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      user: {
        id: '2',
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        role: 'doctor',
      },
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
    };
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    // TODO: Uncomment when backend is ready
    // await apiClient.post('/auth/logout');
  },

  /**
   * Refresh token
   */
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    // TODO: Uncomment when backend is ready
    // const { data } = await apiClient.post<AuthResponse>('/auth/refresh', { refreshToken });
    // return data;

    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      user: {
        id: '1',
        email: 'user@hospital.com',
        firstName: 'Dr. John',
        lastName: 'Smith',
        role: 'admin',
      },
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
    };
  },
};