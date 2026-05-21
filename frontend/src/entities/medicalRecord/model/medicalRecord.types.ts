export interface MedicalRecord {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_id: string;
  record_date: string;
  diagnosis: string;
  treatment_plan: string;
  symptoms: string[];
  vital_signs?: VitalSigns;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface VitalSigns {
  blood_pressure: string;
  heart_rate: number;
  temperature: number;
  respiratory_rate: number;
  oxygen_saturation: number;
}