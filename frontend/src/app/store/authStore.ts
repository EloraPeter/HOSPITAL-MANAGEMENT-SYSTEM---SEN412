import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '@/shared/api/types/auth.types';

interface AuthState {
  user: User | null;
  token: string | null;
  refresh_token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  setAuth: (data: { user: User; token: string; refresh_token: string }) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  logout: () => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
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

      logout: () => {
        set({
          user: null,
          token: null,
          refresh_token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        localStorage.removeItem('hospital-auth-storage');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      },

      hasRole: (roles) => {
        const user = get().user;
        if (!user) return false;
        const rolesArray = Array.isArray(roles) ? roles : [roles];
        return rolesArray.includes(user.role);
      },
    }),
    {
      name: 'hospital-auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);