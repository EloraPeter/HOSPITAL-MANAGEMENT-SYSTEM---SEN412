import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, Mail, Lock, Phone, User, Calendar, Droplet } from 'lucide-react';
import { useAuth } from '../model/useAuth';
import { registerSchema } from '../lib/authValidators';
import { USER_ROLES, SPECIALTIES, DEPARTMENTS, BLOOD_GROUPS } from '@/entities';
import type { RegisterFormData } from '../lib/authValidators';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'patient',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      clearError();
      await registerUser(data);
      navigate('/dashboard', { replace: true });
    } catch {
      // Error handled in hook
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3" role="alert">
          <span className="flex-shrink-0">⚠️</span>
          <span className="flex-grow-1 small">{error}</span>
          <button type="button" className="btn-close" onClick={clearError} />
        </div>
      )}

      {/* Name Fields */}
      <div className="row g-2">
        <div className="col-6">
          <label className="form-label small fw-medium text-secondary mb-1">First Name</label>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-transparent border-end-0 text-muted">
              <User size={14} />
            </span>
            <input
              {...register('first_name')}
              className={`form-control border-start-0 bg-transparent ${errors.first_name ? 'is-invalid' : ''}`}
              placeholder="John"
            />
            {errors.first_name && <div className="invalid-feedback">{errors.first_name.message}</div>}
          </div>
        </div>
        <div className="col-6">
          <label className="form-label small fw-medium text-secondary mb-1">Last Name</label>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-transparent border-end-0 text-muted">
              <User size={14} />
            </span>
            <input
              {...register('last_name')}
              className={`form-control border-start-0 bg-transparent ${errors.last_name ? 'is-invalid' : ''}`}
              placeholder="Doe"
            />
            {errors.last_name && <div className="invalid-feedback">{errors.last_name.message}</div>}
          </div>
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="form-label small fw-medium text-secondary mb-1">Email</label>
        <div className="input-group input-group-sm">
          <span className="input-group-text bg-transparent border-end-0 text-muted">
            <Mail size={14} />
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
        <div className="input-group input-group-sm">
          <span className="input-group-text bg-transparent border-end-0 text-muted">
            <Phone size={14} />
          </span>
          <input
            {...register('phone')}
            type="tel"
            className={`form-control border-start-0 bg-transparent ${errors.phone ? 'is-invalid' : ''}`}
            placeholder="(555) 000-0000"
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
        </div>
      </div>

      {/* Date of Birth & Gender */}
      <div className="row g-2">
        <div className="col-6">
          <label className="form-label small fw-medium text-secondary mb-1">Date of Birth</label>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-transparent border-end-0 text-muted">
              <Calendar size={14} />
            </span>
            <input
              {...register('date_of_birth')}
              type="date"
              className={`form-control border-start-0 bg-transparent ${errors.date_of_birth ? 'is-invalid' : ''}`}
            />
            {errors.date_of_birth && <div className="invalid-feedback">{errors.date_of_birth.message}</div>}
          </div>
        </div>
        <div className="col-6">
          <label className="form-label small fw-medium text-secondary mb-1">Blood Group</label>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-transparent border-end-0 text-muted">
              <Droplet size={14} />
            </span>
            <select
              {...register('blood_group')}
              className={`form-select border-start-0 bg-transparent ${errors.blood_group ? 'is-invalid' : ''}`}
            >
              <option value="">Select</option>
              {BLOOD_GROUPS.map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Role */}
      <div>
        <label className="form-label small fw-medium text-secondary mb-1">Role</label>
        <select
          {...register('role')}
          className={`form-select form-select-sm bg-transparent ${errors.role ? 'is-invalid' : ''}`}
        >
          {Object.entries(USER_ROLES).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
      </div>

      {/* Doctor-specific fields */}
      {selectedRole === 'doctor' && (
        <>
          <div className="row g-2">
            <div className="col-6">
              <label className="form-label small fw-medium text-secondary mb-1">Specialty</label>
              <select
                {...register('specialty')}
                className={`form-select form-select-sm bg-transparent ${errors.specialty ? 'is-invalid' : ''}`}
              >
                <option value="">Select</option>
                {SPECIALTIES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label className="form-label small fw-medium text-secondary mb-1">Department</label>
              <select
                {...register('department')}
                className={`form-select form-select-sm bg-transparent ${errors.department ? 'is-invalid' : ''}`}
              >
                <option value="">Select</option>
                {DEPARTMENTS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="form-label small fw-medium text-secondary mb-1">License Number</label>
            <input
              {...register('license_number')}
              className={`form-control form-control-sm bg-transparent ${errors.license_number ? 'is-invalid' : ''}`}
              placeholder="MED-12345"
            />
            {errors.license_number && <div className="invalid-feedback">{errors.license_number.message}</div>}
          </div>
        </>
      )}

      {/* Password */}
      <div>
        <label className="form-label small fw-medium text-secondary mb-1">Password</label>
        <div className="input-group input-group-sm">
          <span className="input-group-text bg-transparent border-end-0 text-muted">
            <Lock size={14} />
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
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </span>
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="form-label small fw-medium text-secondary mb-1">Confirm Password</label>
        <div className="input-group input-group-sm">
          <span className="input-group-text bg-transparent border-end-0 text-muted">
            <Lock size={14} />
          </span>
          <input
            {...register('confirm_password')}
            type={showConfirm ? 'text' : 'password'}
            className={`form-control border-start-0 border-end-0 bg-transparent ${errors.confirm_password ? 'is-invalid' : ''}`}
            placeholder="Confirm password"
          />
          <span
            className="input-group-text bg-transparent border-start-0 text-muted cursor-pointer"
            onClick={() => setShowConfirm(!showConfirm)}
            role="button"
          >
            {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
          </span>
          {errors.confirm_password && <div className="invalid-feedback">{errors.confirm_password.message}</div>}
        </div>
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
            <span>Creating Account...</span>
          </>
        ) : (
          <>
            <UserPlus size={18} />
            <span>Create Account</span>
          </>
        )}
      </button>

      {/* Login Link */}
      <p className="text-center text-muted small mb-0">
        Already have an account?{' '}
        <Link to="/login" className="text-decoration-none fw-medium">
          Sign in
        </Link>
      </p>
    </form>
  );
};