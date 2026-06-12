import React from 'react';
import { Row, Col } from 'react-bootstrap';

import {
  StatsWidget,
  AppointmentList,
  RecentPatientsList,
  DepartmentLoadChart,
  RevenueChart,
  WeeklyFlowChart,
} from '@/features/dashboard/ui';
import { PageHeader } from '@/shared/ui/layout/PageHeader';
import { LoadingSpinner } from '@/shared/ui/feedback/LoadingSpinner';
import { Button } from '@/shared/ui/button';
import { useDashboard } from '@/features/dashboard/model/userDashboard';

const DashboardPage: React.FC = () => {
  const { data, isLoading, error, refresh, lastUpdated } = useDashboard();

  if (isLoading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  if (error || !data) {
    return (
      <div className="text-center py-5">
        <div className="mb-3">
          <span style={{ fontSize: '3rem' }}>⚠️</span>
        </div>
        <h5 className="text-danger">Error Loading Dashboard</h5>
        <p className="text-muted">{error || 'Something went wrong'}</p>
        <Button variant="primary" onClick={refresh}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <PageHeader
        title="Dashboard"
        subtitle={
          lastUpdated
            ? `Last updated: ${lastUpdated.toLocaleTimeString()}`
            : "Welcome back! Here's what's happening today."
        }
        actions={
          <div className="d-flex gap-2">
            <Button variant="outline-primary" size="sm" onClick={refresh}>
              Refresh
            </Button>
            <Button variant="primary" size="sm">
              Download Report
            </Button>
          </div>
        }
      />

      {/* Stats Section */}
      <StatsWidget stats={data.stats} />

      {/* Appointments & Departments */}
      <Row className="mt-4 g-3">
        <Col lg={8}>
          <AppointmentList appointments={data.todayAppointments} />
        </Col>
        <Col lg={4}>
          <DepartmentLoadChart departments={data.departmentLoads} />
        </Col>
      </Row>

      {/* Revenue & Recent Patients */}
      <Row className="mt-3 g-3">
        <Col lg={8}>
          <RevenueChart data={data.revenueData} />
        </Col>
        <Col lg={4}>
          <RecentPatientsList patients={data.recentPatients} />
        </Col>
      </Row>

      {/* Weekly Flow */}
      <div className="mt-3">
        <WeeklyFlowChart data={data.weeklyFlow} />
      </div>
    </div>
  );
};

export default DashboardPage;