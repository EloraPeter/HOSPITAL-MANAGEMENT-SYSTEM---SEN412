import type { DashboardData } from './dashboard.types';
import { dummyDashboardData } from '../lib/dashboardDummyData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    // Simulate API call
    await delay(800);
    return dummyDashboardData;
  },
};