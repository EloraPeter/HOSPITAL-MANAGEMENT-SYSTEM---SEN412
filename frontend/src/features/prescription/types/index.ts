// features/prescription/types/index.ts
import type { Patient } from '@/entities/patient';
import type { Doctor } from '@/entities/doctor';

export interface Prescription {
  id: string;
  prescriptionNumber: string;
  patientId: string;
  patient?: Patient;
  doctorId: string;
  doctor?: Doctor;
  diagnosis: Diagnosis;
  medications: Medication[];
  instructions: string;
  notes?: string;
  status: PrescriptionStatus;
  issuedDate: Date;
  expiryDate: Date;
  refills: number;
  refillsUsed: number;
  isControlledSubstance: boolean;
  requiresApproval: boolean;
  approvedBy?: string;
  approvedDate?: Date;
  pharmacyId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Diagnosis {
  primary: DiagnosisCode;
  secondary: DiagnosisCode[];
  notes: string;
}

export interface DiagnosisCode {
  code: string; // ICD-10 code
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface Medication {
  id: string;
  drugId: string;
  drugName: string;
  genericName: string;
  strength: string;
  form: MedicationForm;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  refills: number;
  instructions: string;
  startDate: Date;
  endDate?: Date;
  isPRN: boolean; // As needed
  warnings?: string[];
  interactions?: DrugInteraction[];
  isControlledSubstance: boolean;
  schedule?: ControlledSchedule;
}

export type MedicationForm = 
  | 'tablet'
  | 'capsule'
  | 'liquid'
  | 'injection'
  | 'topical'
  | 'inhaler'
  | 'drops'
  | 'suppository'
  | 'patch'
  | 'other';

export type PrescriptionStatus = 
  | 'draft'
  | 'pending-review'
  | 'approved'
  | 'active'
  | 'dispensed'
  | 'expired'
  | 'cancelled'
  | 'on-hold';

export type ControlledSchedule = 'II' | 'III' | 'IV' | 'V';

export interface DrugInteraction {
  drugName: string;
  severity: 'mild' | 'moderate' | 'severe' | 'contraindicated';
  description: string;
  recommendation: string;
}

export interface PrescriptionFilters {
  patientId?: string;
  doctorId?: string;
  status?: PrescriptionStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isControlledSubstance?: boolean;
  requiresApproval?: boolean;
}

export interface CreatePrescriptionDTO {
  patientId: string;
  diagnosis: Diagnosis;
  medications: Omit<Medication, 'id'>[];
  instructions: string;
  notes?: string;
  refills?: number;
  isControlledSubstance?: boolean;
  pharmacyId?: string;
}

export interface MedicationTemplate {
  id: string;
  name: string;
  genericName: string;
  category: string;
  commonDosages: string[];
  commonFrequencies: string[];
  forms: MedicationForm[];
  defaultInstructions: string;
  isControlledSubstance: boolean;
  schedule?: ControlledSchedule;
}