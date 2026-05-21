export type AppointmentStatus = 
  | 'pending' 
  | 'approved' 
  | 'confirmed' 
  | 'in-progress' 
  | 'completed' 
  | 'cancelled' 
  | 'no-show';

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  time_slot: string;
  duration_minutes: number;
  type: string;
  status: AppointmentStatus;
  reason: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface AppointmentWithDetails extends Appointment {
  patient: {
    user: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
    };
    blood_group: string;
  };
  doctor: {
    user: {
      first_name: string;
      last_name: string;
    };
    specialty: string;
    department: string;
  };
}