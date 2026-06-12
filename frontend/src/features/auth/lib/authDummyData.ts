import type { UserRole } from '@/entities/user/model/user.types';

interface DummyUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: UserRole;
}

export const dummyUsers: DummyUser[] = [
  {
    id: 'USR-001',
    email: 'admin@hospital.com',
    first_name: 'Admin',
    last_name: 'User',
    phone: '(555) 000-0000',
    role: 'admin',
  },
  {
    id: 'USR-002',
    email: 'doctor@hospital.com',
    first_name: 'Michael',
    last_name: 'Chen',
    phone: '(555) 111-2222',
    role: 'doctor',
  },
  {
    id: 'USR-003',
    email: 'nurse@hospital.com',
    first_name: 'Emily',
    last_name: 'Brown',
    phone: '(555) 222-3333',
    role: 'nurse',
  },
  {
    id: 'USR-004',
    email: 'patient@email.com',
    first_name: 'John',
    last_name: 'Doe',
    phone: '(555) 333-4444',
    role: 'patient',
  },
  {
    id: 'USR-005',
    email: 'receptionist@hospital.com',
    first_name: 'Sarah',
    last_name: 'Davis',
    phone: '(555) 444-5555',
    role: 'receptionist',
  },
];