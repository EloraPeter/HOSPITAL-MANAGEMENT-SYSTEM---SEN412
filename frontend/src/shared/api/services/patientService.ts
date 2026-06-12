import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { ApiResponse, ApiListResponse, PaginationParams } from '../types/api.types';
import type { Patient, CreatePatientRequest, UpdatePatientRequest } from '../types/patient.types';

export const patientService = {
  getAll: async (params?: PaginationParams) => {
    const response = await apiClient.get<ApiListResponse<Patient>>(
      API_ENDPOINTS.PATIENTS.BASE,
      { params }
    );
    return response.data;
  },

  getById: async (id: number): Promise<Patient> => {
    const response = await apiClient.get<ApiResponse<Patient>>(
      API_ENDPOINTS.PATIENTS.BY_ID(id)
    );
    return response.data.data;
  },

  create: async (data: CreatePatientRequest): Promise<Patient> => {
    const response = await apiClient.post<ApiResponse<Patient>>(
      API_ENDPOINTS.PATIENTS.BASE,
      data
    );
    return response.data.data;
  },

  update: async (id: number, data: UpdatePatientRequest): Promise<Patient> => {
    const response = await apiClient.put<ApiResponse<Patient>>(
      API_ENDPOINTS.PATIENTS.BY_ID(id),
      data
    );
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.PATIENTS.BY_ID(id));
  },
};