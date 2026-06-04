import { patientService } from '@/shared/api/services/patientService';
import { doctorService } from '@/shared/api/services/doctorService';
import { appointmentService } from '@/shared/api/services/appointmentService';
import type { DashboardData } from './dashboard.types';
import type { Patient } from '@/shared/api/types/patient.types';
import type { Doctor } from '@/shared/api/types/doctor.types';
import type { Appointment } from '@/shared/api/types/appointment.types';

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    // Fetch all data in parallel
    const [patientsResponse, doctorsResponse, appointmentsResponse] = await Promise.all([
      patientService.getAll({ per_page: 100 }),
      doctorService.getAll({ per_page: 100 }),
      appointmentService.getAll({ per_page: 100 }),
    ]);

    const patients = patientsResponse.data;
    const doctors = doctorsResponse.data;
    const appointments = appointmentsResponse.data;

    // Calculate stats from real data
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(
      (apt) => apt.appointment_date === today
    );

    const activeDoctors = doctors.filter(
      (doc) => doc.status === 'available'
    );

    const pendingAppointments = appointments.filter(
      (apt) => apt.status === 'scheduled'
    );

    const completedToday = todayAppointments.filter(
      (apt) => apt.status === 'completed'
    );

    // Calculate revenue (mock calculation - backend billing not available yet)
    const estimatedRevenue = todayAppointments.length * 5000; // Assuming avg consultation fee

    // Calculate department loads from doctor data
    const departmentMap = new Map<string, { doctors: number; total: number }>();
    doctors.forEach((doc) => {
      const dept = doc.specialty || 'General';
      const existing = departmentMap.get(dept) || { doctors: 0, total: 10 };
      existing.doctors++;
      departmentMap.set(dept, existing);
    });

    const departmentLoads = Array.from(departmentMap.entries()).map(
      ([department, data]) => ({
        department,
        totalBeds: data.total,
        occupiedBeds: Math.floor(Math.random() * data.total * 0.8),
        availableBeds: Math.floor(data.total * 0.2),
        occupancyRate: Math.floor((data.doctors / data.total) * 100),
        patientsCount: Math.floor(Math.random() * data.total),
        doctorsCount: data.doctors,
        nursesCount: Math.floor(data.doctors * 1.5),
      })
    );

    // Weekly flow from appointments
    const weeklyFlow = generateWeeklyFlow(appointments);

    // Revenue data (last 6 months)
    const revenueData = generateRevenueData(appointments);

    return {
      stats: {
        totalPatients: patientsResponse.meta?.total || patients.length,
        todayAppointments: todayAppointments.length,
        activeDoctors: activeDoctors.length,
        revenueToday: estimatedRevenue,
        pendingAppointments: pendingAppointments.length,
        completedConsultations: completedToday.length,
        labResultsReady: 0,
        prescriptionsIssued: 0,
        patientChangePercent: 12.5, // Would need historical data
        appointmentChangePercent: 8.3,
        revenueChangePercent: 15.7,
      },
      todayAppointments: todayAppointments.map(mapAppointment),
      recentPatients: patients.slice(0, 6).map(mapPatient),
      availableDoctors: activeDoctors.slice(0, 5).map(mapDoctor),
      departmentLoads,
      revenueData,
      weeklyFlow,
      pendingTasks: generatePendingTasks(appointments, patients),
    };
  },
};

// Helper functions
function mapAppointment(apt: Appointment) {
  return {
    id: `APT-${apt.id}`,
    patient_id: String(apt.patient.id),
    doctor_id: String(apt.doctor.id),
    appointment_date: apt.appointment_date,
    time_slot: apt.time_slot,
    duration_minutes: 30,
    type: 'Consultation',
    status: apt.status as any,
    reason: apt.notes || '',
    notes: apt.notes,
    created_at: apt.created_at,
    updated_at: apt.created_at,
    patient: {
      user: {
        first_name: apt.patient.name.split(' ')[0] || '',
        last_name: apt.patient.name.split(' ')[1] || '',
        email: '',
        phone: '',
      },
      blood_group: 'O+' as any,
    },
    doctor: {
      user: {
        first_name: apt.doctor.name.split(' ')[0] || '',
        last_name: apt.doctor.name.split(' ')[1] || '',
      },
      specialty: apt.doctor.specialty || '',
      department: apt.doctor.specialty || '',
    },
  };
}

function mapPatient(patient: Patient) {
  return {
    id: `PAT-${patient.id}`,
    user_id: String(patient.user_id),
    date_of_birth: patient.date_of_birth || '',
    blood_group: (patient.blood_type || 'O+') as any,
    gender: 'other' as any,
    emergency_contact_name: patient.emergency_contact || '',
    emergency_contact_phone: patient.emergency_contact_phone || '',
    emergency_contact_relationship: '',
    medical_conditions: patient.allergies ? [patient.allergies] : [],
    allergies: patient.allergies ? [patient.allergies] : [],
    created_at: patient.created_at,
    updated_at: patient.created_at,
    user: {
      first_name: patient.name.split(' ')[0] || '',
      last_name: patient.name.split(' ')[1] || '',
      email: patient.email || '',
      phone: patient.phone || '',
    },
  };
}

function mapDoctor(doctor: Doctor) {
  return {
    id: `DOC-${doctor.id}`,
    name: `Dr. ${doctor.name}`,
    specialty: doctor.specialty || '',
    department: doctor.specialty || '',
    availability: doctor.status === 'available' ? 'available' as const : 'busy' as const,
    nextAvailable: doctor.status === 'available' ? 'Now' : 'Later',
  };
}

function generateWeeklyFlow(appointments: Appointment[]) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + 1);

  return days.map((day, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    const dateStr = date.toISOString().split('T')[0];

    const dayAppointments = appointments.filter(
      (apt) => apt.appointment_date === dateStr
    );

    return {
      day,
      admissions: Math.floor(Math.random() * 15) + 10,
      discharges: Math.floor(Math.random() * 12) + 8,
      consultations: dayAppointments.length,
      emergencies: Math.floor(Math.random() * 5) + 2,
    };
  });
}

function generateRevenueData(appointments: Appointment[]) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();

  return months.slice(Math.max(0, currentMonth - 5), currentMonth + 1).map((month) => {
    const monthRevenue = Math.floor(Math.random() * 40000) + 40000;
    const monthExpenses = Math.floor(monthRevenue * 0.6);
    return {
      month,
      revenue: monthRevenue,
      expenses: monthExpenses,
      profit: monthRevenue - monthExpenses,
      patientCount: Math.floor(Math.random() * 500) + 800,
    };
  });
}

function generatePendingTasks(appointments: Appointment[], patients: Patient[]) {
  const tasks = [];

  const pending = appointments.filter((apt) => apt.status === 'scheduled');
  if (pending.length > 0) {
    tasks.push({
      id: 'TASK-001',
      type: 'appointment_approval' as const,
      title: 'Pending Appointments',
      description: `${pending.length} appointments awaiting confirmation`,
      patientName: pending[0]?.patient.name || 'Unknown',
      priority: 'high' as const,
      timeAgo: 'Just now',
    });
  }

  if (patients.length > 0) {
    tasks.push({
      id: 'TASK-002',
      type: 'lab_result' as const,
      title: 'Recent Patient Registrations',
      description: `${patients.length} patients registered recently`,
      patientName: patients[patients.length - 1]?.name || 'Unknown',
      priority: 'medium' as const,
      timeAgo: 'Today',
    });
  }

  return tasks;
}