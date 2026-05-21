export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  department: string;
  email: string;
  phone: string;
  availability: 'available' | 'busy' | 'off-duty';
  experience: number;
  rating: number;
}