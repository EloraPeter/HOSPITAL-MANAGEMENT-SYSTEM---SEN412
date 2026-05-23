export type LabStatus = 'ordered' | 'sample_collected' | 'in_progress' | 'completed' | 'cancelled';

export interface LabTest {
  id: string;
  medical_record_id: string;
  patient_id: string;
  doctor_id: string;
  test_name: string;
  result_value?: string;
  reference_range?: string;
  unit?: string;
  status: LabStatus;
  is_abnormal: boolean;
  ordered_date: string;
  completed_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface LabReport {
  id: string;
  patient_id: string;
  tests: LabTest[];
  report_date: string;
  summary: string;
  created_at: string;
}