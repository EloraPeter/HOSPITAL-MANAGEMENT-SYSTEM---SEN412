// TODO: Replace with proper 404 page design
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/app/router';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-primary">404</h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="text-muted mb-4">The page you're looking for doesn't exist.</p>
        <Link to={ROUTES.PROTECTED.DASHBOARD} className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;