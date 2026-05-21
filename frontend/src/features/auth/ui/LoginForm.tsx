import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Mail, Lock } from 'lucide-react';
import { useAuth } from '../model/useAuth';
import { loginSchema } from '../lib/authValidators';
import type { LoginFormData } from '../lib/authValidators';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@hospital.com',
      password: 'Password123!',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError();
      await login(data);
      navigate('/dashboard', { replace: true });
    } catch {
      // Error handled in hook
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3" role="alert">
          <span className="flex-shrink-0">⚠️</span>
          <span className="flex-grow-1 small">{error}</span>
          <button type="button" className="btn-close" onClick={clearError} />
        </div>
      )}

      {/* Email */}
      <div>
        <label className="form-label small fw-medium text-secondary mb-1">
          Email Address
        </label>
        <div className="input-group">
          <span className="input-group-text bg-transparent border-end-0 text-muted">
            <Mail size={16} />
          </span>
          <input
            {...register('email')}
            type="email"
            className={`form-control border-start-0 bg-transparent ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="form-label small fw-medium text-secondary mb-1">
          Password
        </label>
        <div className="input-group">
          <span className="input-group-text bg-transparent border-end-0 text-muted">
            <Lock size={16} />
          </span>
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            className={`form-control border-start-0 border-end-0 bg-transparent ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Enter your password"
          />
          <span
            className="input-group-text bg-transparent border-start-0 text-muted cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
            role="button"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </span>
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>
      </div>

      {/* Remember & Forgot */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="form-check">
          <input
            {...register('rememberMe')}
            type="checkbox"
            className="form-check-input"
            id="remember"
          />
          <label className="form-check-label small text-secondary" htmlFor="remember">
            Remember me
          </label>
        </div>
        <Link to="/forgot-password" className="small text-decoration-none">
          Forgot password?
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2 py-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm" />
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <LogIn size={18} />
            <span>Sign In</span>
          </>
        )}
      </button>

      {/* Register Link */}
      <p className="text-center text-muted small mb-0">
        Don't have an account?{' '}
        <Link to="/register" className="text-decoration-none fw-medium">
          Create account
        </Link>
      </p>
    </form>
  );
};