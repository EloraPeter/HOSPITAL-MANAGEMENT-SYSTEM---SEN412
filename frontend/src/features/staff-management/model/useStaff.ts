import { useState, useEffect, useCallback } from 'react';
import { staffService } from './staff.service';
import type { StaffFilters, StaffListResponse } from '@/entities/staff/model/staff.types';

interface UseStaffReturn {
  data: StaffListResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useStaff = (filters: StaffFilters): UseStaffReturn => {
  const [data, setData] = useState<StaffListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStaff = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await staffService.getStaffList(filters);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch staff');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchStaff,
  };
};