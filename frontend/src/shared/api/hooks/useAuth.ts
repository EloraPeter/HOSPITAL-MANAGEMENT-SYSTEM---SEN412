import { useState, useCallback } from 'react';
import { authService } from '../services/authService';
import { useAuthStore } from '@/app/store/authStore';
import type { LoginRequest, RegisterRequest } from '../types/auth.types';

export const useAuthApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuth, logout: storeLogout } = useAuthStore();

  const login = useCallback(async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(data);
      setAuth({
        user: response.user,
        token: response.token,
        refresh_token: '',
      });
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, [setAuth]);

  const register = useCallback(async (data: RegisterRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.register(data);
      setAuth({
        user: response.user,
        token: response.token,
        refresh_token: '',
      });
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed.';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, [setAuth]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Logout locally even if API call fails
    } finally {
      storeLogout();
    }
  }, [storeLogout]);

  return { login, register, logout, isLoading, error, clearError: () => setError(null) };
};