import React from 'react';

import { RegisterForm } from '@/features/auth/ui/RegisterForm';
import { AuthLayout } from '../../features/auth/ui/AuthLayout';

const RegisterPage: React.FC = () => {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join our healthcare platform"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;