import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/app/store';
import { useUIStore } from '@/app/store';
import { ROUTES } from '@/app/router';
import { authService } from './auth.service';
import type { LoginFormData, RegisterFormData } from '../lib';

// ============================================
// useAuth - Main Auth Hook
// ============================================
export function useAuth() {
  const navigate = useNavigate();

  // Store actions
  const { login: storeLogin, logout: storeLogout } = useAuthStore();
  const addToast = useUIStore((state) => state.addToast);

  // ============================================
  // Login Handler
  // ============================================
  const login = useCallback(
    async (data: LoginFormData) => {
      try {
        const response = await authService.login({
          email: data.email,
          password: data.password,
        });

        // Update store with auth data
        storeLogin(data.email, data.password);

        // Show success message
        addToast({
          type: 'success',
          title: 'Welcome back!',
          message: `Logged in as ${response.user.firstName} ${response.user.lastName}`,
        });

        // Redirect to dashboard
        navigate(ROUTES.PROTECTED.DASHBOARD, { replace: true });
      } catch (error: any) {
        // Show error message
        addToast({
          type: 'error',
          title: 'Login failed',
          message: error.message || 'Invalid email or password. Please try again.',
        });
        throw error;
      }
    },
    [storeLogin, addToast, navigate]
  );

  // ============================================
  // Register Handler
  // ============================================
  const register = useCallback(
    async (data: RegisterFormData) => {
      try {
        const response = await authService.register({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        });

        // Update store with auth data
        storeLogin(data.email, data.password);

        // Show success message
        addToast({
          type: 'success',
          title: 'Account created!',
          message: `Welcome, ${response.user.firstName}! Your account has been created successfully.`,
        });

        // Redirect to dashboard
        navigate(ROUTES.PROTECTED.DASHBOARD, { replace: true });
      } catch (error: any) {
        // Show error message
        addToast({
          type: 'error',
          title: 'Registration failed',
          message: error.message || 'Could not create account. Please try again.',
        });
        throw error;
      }
    },
    [storeLogin, addToast, navigate]
  );

  // ============================================
  // Logout Handler
  // ============================================
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      storeLogout();
      addToast({
        type: 'info',
        title: 'Logged out',
        message: 'You have been successfully logged out.',
      });
      navigate(ROUTES.PUBLIC.LOGIN, { replace: true });
    }
  }, [storeLogout, addToast, navigate]);

  return {
    login,
    register,
    logout,
  };
}