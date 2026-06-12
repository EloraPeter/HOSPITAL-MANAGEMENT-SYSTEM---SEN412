export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type Gender = 'male' | 'female' | 'other';

export interface Patient {
  id: string;
  user_id: string;
  date_of_birth: string;
  blood_group: BloodGroup;
  gender: Gender;
  height_cm?: number;
  weight_kg?: number;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relationship: string;
  medical_conditions: string[];
  allergies: string[];
  created_at: string;
  updated_at: string;
}

export interface PatientWithUser extends Patient {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}