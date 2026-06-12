import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, Mail, Lock, Phone, User } from 'lucide-react';
import { useAuth } from '../model/useAuth';
import { registerSchema } from '../lib/authValidators';
import type { RegisterFormData } from '../lib/authValidators';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      clearError();
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
        phone: data.phone,
      });
      navigate('/dashboard', { replace: true });
    } catch {
      // Error handled in hook
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3" role="alert">
          <span className="flex-shrink-0">!</span>
          <span className="flex-grow-1 small">{error}</span>
          <button type="button" className="btn-close" onClick={clearError} />
        </div>
      )}

      {/* Full Name */}
      <div>
        <label className="form-label small fw-medium text-secondary mb-1">Full Name</label>
        <div className="input-group">
          <span className="input-group-text bg-transparent border-end-0 text-muted">
            <User size={16} />
          </span>
          <input
            {...register('name')}
            type="text"
            className={`form-control border-start-0 bg-transparent ${errors.name ? 'is-invalid' : ''}`}
            placeholder="John Doe"
          />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="form-label small fw-medium text-secondary mb-1">Email</label>
        <div className="input-group">
          <span className="input-group-text bg-transparent border-end-0 text-muted">
            <Mail size={16} />
          </span>
          <input
            {...register('email')}
            type="email"
            className={`form-control border-start-0 bg-transparent ${errors.email ? 'is-invalid' : ''}`}
            placeholder="john@example.com"
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="form-label small fw-medium text-secondary mb-1">Phone</label>
        <div className="input-group">
          <span className="input-group-text bg-transparent border-end-0 text-muted">
            <Phone size={16} />
          </span>
          <input
            {...register('phone')}
            type="tel"
            className={`form-control border-start-0 bg-transparent ${errors.phone ? 'is-invalid' : ''}`}
            placeholder="08012345678"
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="form-label small fw-medium text-secondary mb-1">Password</label>
        <div className="input-group">
          <span className="input-group-text bg-transparent border-end-0 text-muted">
            <Lock size={16} />
          </span>
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            className={`form-control border-start-0 border-end-0 bg-transparent ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Min 8 characters"
          />
          <span
            className="input-group-text bg-transparent border-start-0 text-muted cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
            role="button"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </span>
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="form-label small fw-medium text-secondary mb-1">Confirm Password</label>
        <input
          {...register('password_confirmation')}
          type="password"
          className={`form-control bg-transparent ${errors.password_confirmation ? 'is-invalid' : ''}`}
          placeholder="Confirm your password"
        />
        {errors.password_confirmation && (
          <div className="invalid-feedback">{errors.password_confirmation.message}</div>
        )}
      </div>

      {/* Submit */}
      <button type="submit" className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2 py-2" disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm" />
            <span>Creating Account...</span>
          </>
        ) : (
          <>
            <UserPlus size={18} />
            <span>Create Account</span>
          </>
        )}
      </button>

      <p className="text-center text-muted small mb-0">
        Already have an account?{' '}
        <Link to="/login" className="text-decoration-none fw-medium">Sign in</Link>
      </p>
    </form>
  );
};