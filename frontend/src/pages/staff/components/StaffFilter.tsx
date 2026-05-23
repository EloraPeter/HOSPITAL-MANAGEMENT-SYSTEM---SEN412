// src/pages/staff/components/StaffFilters/StaffFilters.tsx
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { X } from 'lucide-react';

interface StaffFilters {
  search: string;
  department: string;
  type: string;
  status: string;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

interface StaffFiltersProps {
  filters: StaffFilters;
  onFilterChange: (filters: Partial<StaffFilters>) => void;
  onClose: () => void;
}

const DEPARTMENTS = [
  'cardiology',
  'neurology',
  'orthopedics',
  'pediatrics',
  'emergency',
  'pharmacy',
  'radiology',
  'pathology',
  'administration',
];

const STAFF_TYPES = [
  'doctor',
  'nurse',
  'administrative',
  'lab-technician',
  'pharmacist',
  'receptionist',
];

const STAFF_STATUSES = [
  'active',
  'on-leave',
  'suspended',
  'terminated',
  'probation',
];

export function StaffFilters({ filters, onFilterChange, onClose }: StaffFiltersProps) {
  return (
    <div className="bg-card border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Department</Label>
          <Select
            value={filters.department}
            onValueChange={(value) => onFilterChange({ department: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Departments</SelectItem>
              {DEPARTMENTS.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept.charAt(0).toUpperCase() + dept.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Staff Type</Label>
          <Select
            value={filters.type}
            onValueChange={(value) => onFilterChange({ type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              {STAFF_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.replace('-', ' ').charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={filters.status}
            onValueChange={(value) => onFilterChange({ status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              {STAFF_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.replace('-', ' ').charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={() => onFilterChange({
            department: '',
            type: '',
            status: '',
          })}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}