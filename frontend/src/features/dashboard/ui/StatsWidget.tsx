import React from 'react';
import { 
  People, 
  CalendarCheck, 
  PersonBadge, 
  CashStack,
} from 'react-bootstrap-icons';
import { StatCard } from '@/shared/ui/data-display/StatCard';
import type { DashboardStats } from '../model/dashboard.types';
import { formatCurrency, formatNumber } from '../lib/dashboardHelper';


interface StatsWidgetProps {
  stats: DashboardStats;
}

export const StatsWidget: React.FC<StatsWidgetProps> = ({ stats }) => {
  const statItems = [
    {
      title: 'Total Patients',
      value: formatNumber(stats.totalPatients),
      change: stats.patientChangePercent,
      icon: <People size={22} />,
      color: 'primary' as const,
      subtitle: 'Registered patients',
    },
    {
      title: 'Today\'s Appointments',
      value: stats.todayAppointments,
      change: stats.appointmentChangePercent,
      icon: <CalendarCheck size={22} />,
      color: 'success' as const,
      subtitle: `${stats.pendingAppointments} pending`,
    },
    {
      title: 'Active Doctors',
      value: stats.activeDoctors,
      icon: <PersonBadge size={22} />,
      color: 'info' as const,
      subtitle: 'Currently on duty',
    },
    {
      title: 'Revenue Today',
      value: formatCurrency(stats.revenueToday),
      change: stats.revenueChangePercent,
      icon: <CashStack size={22} />,
      color: 'warning' as const,
      subtitle: 'Total billing',
    },
  ];

  return (
    <div className="row g-3">
      {statItems.map((item, index) => (
        <div key={index} className="col-sm-6 col-xl-3">
          <StatCard {...item} />
        </div>
      ))}
    </div>
  );
};