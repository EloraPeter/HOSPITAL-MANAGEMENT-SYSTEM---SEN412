import type {
  DashboardData,
  DashboardStats,
  AppointmentSummary,
  RecentPatientSummary,
  DepartmentLoad,
  RevenueData,
  WeeklyPatientFlow,
} from '../model/dashboard.types';

export const dummyStats: DashboardStats = {
  totalPatients: 12847,
  todayAppointments: 48,
  activeDoctors: 32,
  revenueToday: 12450,
  patientChangePercent: 12.5,
  appointmentChangePercent: 8.3,
  doctorChangePercent: -2.1,
  revenueChangePercent: 15.7,
};

export const dummyAppointments: AppointmentSummary[] = [
  {
    id: 'APT-001',
    patientName: 'Sarah Johnson',
    doctorName: 'Dr. Michael Chen',
    time: '09:00 AM',
    type: 'Check-up',
    status: 'completed',
  },
  {
    id: 'APT-002',
    patientName: 'Robert Williams',
    doctorName: 'Dr. Emily Brown',
    time: '09:30 AM',
    type: 'Consultation',
    status: 'in-progress',
  },
  {
    id: 'APT-003',
    patientName: 'Maria Garcia',
    doctorName: 'Dr. James Wilson',
    time: '10:00 AM',
    type: 'Follow-up',
    status: 'scheduled',
  },
  {
    id: 'APT-004',
    patientName: 'David Miller',
    doctorName: 'Dr. Sarah Davis',
    time: '10:30 AM',
    type: 'Emergency',
    status: 'scheduled',
  },
  {
    id: 'APT-005',
    patientName: 'Jennifer Lee',
    doctorName: 'Dr. Michael Chen',
    time: '11:00 AM',
    type: 'Check-up',
    status: 'cancelled',
  },
];

export const dummyPatients: RecentPatientSummary[] = [
  {
    id: 'PAT-001',
    name: 'Alice Thompson',
    age: 45,
    gender: 'Female',
    reason: 'Chest Pain',
    time: '5 min ago',
    status: 'admitted',
  },
  {
    id: 'PAT-002',
    name: 'George Martinez',
    age: 62,
    gender: 'Male',
    reason: 'Diabetes Check',
    time: '15 min ago',
    status: 'observation',
  },
  {
    id: 'PAT-003',
    name: 'Patricia Brown',
    age: 28,
    gender: 'Female',
    reason: 'Pregnancy Check',
    time: '30 min ago',
    status: 'admitted',
  },
  {
    id: 'PAT-004',
    name: 'Kevin O\'Brien',
    age: 55,
    gender: 'Male',
    reason: 'Blood Pressure',
    time: '1 hour ago',
    status: 'discharged',
  },
  {
    id: 'PAT-005',
    name: 'Linda Wilson',
    age: 38,
    gender: 'Female',
    reason: 'Migraine',
    time: '2 hours ago',
    status: 'discharged',
  },
];

export const dummyDepartments: DepartmentLoad[] = [
  { department: 'Emergency', patients: 18, capacity: 25, percentage: 72 },
  { department: 'Cardiology', patients: 12, capacity: 20, percentage: 60 },
  { department: 'Pediatrics', patients: 8, capacity: 15, percentage: 53 },
  { department: 'Orthopedics', patients: 10, capacity: 18, percentage: 56 },
  { department: 'Neurology', patients: 14, capacity: 16, percentage: 88 },
  { department: 'Oncology', patients: 9, capacity: 12, percentage: 75 },
];

export const dummyRevenue: RevenueData[] = [
  { month: 'Jan', revenue: 45000, expenses: 32000 },
  { month: 'Feb', revenue: 52000, expenses: 35000 },
  { month: 'Mar', revenue: 48000, expenses: 33000 },
  { month: 'Apr', revenue: 61000, expenses: 38000 },
  { month: 'May', revenue: 55000, expenses: 36000 },
  { month: 'Jun', revenue: 67000, expenses: 40000 },
  { month: 'Jul', revenue: 72000, expenses: 42000 },
  { month: 'Aug', revenue: 58000, expenses: 37000 },
  { month: 'Sep', revenue: 63000, expenses: 39000 },
  { month: 'Oct', revenue: 78000, expenses: 43000 },
  { month: 'Nov', revenue: 82000, expenses: 45000 },
  { month: 'Dec', revenue: 95000, expenses: 48000 },
];

export const dummyWeeklyFlow: WeeklyPatientFlow[] = [
  { day: 'Mon', inPatients: 25, outPatients: 18 },
  { day: 'Tue', inPatients: 30, outPatients: 22 },
  { day: 'Wed', inPatients: 28, outPatients: 20 },
  { day: 'Thu', inPatients: 35, outPatients: 25 },
  { day: 'Fri', inPatients: 32, outPatients: 28 },
  { day: 'Sat', inPatients: 20, outPatients: 15 },
  { day: 'Sun', inPatients: 15, outPatients: 12 },
];

export const dummyDashboardData: DashboardData = {
  stats: dummyStats,
  appointments: dummyAppointments,
  patients: dummyPatients,
  departments: dummyDepartments,
  revenue: dummyRevenue,
  weeklyFlow: dummyWeeklyFlow,
};