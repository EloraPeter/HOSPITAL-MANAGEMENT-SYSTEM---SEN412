import React from 'react';

import { LoginForm } from '@/features/auth/ui/LoginForm';
import { AuthLayout } from '../../features/auth/ui/AuthLayout';

const LoginPage: React.FC = () => {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;