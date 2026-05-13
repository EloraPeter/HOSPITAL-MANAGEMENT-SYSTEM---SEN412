import React from 'react';
import { RegisterForm } from '@/features/auth/ui/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm border-0 p-4" style={{ width: '100%', maxWidth: '530px' }}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;