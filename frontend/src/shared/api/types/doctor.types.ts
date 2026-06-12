export type DoctorStatus = 'available' | 'unavailable' | 'on_leave';

// Create doctor - matches POST /doctors
export interface CreateDoctorRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  specialty: string;
  license_number: string;
  bio?: string;
  status?: DoctorStatus;
}

// Update doctor - matches PUT /doctors/{id}
export interface UpdateDoctorRequest {
  name?: string;
  phone?: string;
  specialty?: string;
  license_number?: string;
  bio?: string;
  status?: DoctorStatus;
}

// Doctor object from backend
export interface Doctor {
  id: number;
  user_id: number;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  license_number: string;
  bio: string;
  status: DoctorStatus;
  created_at: string;
}