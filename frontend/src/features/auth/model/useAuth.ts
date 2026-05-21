import { useCallback } from 'react';
import { useAuthStore } from '@/app/store/authStore';
import { authService } from './auth.service';
import type { LoginCredentials, RegisterData } from './auth.types';

export const useAuth = () => {
  const store = useAuthStore();

  const login = useCallback(async (credentials: LoginCredentials) => {
    store.setLoading(true);
    store.clearError();
    try {
      const response = await authService.login(credentials);
      store.setAuth(response);
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      store.setError(message);
      throw err;
    } finally {
      store.setLoading(false);
    }
  }, [store]);

  const register = useCallback(async (data: RegisterData) => {
    store.setLoading(true);
    store.clearError();
    try {
      const response = await authService.register(data);
      store.setAuth(response);
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      store.setError(message);
      throw err;
    } finally {
      store.setLoading(false);
    }
  }, [store]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      store.logout();
    }
  }, [store]);

  const forgotPassword = useCallback(async (email: string) => {
    store.setLoading(true);
    store.clearError();
    try {
      await authService.forgotPassword(email);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send reset email';
      store.setError(message);
      throw err;
    } finally {
      store.setLoading(false);
    }
  }, [store]);

  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
    login,
    register,
    logout,
    forgotPassword,
    clearError: store.clearError,
  };
};