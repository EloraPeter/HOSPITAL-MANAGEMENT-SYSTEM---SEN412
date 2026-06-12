import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/app/store/authStore';
import { authService } from './auth.service';
import type { LoginCredentials, RegisterData } from './auth.types';

export const useAuth = () => {
  const navigate = useNavigate();
  const store = useAuthStore();

  const login = useCallback(async (credentials: LoginCredentials) => {
    store.setLoading(true);
    store.clearError();
    try {
      const response = await authService.login(credentials);
      store.setAuth({
        user: response.user,
        token: response.token,
        refresh_token: '',
      });
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
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
      store.setAuth({
        user: response.user,
        token: response.token,
        refresh_token: '',
      });
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      store.setError(message);
      throw err;
    } finally {
      store.setLoading(false);
    }
  }, [store]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Logout locally even if API call fails
    } finally {
      store.logout();
      navigate('/login', { replace: true });
    }
  }, [store, navigate]);

  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
    login,
    register,
    logout,
    clearError: store.clearError,
    hasRole: store.hasRole,
  };
};