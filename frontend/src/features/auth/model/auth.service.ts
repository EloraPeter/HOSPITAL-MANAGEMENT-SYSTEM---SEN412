import { dummyUsers } from '../lib/authDummyData';
import type { LoginCredentials, RegisterData, AuthResponse } from './auth.types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(1000);
    
    const user = dummyUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // In real app, verify password hash
    if (credentials.password !== 'Password123!') {
      throw new Error('Invalid email or password');
    }
    
    return {
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        role: user.role,
      },
      token: `mock-jwt-token-${user.id}`,
      refresh_token: `mock-refresh-token-${user.id}`,
    };
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    await delay(1500);
    
    // Simulate registration
    const newUser = {
      id: `USR-${Date.now()}`,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      role: data.role,
    };
    
    return {
      user: newUser,
      token: `mock-jwt-token-${newUser.id}`,
      refresh_token: `mock-refresh-token-${newUser.id}`,
    };
  },

  forgotPassword: async (email: string): Promise<void> => {
    await delay(1000);
    const user = dummyUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('No account found with this email');
    }
    // Simulate sending reset email
  },

  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await delay(1000);
    // Simulate password reset
  },

  logout: async (): Promise<void> => {
    await delay(300);
  },
};