import type {
  DashboardData,
  DashboardStats,
  DoctorSummary,
  DepartmentLoad,
  RevenueData,
  WeeklyPatientFlow,
  PendingTask,
} from '../model/dashboard.types';
import type { PatientWithUser } from '@/entities/patient/model/patient.types';
import type { AppointmentWithDetails } from '@/entities/appointment/model/appointment.types';
import type { BloodGroup } from '@/entities/patient/model/patient.types';

// ============================================
// Dashboard Stats
// ============================================
export const dummyStats: DashboardStats = {
  totalPatients: 12847,
  todayAppointments: 48,
  activeDoctors: 32,
  revenueToday: 12450,
  pendingAppointments: 5,
  completedConsultations: 23,
  labResultsReady: 7,
  prescriptionsIssued: 18,
  patientChangePercent: 12.5,
  appointmentChangePercent: 8.3,
  revenueChangePercent: 15.7,
};

// ============================================
// Today's Appointments
// ============================================
export const dummyAppointments: AppointmentWithDetails[] = [
  {
    id: 'APT-001',
    patient_id: 'PAT-001',
    doctor_id: 'DOC-001',
    appointment_date: '2026-05-21',
    time_slot: '09:00',
    duration_minutes: 30,
    type: 'Check-up',
    status: 'completed',
    reason: 'Annual physical examination',
    notes: 'Patient reports mild headaches',
    created_at: '2026-05-20T10:00:00Z',
    updated_at: '2026-05-21T09:30:00Z',
    patient: {
      user: {
        first_name: 'Sarah',
        last_name: 'Johnson',
        email: 'sarah.j@email.com',
        phone: '(555) 123-4567',
      },
      blood_group: 'O+' as BloodGroup,
    },
    doctor: {
      user: {
        first_name: 'Michael',
        last_name: 'Chen',
      },
      specialty: 'Internal Medicine',
      department: 'Outpatient',
    },
  },
  {
    id: 'APT-002',
    patient_id: 'PAT-002',
    doctor_id: 'DOC-002',
    appointment_date: '2026-05-21',
    time_slot: '09:30',
    duration_minutes: 30,
    type: 'Consultation',
    status: 'in-progress',
    reason: 'Persistent cough and fever',
    notes: undefined,
    created_at: '2026-05-19T14:00:00Z',
    updated_at: '2026-05-21T09:30:00Z',
    patient: {
      user: {
        first_name: 'Robert',
        last_name: 'Williams',
        email: 'robert.w@email.com',
        phone: '(555) 234-5678',
      },
      blood_group: 'A-' as BloodGroup,
    },
    doctor: {
      user: {
        first_name: 'Emily',
        last_name: 'Brown',
      },
      specialty: 'Pulmonology',
      department: 'Cardiology',
    },
  },
  {
    id: 'APT-003',
    patient_id: 'PAT-003',
    doctor_id: 'DOC-003',
    appointment_date: '2026-05-21',
    time_slot: '10:00',
    duration_minutes: 45,
    type: 'Follow-up',
    status: 'confirmed',
    reason: 'Post-surgery follow-up',
    notes: 'Bring X-ray reports',
    created_at: '2026-05-18T09:00:00Z',
    updated_at: '2026-05-20T16:00:00Z',
    patient: {
      user: {
        first_name: 'Maria',
        last_name: 'Garcia',
        email: 'maria.g@email.com',
        phone: '(555) 345-6789',
      },
      blood_group: 'B+' as BloodGroup,
    },
    doctor: {
      user: {
        first_name: 'James',
        last_name: 'Wilson',
      },
      specialty: 'Orthopedics',
      department: 'Orthopedics',
    },
  },
  {
    id: 'APT-004',
    patient_id: 'PAT-004',
    doctor_id: 'DOC-001',
    appointment_date: '2026-05-21',
    time_slot: '10:30',
    duration_minutes: 30,
    type: 'Emergency',
    status: 'pending',
    reason: 'Severe abdominal pain',
    notes: undefined,
    created_at: '2026-05-21T08:00:00Z',
    updated_at: '2026-05-21T08:00:00Z',
    patient: {
      user: {
        first_name: 'David',
        last_name: 'Miller',
        email: 'david.m@email.com',
        phone: '(555) 456-7890',
      },
      blood_group: 'AB-' as BloodGroup,
    },
    doctor: {
      user: {
        first_name: 'Michael',
        last_name: 'Chen',
      },
      specialty: 'Internal Medicine',
      department: 'Outpatient',
    },
  },
  {
    id: 'APT-005',
    patient_id: 'PAT-005',
    doctor_id: 'DOC-002',
    appointment_date: '2026-05-21',
    time_slot: '11:00',
    duration_minutes: 30,
    type: 'Check-up',
    status: 'cancelled',
    reason: 'Routine checkup',
    notes: 'Patient cancelled due to conflict',
    created_at: '2026-05-15T11:00:00Z',
    updated_at: '2026-05-20T09:00:00Z',
    patient: {
      user: {
        first_name: 'Jennifer',
        last_name: 'Lee',
        email: 'jennifer.l@email.com',
        phone: '(555) 567-8901',
      },
      blood_group: 'A+' as BloodGroup,
    },
    doctor: {
      user: {
        first_name: 'Emily',
        last_name: 'Brown',
      },
      specialty: 'Pulmonology',
      department: 'Cardiology',
    },
  },
];

// ============================================
// Recent Patients
// ============================================
export const dummyPatients: PatientWithUser[] = [
  {
    id: 'PAT-001',
    user_id: 'USR-001',
    date_of_birth: '1981-03-15',
    blood_group: 'O+' as BloodGroup,
    gender: 'female',
    height_cm: 165,
    weight_kg: 68,
    emergency_contact_name: 'Tom Johnson',
    emergency_contact_phone: '(555) 111-2222',
    emergency_contact_relationship: 'Spouse',
    medical_conditions: ['Hypertension'],
    allergies: ['Penicillin'],
    created_at: '2025-01-10T08:00:00Z',
    updated_at: '2026-05-21T09:00:00Z',
    user: {
      first_name: 'Alice',
      last_name: 'Thompson',
      email: 'alice.t@email.com',
      phone: '(555) 123-4567',
    },
  },
  {
    id: 'PAT-002',
    user_id: 'USR-002',
    date_of_birth: '1964-07-22',
    blood_group: 'B-' as BloodGroup,
    gender: 'male',
    height_cm: 178,
    weight_kg: 85,
    emergency_contact_name: 'Maria Martinez',
    emergency_contact_phone: '(555) 222-3333',
    emergency_contact_relationship: 'Daughter',
    medical_conditions: ['Type 2 Diabetes', 'High Cholesterol'],
    allergies: [],
    created_at: '2025-02-15T10:00:00Z',
    updated_at: '2026-05-21T08:30:00Z',
    user: {
      first_name: 'George',
      last_name: 'Martinez',
      email: 'george.m@email.com',
      phone: '(555) 234-5678',
    },
  },
  {
    id: 'PAT-003',
    user_id: 'USR-003',
    date_of_birth: '1998-11-05',
    blood_group: 'A+' as BloodGroup,
    gender: 'female',
    height_cm: 160,
    weight_kg: 62,
    emergency_contact_name: 'Robert Brown',
    emergency_contact_phone: '(555) 333-4444',
    emergency_contact_relationship: 'Spouse',
    medical_conditions: [],
    allergies: ['Sulfa drugs'],
    created_at: '2026-01-20T09:00:00Z',
    updated_at: '2026-05-21T09:15:00Z',
    user: {
      first_name: 'Patricia',
      last_name: 'Brown',
      email: 'patricia.b@email.com',
      phone: '(555) 345-6789',
    },
  },
  {
    id: 'PAT-004',
    user_id: 'USR-004',
    date_of_birth: '1971-09-30',
    blood_group: 'AB+' as BloodGroup,
    gender: 'male',
    height_cm: 182,
    weight_kg: 92,
    emergency_contact_name: 'Linda O\'Brien',
    emergency_contact_phone: '(555) 444-5555',
    emergency_contact_relationship: 'Spouse',
    medical_conditions: ['Hypertension', 'Arthritis'],
    allergies: [],
    created_at: '2025-06-10T11:00:00Z',
    updated_at: '2026-05-21T07:45:00Z',
    user: {
      first_name: 'Kevin',
      last_name: 'O\'Brien',
      email: 'kevin.o@email.com',
      phone: '(555) 456-7890',
    },
  },
  {
    id: 'PAT-005',
    user_id: 'USR-005',
    date_of_birth: '1988-04-18',
    blood_group: 'O-' as BloodGroup,
    gender: 'female',
    height_cm: 168,
    weight_kg: 60,
    emergency_contact_name: 'David Wilson',
    emergency_contact_phone: '(555) 555-6666',
    emergency_contact_relationship: 'Brother',
    medical_conditions: ['Migraine'],
    allergies: ['Latex'],
    created_at: '2025-09-05T13:00:00Z',
    updated_at: '2026-05-20T16:00:00Z',
    user: {
      first_name: 'Linda',
      last_name: 'Wilson',
      email: 'linda.w@email.com',
      phone: '(555) 567-8901',
    },
  },
];

// ============================================
// Available Doctors
// ============================================
export const dummyDoctors: DoctorSummary[] = [
  {
    id: 'DOC-001',
    name: 'Dr. Michael Chen',
    specialty: 'Internal Medicine',
    department: 'Outpatient',
    availability: 'busy',
    nextAvailable: '2:00 PM',
  },
  {
    id: 'DOC-002',
    name: 'Dr. Emily Brown',
    specialty: 'Pulmonology',
    department: 'Cardiology',
    availability: 'available',
  },
  {
    id: 'DOC-003',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    department: 'Orthopedics',
    availability: 'available',
  },
  {
    id: 'DOC-004',
    name: 'Dr. Sarah Davis',
    specialty: 'Neurology',
    department: 'Neurology',
    availability: 'off-duty',
  },
  {
    id: 'DOC-005',
    name: 'Dr. Robert Kim',
    specialty: 'Pediatrics',
    department: 'Pediatrics',
    availability: 'available',
  },
];

// ============================================
// Department Loads
// ============================================
export const dummyDepartments: DepartmentLoad[] = [
  {
    department: 'Emergency',
    totalBeds: 25,
    occupiedBeds: 18,
    availableBeds: 7,
    occupancyRate: 72,
    patientsCount: 18,
    doctorsCount: 6,
    nursesCount: 12,
  },
  {
    department: 'Cardiology',
    totalBeds: 20,
    occupiedBeds: 12,
    availableBeds: 8,
    occupancyRate: 60,
    patientsCount: 12,
    doctorsCount: 5,
    nursesCount: 8,
  },
  {
    department: 'Pediatrics',
    totalBeds: 15,
    occupiedBeds: 8,
    availableBeds: 7,
    occupancyRate: 53,
    patientsCount: 8,
    doctorsCount: 4,
    nursesCount: 6,
  },
  {
    department: 'Orthopedics',
    totalBeds: 18,
    occupiedBeds: 10,
    availableBeds: 8,
    occupancyRate: 56,
    patientsCount: 10,
    doctorsCount: 3,
    nursesCount: 7,
  },
  {
    department: 'Neurology',
    totalBeds: 16,
    occupiedBeds: 14,
    availableBeds: 2,
    occupancyRate: 88,
    patientsCount: 14,
    doctorsCount: 4,
    nursesCount: 8,
  },
  {
    department: 'Oncology',
    totalBeds: 12,
    occupiedBeds: 9,
    availableBeds: 3,
    occupancyRate: 75,
    patientsCount: 9,
    doctorsCount: 3,
    nursesCount: 6,
  },
];

// ============================================
// Revenue Data
// ============================================
export const dummyRevenue: RevenueData[] = [
  { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000, patientCount: 850 },
  { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000, patientCount: 920 },
  { month: 'Mar', revenue: 48000, expenses: 33000, profit: 15000, patientCount: 880 },
  { month: 'Apr', revenue: 61000, expenses: 38000, profit: 23000, patientCount: 1050 },
  { month: 'May', revenue: 55000, expenses: 36000, profit: 19000, patientCount: 980 },
  { month: 'Jun', revenue: 67000, expenses: 40000, profit: 27000, patientCount: 1150 },
  { month: 'Jul', revenue: 72000, expenses: 42000, profit: 30000, patientCount: 1200 },
  { month: 'Aug', revenue: 58000, expenses: 37000, profit: 21000, patientCount: 1000 },
  { month: 'Sep', revenue: 63000, expenses: 39000, profit: 24000, patientCount: 1080 },
  { month: 'Oct', revenue: 78000, expenses: 43000, profit: 35000, patientCount: 1300 },
  { month: 'Nov', revenue: 82000, expenses: 45000, profit: 37000, patientCount: 1350 },
  { month: 'Dec', revenue: 95000, expenses: 48000, profit: 47000, patientCount: 1500 },
];

// ============================================
// Weekly Patient Flow
// ============================================
export const dummyWeeklyFlow: WeeklyPatientFlow[] = [
  { day: 'Mon', admissions: 25, discharges: 18, consultations: 45, emergencies: 8 },
  { day: 'Tue', admissions: 30, discharges: 22, consultations: 52, emergencies: 10 },
  { day: 'Wed', admissions: 28, discharges: 20, consultations: 48, emergencies: 7 },
  { day: 'Thu', admissions: 35, discharges: 25, consultations: 55, emergencies: 12 },
  { day: 'Fri', admissions: 32, discharges: 28, consultations: 50, emergencies: 9 },
  { day: 'Sat', admissions: 20, discharges: 15, consultations: 30, emergencies: 5 },
  { day: 'Sun', admissions: 15, discharges: 12, consultations: 25, emergencies: 3 },
];

// ============================================
// Pending Tasks
// ============================================
export const dummyPendingTasks: PendingTask[] = [
  {
    id: 'TASK-001',
    type: 'appointment_approval',
    title: 'Appointment Request',
    description: 'New appointment request from David Miller',
    patientName: 'David Miller',
    priority: 'high',
    timeAgo: '5 min ago',
  },
  {
    id: 'TASK-002',
    type: 'lab_result',
    title: 'Lab Results Ready',
    description: 'Blood work results for Alice Thompson',
    patientName: 'Alice Thompson',
    priority: 'medium',
    timeAgo: '15 min ago',
  },
  {
    id: 'TASK-003',
    type: 'prescription_refill',
    title: 'Prescription Refill Request',
    description: 'Refill request for Lisinopril',
    patientName: 'George Martinez',
    priority: 'medium',
    timeAgo: '30 min ago',
  },
  {
    id: 'TASK-004',
    type: 'billing',
    title: 'Insurance Verification',
    description: 'Verify insurance coverage for procedure',
    patientName: 'Patricia Brown',
    priority: 'low',
    timeAgo: '1 hour ago',
  },
  {
    id: 'TASK-005',
    type: 'discharge',
    title: 'Discharge Summary',
    description: 'Complete discharge summary for surgery patient',
    patientName: 'Kevin O\'Brien',
    priority: 'high',
    timeAgo: '2 hours ago',
  },
];

// ============================================
// Complete Dashboard Data
// ============================================
export const dummyDashboardData: DashboardData = {
  stats: dummyStats,
  todayAppointments: dummyAppointments,
  recentPatients: dummyPatients,
  availableDoctors: dummyDoctors,
  departmentLoads: dummyDepartments,
  revenueData: dummyRevenue,
  weeklyFlow: dummyWeeklyFlow,
  pendingTasks: dummyPendingTasks,
};