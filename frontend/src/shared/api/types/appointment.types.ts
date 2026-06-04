export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

// Create appointment - matches POST /appointments
export interface CreateAppointmentRequest {
  patient_id: number;
  doctor_id: number;
  appointment_date: string; // YYYY-MM-DD
  time_slot: string;        // HH:MM (e.g., "09:00", "14:30")
  status?: AppointmentStatus;
  notes?: string;
}

// Update appointment - matches PUT /appointments/{id}
export interface UpdateAppointmentRequest {
  appointment_date?: string;
  time_slot?: string;
  status?: AppointmentStatus;
  notes?: string;
}

// Appointment object from backend
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