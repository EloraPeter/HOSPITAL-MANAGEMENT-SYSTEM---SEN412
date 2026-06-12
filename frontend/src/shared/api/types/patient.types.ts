export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

// Create patient - matches POST /patients
export interface CreatePatientRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  date_of_birth?: string;
  blood_type?: BloodType;
  emergency_contact?: string;
  emergency_contact_phone?: string;
  allergies?: string;
  address?: string;
}

// Update patient - matches PUT /patients/{id}
export interface UpdatePatientRequest {
  name?: string;
  phone?: string;
  blood_type?: BloodType;
  address?: string;
  emergency_contact?: string;
  emergency_contact_phone?: string;
}

// Patient object from backend
export interface Patient {
  id: number;
  user_id: number;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  blood_type: BloodType;
  emergency_contact: string;
  emergency_contact_phone: string;
  allergies: string;
  address: string;
  created_at: string;
}