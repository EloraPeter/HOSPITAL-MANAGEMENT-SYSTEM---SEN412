import { z } from 'zod';

// Login validation - matches backend POST /auth/login
// Note: rememberMe is a frontend-only field, not sent to the backend
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required'),
  rememberMe: z.boolean(),
});

// Register validation - matches backend POST /auth/register
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
  password_confirmation: z
    .string()
    .min(1, 'Please confirm your password'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 characters')
    .regex(/^\+?[\d\s-]+$/, 'Invalid phone number format'),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ['password_confirmation'],
});

// Forgot password validation
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

// Types - explicitly defined to avoid inference issues
export type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
};

export type ForgotPasswordFormData = {
  email: string;
};