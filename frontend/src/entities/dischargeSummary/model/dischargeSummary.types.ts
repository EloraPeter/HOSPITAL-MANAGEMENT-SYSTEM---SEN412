export interface DischargeSummary {
  id: string;
  patient_id: string;
  medical_record_id: string;
  doctor_id: string;
  admission_date: string;
  discharge_date: string;
  reason_for_admission: string;
  treatment_received: string;
  discharge_diagnosis: string;
  follow_up_instructions: string;
  follow_up_date?: string;
  medications_on_discharge: string[];
  activity_restrictions?: string;
  diet_instructions?: string;
  created_at: string;
  updated_at: string;
}