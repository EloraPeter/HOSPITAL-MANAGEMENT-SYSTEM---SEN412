import { authService as apiAuthService } from '@/shared/api/services/authService';
import type { LoginCredentials, RegisterData, AuthResponse } from './auth.types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiAuthService.login({
      email: credentials.email,
      password: credentials.password,
    });
    return response;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiAuthService.register({
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      phone: data.phone,
    });
    return response;
  },

  logout: async (): Promise<void> => {
    await apiAuthService.logout();
  },

  getMe: async () => {
    return apiAuthService.getMe();
  },
};