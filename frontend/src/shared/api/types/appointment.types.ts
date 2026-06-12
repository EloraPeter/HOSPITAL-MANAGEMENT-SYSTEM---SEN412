export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

export interface CreateAppointmentRequest {
  patient_id: number;
  doctor_id: number;
  appointment_date: string;
  time_slot: string;
  status?: AppointmentStatus;
  notes?: string;
}

export interface UpdateAppointmentRequest {
  appointment_date?: string;
  time_slot?: string;
  status?: AppointmentStatus;
  notes?: string;
}

// Matches backend response from GET /appointments
export interface Appointment {
  id: number;
  patient: {
    id: number;
    name: string;
  };
  doctor: {
    id: number;
    name: string;
    specialty: string;
  };
  appointment_date: string;
  time_slot: string;
  status: AppointmentStatus;
  notes: string;
  created_at: string;
}