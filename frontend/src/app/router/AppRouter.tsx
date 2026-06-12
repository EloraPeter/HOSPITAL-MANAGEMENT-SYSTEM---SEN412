import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { MainLayout } from '@/shared/ui/layout';

// Lazy loaded pages
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'));
const AppointmentListPage = lazy(() => import('@/pages/appointments/AppointmentListPage'));
const PatientListPage = lazy(() => import('@/pages/patients/PatientListPage'));
const StaffPage = lazy(() => import('@/pages/staff/StaffPage'));
const NotFoundPage = lazy(() => import('@/pages/errors/NotFoundPage'));

const PatientDetailPage = lazy(() => import('@/pages/patients/PatientDetailPage'));

// Add this route inside the MainLayout


const PageLoader = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="text-center">
      <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted">Loading page...</p>
    </div>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Protected Routes with MainLayout */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/appointments" element={<AppointmentListPage />} />
            <Route path="/patients" element={<PatientListPage />} />
            <Route path="/patients/:id" element={<PatientDetailPage />} />
            {/* Add Staff route here */}
            <Route path="/staff" element={<StaffPage />} />
          </Route>
        </Route>

        {/* Error Routes */}
        <Route path="/404" element={<NotFoundPage />} />

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};