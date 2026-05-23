import React from 'react';
import { People, CalendarCheck, PersonBadge, CashStack } from 'react-bootstrap-icons';
import { StatCard } from '@/shared/ui/data-display/StatCard';
import type { DashboardStats } from '../model/dashboard.types';

interface StatsWidgetProps {
  stats: DashboardStats;
}

export const StatsWidget: React.FC<StatsWidgetProps> = ({ stats }) => {
  const statItems = [
    {
      title: 'Total Patients',
      value: stats.totalPatients.toLocaleString(),
      change: stats.patientChangePercent,
      icon: <People size={22} />,
      color: 'primary' as const,
    },
    {
      title: 'Appointments Today',
      value: stats.todayAppointments,
      change: stats.appointmentChangePercent,
      icon: <CalendarCheck size={22} />,
      color: 'success' as const,
    },
    {
      title: 'Active Doctors',
      value: stats.activeDoctors,
      change: stats.doctorChangePercent,
      icon: <PersonBadge size={22} />,
      color: 'info' as const,
    },
    {
      title: 'Revenue Today',
      value: `$${stats.revenueToday.toLocaleString()}`,
      change: stats.revenueChangePercent,
      icon: <CashStack size={22} />,
      color: 'warning' as const,
    },
  ];

  return (
    <div className="row">
      {statItems.map((item, index) => (
        <div key={index} className="col-md-6 col-lg-3 mb-3">
          <StatCard
            title={item.title}
            value={item.value}
            change={item.change}
            icon={item.icon}
            color={item.color}
          />
        </div>
      ))}
    </div>
  );
};