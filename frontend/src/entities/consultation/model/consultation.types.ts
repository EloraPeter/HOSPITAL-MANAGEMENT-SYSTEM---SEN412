export interface Consultation {
  id: string;
  appointment_id: string;
  patient_id: string;
  doctor_id: string;
  consultation_date: string;
  symptoms: string[];
  diagnosis: string;
  treatment_plan: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}