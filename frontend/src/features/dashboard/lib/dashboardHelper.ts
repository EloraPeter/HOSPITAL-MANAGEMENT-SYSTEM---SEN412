import type { DepartmentLoad, RevenueData, WeeklyPatientFlow, PendingTask } from '../model/dashboard.types';

export const getOccupancyColor = (rate: number): string => {
  if (rate >= 85) return 'danger';
  if (rate >= 65) return 'warning';
  return 'success';
};

export const getAvailabilityColor = (availability: string): string => {
  switch (availability) {
    case 'available': return 'success';
    case 'busy': return 'warning';
    case 'off-duty': return 'secondary';
    default: return 'secondary';
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high': return 'danger';
    case 'medium': return 'warning';
    case 'low': return 'info';
    default: return 'secondary';
  }
};

export const getTaskIcon = (type: PendingTask['type']): string => {
  switch (type) {
    case 'appointment_approval': return '📅';
    case 'lab_result': return '🔬';
    case 'prescription_refill': return '💊';
    case 'billing': return '💰';
    case 'discharge': return '🏥';
    default: return '📋';
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const getTotalRevenue = (data: RevenueData[]): number => {
  return data.reduce((sum, item) => sum + item.revenue, 0);
};

export const getTotalProfit = (data: RevenueData[]): number => {
  return data.reduce((sum, item) => sum + item.profit, 0);
};

export const getAverageOccupancy = (departments: DepartmentLoad[]): number => {
  if (departments.length === 0) return 0;
  const total = departments.reduce((sum, dept) => sum + dept.occupancyRate, 0);
  return Math.round(total / departments.length);
};

export const getTotalAdmissions = (flow: WeeklyPatientFlow[]): number => {
  return flow.reduce((sum, day) => sum + day.admissions, 0);
};