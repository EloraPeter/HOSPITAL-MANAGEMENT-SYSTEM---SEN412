import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserRole } from '@/entities/user/model/user.types';

interface AuthUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: UserRole;
}

interface AuthStoreState {
  user: AuthUser | null;
  token: string | null;
  refresh_token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthStoreActions {
  setAuth: (data: { user: AuthUser; token: string; refresh_token: string }) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState & AuthStoreActions>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refresh_token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setAuth: (data) => set({
        user: data.user,
        token: data.token,
        refresh_token: data.refresh_token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }),

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error, isLoading: false }),
      clearError: () => set({ error: null }),

      logout: () => set({
        user: null,
        token: null,
        refresh_token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      }),
    }),
    {
      name: 'hospital-auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refresh_token: state.refresh_token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);