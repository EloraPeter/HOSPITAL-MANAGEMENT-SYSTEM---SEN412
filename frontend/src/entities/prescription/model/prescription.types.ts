export type PrescriptionStatus = 'active' | 'completed' | 'cancelled';

export interface Prescription {
  id: string;
  medical_record_id: string;
  patient_id: string;
  doctor_id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  duration_days: number;
  refills_remaining: number;
  instructions: string;
  status: PrescriptionStatus;
  prescribed_date: string;
  created_at: string;
  updated_at: string;
}