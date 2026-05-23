import React from 'react';

import {
  StatsWidget,
  AppointmentList,
  RecentPatientsList,
  DepartmentLoadChart,
  RevenueChart,
} from '@/features/dashboard/ui';
import { PageHeader } from '@/shared/ui/layout/PageHeader';
import { LoadingSpinner } from '@/shared/ui/feedback/LoadingSpinner';
import { useDashboard } from '@/features/dashboard/model/userDashboard';

const DashboardPage: React.FC = () => {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  if (error || !data) {
    return (
      <div className="text-center py-5">
        <h5 className="text-danger">Error loading dashboard</h5>
        <p className="text-muted">{error || 'Something went wrong'}</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening today."
        actions={
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary btn-sm">
              Download Report
            </button>
            <button className="btn btn-primary btn-sm">
              New Appointment
            </button>
          </div>
        }
      />

      {/* Stats Section */}
      <StatsWidget stats={data.stats} />

      {/* Appointments & Departments */}
      <div className="row mt-4">
        <div className="col-lg-8 mb-4">
          <AppointmentList appointments={data.appointments} />
        </div>
        <div className="col-lg-4 mb-4">
          <DepartmentLoadChart departments={data.departments} />
        </div>
      </div>

      {/* Revenue & Recent Patients */}
      <div className="row">
        <div className="col-lg-8 mb-4">
          <RevenueChart data={data.revenue} />
        </div>
        <div className="col-lg-4 mb-4">
          <RecentPatientsList patients={data.patients} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;