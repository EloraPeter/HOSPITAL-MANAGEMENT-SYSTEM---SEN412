import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { loginSchema, type LoginFormData } from '../lib';
import { useAuth } from '../model';
import { ROUTES } from '@/app/router';

// ============================================
// Login Form Component
// ============================================
export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // ============================================
  // Submit Handler
  // ============================================
  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError(null);
      await login(data);
    } catch (error: any) {
      setServerError(error.message || 'Login failed. Please try again.');
    }
  };

  // ============================================
  // Render
  // ============================================
  return (
    <div className="w-100" style={{ maxWidth: '400px' }}>
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">Welcome Back</h2>
        <p className="text-muted">Sign in to your account to continue</p>
      </div>

      {/* Server Error Alert */}
      {serverError && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <div>{serverError}</div>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Enter your email"
            {...register('email')}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Enter your password"
            {...register('password')}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <Link to={ROUTES.PUBLIC.FORGOT_PASSWORD} className="text-decoration-none">
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-100 mb-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>

        {/* Register Link */}
        <p className="text-center text-muted">
          Don't have an account?{' '}
          <Link to={ROUTES.PUBLIC.REGISTER} className="text-decoration-none">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};