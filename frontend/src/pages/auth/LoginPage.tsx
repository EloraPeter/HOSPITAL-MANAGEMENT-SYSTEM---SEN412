import React from 'react';
import { LoginForm } from '@/features/auth/ui/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm border-0 p-4" style={{ width: '100%', maxWidth: '480px' }}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;