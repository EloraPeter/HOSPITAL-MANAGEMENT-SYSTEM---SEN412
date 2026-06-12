import type { StaffMember, StaffFilters, StaffListResponse, StaffStatsData } from '@/entities/staff/model/staff.types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Dummy data
const dummyStaff: StaffMember[] = [
  {
    id: 'STF-001',
    user_id: 'USR-001',
    type: 'doctor',
    status: 'active',
    personalInfo: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      dateOfBirth: '1980-05-15',
      gender: 'Female',
      contactInfo: {
        email: 'sarah.johnson@hospital.com',
        phone: '(555) 111-2222',
        address: '123 Medical Dr, Suite 100',
      },
    },
    professionalInfo: {
      designation: 'Senior Cardiologist',
      department: 'Cardiology',
      licenseNumber: 'MED-12345',
      specialization: 'Interventional Cardiology',
      yearsOfExperience: 15,
      joiningDate: '2015-03-01',
      qualifications: ['MD', 'FACC'],
    },
    created_at: '2015-03-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'STF-002',
    user_id: 'USR-002',
    type: 'nurse',
    status: 'active',
    personalInfo: {
      firstName: 'Emily',
      lastName: 'Brown',
      dateOfBirth: '1990-08-22',
      gender: 'Female',
      contactInfo: {
        email: 'emily.brown@hospital.com',
        phone: '(555) 222-3333',
        address: '456 Health Ave',
      },
    },
    professionalInfo: {
      designation: 'Head Nurse',
      department: 'Emergency',
      licenseNumber: 'RN-54321',
      yearsOfExperience: 8,
      joiningDate: '2018-06-15',
      qualifications: ['BSN', 'RN'],
    },
    created_at: '2018-06-15T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z',
  },
  {
    id: 'STF-003',
    user_id: 'USR-003',
    type: 'administrative',
    status: 'on-leave',
    personalInfo: {
      firstName: 'Michael',
      lastName: 'Chen',
      dateOfBirth: '1985-12-10',
      gender: 'Male',
      contactInfo: {
        email: 'michael.chen@hospital.com',
        phone: '(555) 333-4444',
        address: '789 Hospital Blvd',
      },
    },
    professionalInfo: {
      designation: 'Department Administrator',
      department: 'Administration',
      yearsOfExperience: 10,
      joiningDate: '2016-01-10',
      qualifications: ['MHA', 'MBA'],
    },
    created_at: '2016-01-10T00:00:00Z',
    updated_at: '2024-03-20T00:00:00Z',
  },
];

const dummyStats: StaffStatsData = {
  total: 150,
  active: 135,
  onLeave: 8,
  byDepartment: {
    Cardiology: 25,
    Emergency: 30,
    Administration: 20,
    Pediatrics: 18,
    Neurology: 15,
    Orthopedics: 22,
    Pharmacy: 12,
    Radiology: 8,
  },
  byType: {
    doctor: 45,
    nurse: 60,
    administrative: 20,
    'lab-technician': 12,
    pharmacist: 8,
    receptionist: 5,
  },
};

export const staffService = {
  getStaffList: async (filters: StaffFilters): Promise<StaffListResponse> => {
    await delay(800);

    let filtered = [...dummyStaff];

    // Apply filters
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          `${s.personalInfo.firstName} ${s.personalInfo.lastName}`.toLowerCase().includes(search) ||
          s.personalInfo.contactInfo.email.toLowerCase().includes(search) ||
          s.professionalInfo.department.toLowerCase().includes(search)
      );
    }

    if (filters.department) {
      filtered = filtered.filter(
        (s) => s.professionalInfo.department.toLowerCase() === filters.department.toLowerCase()
      );
    }

    if (filters.type) {
      filtered = filtered.filter((s) => s.type === filters.type);
    }

    if (filters.status) {
      filtered = filtered.filter((s) => s.status === filters.status);
    }

    // Sort
    filtered.sort((a, b) => {
      const aVal = filters.sortBy === 'firstName' ? a.personalInfo.firstName : a.professionalInfo.department;
      const bVal = filters.sortBy === 'firstName' ? b.personalInfo.firstName : b.professionalInfo.department;
      return filters.sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });

    // Paginate
    const start = (filters.page - 1) * filters.limit;
    const paginated = filtered.slice(start, start + filters.limit);

    return {
      staff: paginated,
      summary: dummyStats,
      total: filtered.length,
      page: filters.page,
      limit: filters.limit,
    };
  },

  getStaffById: async (id: string): Promise<StaffMember | null> => {
    await delay(500);
    return dummyStaff.find((s) => s.id === id) || null;
  },
};