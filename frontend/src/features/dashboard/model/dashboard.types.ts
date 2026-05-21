import type { PatientWithUser } from '@/entities/patient/model/patient.types';
import type { Doctor } from '@/entities/doctor/model/doctor.types';
import type { AppointmentWithDetails } from '@/entities/appointment/model/appointment.types';
import type { Billing } from '@/entities/billing/model/billing.types';

export interface DashboardData {
  stats: DashboardStats;
  todayAppointments: AppointmentWithDetails[];
  recentPatients: PatientWithUser[];
  availableDoctors: DoctorSummary[];
  departmentLoads: DepartmentLoad[];
  revenueData: RevenueData[];
  weeklyFlow: WeeklyPatientFlow[];
  pendingTasks: PendingTask[];
}

export interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  activeDoctors: number;
  revenueToday: number;
  pendingAppointments: number;
  completedConsultations: number;
  labResultsReady: number;
  prescriptionsIssued: number;
  patientChangePercent: number;
  appointmentChangePercent: number;
  revenueChangePercent: number;
}

export interface DoctorSummary {
  id: string;
  name: string;
  specialty: string;
  department: string;
  availability: 'available' | 'busy' | 'off-duty';
  nextAvailable?: string;
}

export interface DepartmentLoad {
  department: string;
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  occupancyRate: number;
  patientsCount: number;
  doctorsCount: number;
  nursesCount: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  patientCount: number;
}

export interface WeeklyPatientFlow {
  day: string;
  admissions: number;
  discharges: number;
  consultations: number;
  emergencies: number;
}

export interface PendingTask {
  id: string;
  type: 'appointment_approval' | 'lab_result' | 'prescription_refill' | 'billing' | 'discharge';
  title: string;
  description: string;
  patientName: string;
  priority: 'high' | 'medium' | 'low';
  timeAgo: string;
}