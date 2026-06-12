// features/pharmacy-management/model/pharmacy.service.ts
import { apiClient } from '@/shared/api/client';
import type { Drug, Prescription, PharmacyInventory } from '@/entities/pharmacy/model/pharmacy.types';

export const pharmacyService = {
  // Drugs
  getDrugs: async (filters: any) => {
    const { data } = await apiClient.get<{ drugs: Drug[]; total: number }>('/pharmacy/drugs', {
      params: filters,
    });
    return data;
  },

  getDrugById: async (id: string) => {
    const { data } = await apiClient.get<Drug>(`/pharmacy/drugs/${id}`);
    return data;
  },

  createDrug: async (drug: Omit<Drug, 'id' | 'createdAt' | 'updatedAt'>) => {
    const { data } = await apiClient.post<Drug>('/pharmacy/drugs', drug);
    return data;
  },

  updateDrug: async (id: string, drug: Partial<Drug>) => {
    const { data } = await apiClient.put<Drug>(`/pharmacy/drugs/${id}`, drug);
    return data;
  },

  deleteDrug: async (id: string) => {
    await apiClient.delete(`/pharmacy/drugs/${id}`);
  },

  updateStock: async (drugId: string, quantity: number) => {
    const { data } = await apiClient.patch<Drug>(`/pharmacy/drugs/${drugId}/stock`, {
      quantity,
    });
    return data;
  },

  // Prescriptions
  getPrescriptions: async (filters?: Record<string, any>) => {
    const { data } = await apiClient.get<Prescription[]>('/pharmacy/prescriptions', {
      params: filters,
    });
    return data;
  },

  dispensePrescription: async (prescriptionId: string, dispensedBy: string) => {
    const { data } = await apiClient.patch<Prescription>(
      `/pharmacy/prescriptions/${prescriptionId}/dispense`,
      { dispensedBy }
    );
    return data;
  },

  // Inventory
  getInventory: async () => {
    const { data } = await apiClient.get<PharmacyInventory[]>('/pharmacy/inventory');
    return data;
  },

  getLowStockItems: async () => {
    const { data } = await apiClient.get<Drug[]>('/pharmacy/inventory/low-stock');
    return data;
  },
};