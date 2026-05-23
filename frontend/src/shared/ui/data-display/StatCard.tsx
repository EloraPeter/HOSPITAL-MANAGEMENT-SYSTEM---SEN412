import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  color?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
  subtitle?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  color = 'primary',
  subtitle,
}) => {
  const isPositive = change !== undefined ? change >= 0 : true;

  const colorClasses = {
    primary: { bg: 'bg-primary', text: 'text-primary', light: 'bg-primary bg-opacity-10' },
    success: { bg: 'bg-success', text: 'text-success', light: 'bg-success bg-opacity-10' },
    danger: { bg: 'bg-danger', text: 'text-danger', light: 'bg-danger bg-opacity-10' },
    warning: { bg: 'bg-warning', text: 'text-warning', light: 'bg-warning bg-opacity-10' },
    info: { bg: 'bg-info', text: 'text-info', light: 'bg-info bg-opacity-10' },
  };

  const c = colorClasses[color];

  return (
    <div className="card border-0 shadow-sm h-100 hover-lift">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="flex-grow-1">
            <p className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>
              {title}
            </p>
            <h3 className="mb-0 fw-bold">{value}</h3>
            {subtitle && (
              <small className="text-muted">{subtitle}</small>
            )}
          </div>
          {icon && (
            <div
              className={`${c.light} rounded-3 d-flex align-items-center justify-content-center flex-shrink-0`}
              style={{ width: '48px', height: '48px' }}
            >
              <span className={c.text}>{icon}</span>
            </div>
          )}
        </div>
        {change !== undefined && (
          <div className="d-flex align-items-center gap-1">
            {isPositive ? (
              <ArrowUp size={14} className="text-success" />
            ) : (
              <ArrowDown size={14} className="text-danger" />
            )}
            <small className={isPositive ? 'text-success fw-medium' : 'text-danger fw-medium'}>
              {Math.abs(change)}%
            </small>
            <small className="text-muted">vs last month</small>
          </div>
        )}
      </div>
    </div>
  );
};