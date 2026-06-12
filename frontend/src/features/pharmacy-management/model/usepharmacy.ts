// features/pharmacy-management/model/usePharmacy.ts
import { create } from 'zustand';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pharmacyService } from './pharmacy.service';
import type { Drug, Prescription, PharmacyInventory } from '@/entities/pharmacy/model/pharmacy.types';

// Pharmacy Store
interface PharmacyStore {
  selectedDrug: Drug | null;
  selectedPrescription: Prescription | null;
  filters: PharmacyFilters;
  setSelectedDrug: (drug: Drug | null) => void;
  setSelectedPrescription: (prescription: Prescription | null) => void;
  updateFilters: (filters: Partial<PharmacyFilters>) => void;
  resetFilters: () => void;
}

interface PharmacyFilters {
  search: string;
  category?: string;
  prescriptionRequired?: string;
  stockStatus?: string;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

const initialFilters: PharmacyFilters = {
  search: '',
  page: 1,
  limit: 20,
  sortBy: 'name',
  sortOrder: 'asc',
};

export const usePharmacyStore = create<PharmacyStore>((set) => ({
  selectedDrug: null,
  selectedPrescription: null,
  filters: initialFilters,
  setSelectedDrug: (drug) => set({ selectedDrug: drug }),
  setSelectedPrescription: (prescription) => set({ selectedPrescription: prescription }),
  updateFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () => set({ filters: initialFilters }),
}));

// Drug Inventory Hooks
export function useDrugs() {
  const { filters } = usePharmacyStore();
  
  return useQuery({
    queryKey: ['drugs', filters],
    queryFn: () => pharmacyService.getDrugs(filters),
    staleTime: 5 * 60 * 1000,
  });
}

export function useDrug(id: string) {
  return useQuery({
    queryKey: ['drugs', id],
    queryFn: () => pharmacyService.getDrugById(id),
    enabled: !!id,
  });
}

export function useCreateDrug() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: pharmacyService.createDrug,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drugs'] });
    },
  });
}

export function useUpdateDrug() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Drug> }) =>
      pharmacyService.updateDrug(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['drugs'] });
      queryClient.invalidateQueries({ queryKey: ['drugs', variables.id] });
    },
  });
}

export function useUpdateStock() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ drugId, quantity }: { drugId: string; quantity: number }) =>
      pharmacyService.updateStock(drugId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drugs'] });
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    },
  });
}

// Prescription Hooks
export function usePrescriptions(filters?: Record<string, any>) {
  return useQuery({
    queryKey: ['prescriptions', filters],
    queryFn: () => pharmacyService.getPrescriptions(filters),
  });
}

export function useDispensePrescription() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: pharmacyService.dispensePrescription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] });
      queryClient.invalidateQueries({ queryKey: ['drugs'] });
    },
  });
}