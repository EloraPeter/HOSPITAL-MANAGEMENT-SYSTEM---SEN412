import type { DepartmentLoad, RevenueData, WeeklyPatientFlow } from '../model/dashboard.types';

export const getDepartmentColor = (percentage: number): string => {
  if (percentage >= 80) return 'danger';
  if (percentage >= 60) return 'warning';
  return 'success';
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getTotalRevenue = (data: RevenueData[]): number => {
  return data.reduce((sum, item) => sum + item.revenue, 0);
};

export const getTotalExpenses = (data: RevenueData[]): number => {
  return data.reduce((sum, item) => sum + item.expenses, 0);
};

export const getAverageDepartmentLoad = (departments: DepartmentLoad[]): number => {
  if (departments.length === 0) return 0;
  const total = departments.reduce((sum, dept) => sum + dept.percentage, 0);
  return Math.round(total / departments.length);
};

export const getBusiestDay = (flow: WeeklyPatientFlow[]): string => {
  if (flow.length === 0) return 'N/A';
  const busiest = flow.reduce((max, day) => 
    day.inPatients > max.inPatients ? day : max
  );
  return busiest.day;
};