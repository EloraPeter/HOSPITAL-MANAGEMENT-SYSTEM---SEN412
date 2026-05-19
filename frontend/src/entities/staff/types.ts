// entities/staff/types.ts
export interface StaffMember {
  id: string;
  employeeId: string;
  type: StaffType;
  status: StaffStatus;
  personalInfo: PersonalInfo;
  professionalInfo: ProfessionalInfo;
  employmentDetails: EmploymentDetails;
  schedule: Schedule[];
  performanceMetrics?: PerformanceMetrics;
  documents: StaffDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export type StaffType = 
  | 'doctor'
  | 'nurse'
  | 'administrative'
  | 'lab-technician'
  | 'pharmacist'
  | 'receptionist'
  | 'janitorial'
  | 'security';

export type StaffStatus = 
  | 'active'
  | 'on-leave'
  | 'suspended'
  | 'terminated'
  | 'probation';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: BloodGroup;
  contactInfo: {
    email: string;
    phone: string;
    alternatePhone?: string;
    address: Address;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface ProfessionalInfo {
  department: Department;
  designation: string;
  specialization?: string;
  qualifications: Qualification[];
  licenseNumber?: string;
  licenseExpiry?: Date;
  certifications: Certification[];
  yearsOfExperience: number;
  languages: string[];
}

export interface EmploymentDetails {
  joiningDate: Date;
  contractType: 'permanent' | 'contract' | 'part-time' | 'intern';
  probationEndDate?: Date;
  salary: {
    amount: number;
    currency: string;
    paymentFrequency: 'monthly' | 'bi-weekly' | 'hourly';
  };
  bankDetails: {
    bankName: string;
    accountNumber: string;
    ifscCode: string;
  };
  benefits: string[];
}

export interface Schedule {
  id: string;
  dayOfWeek: DayOfWeek;
  startTime: string; // "09:00"
  endTime: string;   // "17:00"
  roomNumber?: string;
  maxAppointments?: number;
  isAvailable: boolean;
}

export interface PerformanceMetrics {
  patientSatisfaction: number;
  appointmentsCompleted: number;
  averageConsultationTime: number;
  punctuality: number;
  lastReviewed: Date;
}

export interface Qualification {
  degree: string;
  institution: string;
  year: number;
  specialization?: string;
}

export interface Certification {
  name: string;
  issuingBody: string;
  dateObtained: Date;
  expiryDate: Date;
  certificateNumber: string;
}

export type Department = 
  | 'cardiology'
  | 'neurology'
  | 'orthopedics'
  | 'pediatrics'
  | 'emergency'
  | 'pharmacy'
  | 'radiology'
  | 'pathology'
  | 'administration';