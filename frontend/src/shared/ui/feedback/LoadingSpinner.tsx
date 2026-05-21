import React from 'react';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'sm' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  text = 'Loading...', 
  size = 'lg' 
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="text-center">
        <div
          className={`spinner-border text-primary mb-3 ${size === 'sm' ? 'spinner-border-sm' : ''}`}
          role="status"
          style={size === 'lg' ? { width: '3rem', height: '3rem' } : undefined}
        >
          <span className="visually-hidden">{text}</span>
        </div>
        <p className="text-muted">{text}</p>
      </div>
    </div>
  );
};