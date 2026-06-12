export type StaffStatus = 'active' | 'on-leave' | 'suspended' | 'terminated' | 'probation';
export type StaffType = 'doctor' | 'nurse' | 'administrative' | 'lab-technician' | 'pharmacist' | 'receptionist';

export interface StaffMember {
  id: string;
  user_id: string;
  type: StaffType;
  status: StaffStatus;
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    contactInfo: {
      email: string;
      phone: string;
      address: string;
    };
  };
  professionalInfo: {
    designation: string;
    department: string;
    licenseNumber?: string;
    specialization?: string;
    yearsOfExperience: number;
    joiningDate: string;
    qualifications: string[];
  };
  schedule?: {
    shift: string;
    workingDays: string[];
  };
  created_at: string;
  updated_at: string;
}

export interface StaffFilters {
  search: string;
  department: string;
  type: string;
  status: string;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface StaffStatsData {
  total: number;
  active: number;
  onLeave: number;
  byDepartment: Record<string, number>;
  byType: Record<string, number>;
}

export interface StaffListResponse {
  staff: StaffMember[];
  summary: StaffStatsData;
  total: number;
  page: number;
  limit: number;
}