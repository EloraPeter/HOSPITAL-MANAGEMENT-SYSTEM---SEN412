import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { useAuth } from '../model/useAuth';
import { forgotPasswordSchema } from '../lib/authValidators';
import type { ForgotPasswordFormData } from '../lib/authValidators';

export const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword, isLoading, error, clearError } = useAuth();
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      clearError();
      await forgotPassword(data.email);
      setIsSent(true);
    } catch {
      // Error handled in hook
    }
  };

  if (isSent) {
    return (
      <div className="text-center">
        <div className="mb-3">
          <Send size={40} className="text-success" />
        </div>
        <h5 className="fw-bold">Check Your Email</h5>
        <p className="text-muted small">
          We've sent a password reset link to your email address.
        </p>
        <Link to="/login" className="btn btn-outline-dark btn-sm mt-2">
          <ArrowLeft size={14} className="me-1" />
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3" role="alert">
          <span className="flex-shrink-0">⚠️</span>
          <span className="flex-grow-1 small">{error}</span>
          <button type="button" className="btn-close" onClick={clearError} />
        </div>
      )}

      <p className="text-muted small">
        Enter your email address and we'll send you a link to reset your password.
      </p>

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
            placeholder="Enter your email"
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2 py-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="spinner-border spinner-border-sm" />
        ) : (
          <Send size={16} />
        )}
        <span>{isLoading ? 'Sending...' : 'Send Reset Link'}</span>
      </button>

      <p className="text-center mb-0">
        <Link to="/login" className="small text-decoration-none d-inline-flex align-items-center gap-1">
          <ArrowLeft size={14} />
          Back to Login
        </Link>
      </p>
    </form>
  );
};