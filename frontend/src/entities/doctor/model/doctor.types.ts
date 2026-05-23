export interface Doctor {
  id: string;
  user_id: string;
  specialty: string;
  department: string;
  license_number: string;
  biography: string;
  experience_years: number;
  rating: number;
  consultation_fee: number;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface DoctorWithUser extends Doctor {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}

export interface DoctorSchedule {
  id: string;
  doctor_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
}