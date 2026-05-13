import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { registerSchema, type RegisterFormData } from '../lib';
import { useAuth } from '../model';
import { ROUTES } from '@/app/router';

// ============================================
// Register Form Component
// ============================================
export const RegisterForm: React.FC = () => {
  const { register: registerUser } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // ============================================
  // Submit Handler
  // ============================================
  const onSubmit = async (data: RegisterFormData) => {
    try {
      setServerError(null);
      await registerUser(data);
    } catch (error: any) {
      setServerError(error.message || 'Registration failed. Please try again.');
    }
  };

  // ============================================
  // Render
  // ============================================
  return (
    <div className="w-100" style={{ maxWidth: '450px' }}>
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">Create Account</h2>
        <p className="text-muted">Join the hospital management system</p>
      </div>

      {/* Server Error Alert */}
      {serverError && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <div>{serverError}</div>
        </div>
      )}

      {/* Register Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Name Row */}
        <div className="row mb-3">
          {/* First Name */}
          <div className="col-md-6 mb-3 mb-md-0">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              placeholder="John"
              {...register('firstName')}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName.message}</div>
            )}
          </div>

          {/* Last Name */}
          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              placeholder="Doe"
              {...register('lastName')}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName.message}</div>
            )}
          </div>
        </div>

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
            placeholder="Create a password"
            {...register('password')}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
          <div className="form-text">
            Must be at least 8 characters with uppercase, lowercase, and number
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            placeholder="Confirm your password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword.message}</div>
          )}
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
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>

        {/* Login Link */}
        <p className="text-center text-muted">
          Already have an account?{' '}
          <Link to={ROUTES.PUBLIC.LOGIN} className="text-decoration-none">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};