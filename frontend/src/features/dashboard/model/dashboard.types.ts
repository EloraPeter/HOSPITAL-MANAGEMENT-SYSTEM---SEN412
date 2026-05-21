export interface DashboardData {
  stats: DashboardStats;
  appointments: AppointmentSummary[];
  patients: RecentPatientSummary[];
  departments: DepartmentLoad[];
  revenue: RevenueData[];
  weeklyFlow: WeeklyPatientFlow[];
}

export interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  activeDoctors: number;
  revenueToday: number;
  patientChangePercent: number;
  appointmentChangePercent: number;
  doctorChangePercent: number;
  revenueChangePercent: number;
}

export interface AppointmentSummary {
  id: string;
  patientName: string;
  doctorName: string;
  time: string;
  type: string;
  status: string;
}

export interface RecentPatientSummary {
  id: string;
  name: string;
  age: number;
  gender: string;
  reason: string;
  time: string;
  status: string;
}

export interface DepartmentLoad {
  department: string;
  patients: number;
  capacity: number;
  percentage: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
}

export interface WeeklyPatientFlow {
  day: string;
  inPatients: number;
  outPatients: number;
}