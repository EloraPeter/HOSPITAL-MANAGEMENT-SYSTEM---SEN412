import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { ApiResponse, ApiListResponse, PaginationParams } from '../types/api.types';
import type { Doctor, CreateDoctorRequest, UpdateDoctorRequest } from '../types/doctor.types';

export const doctorService = {
  getAll: async (params?: PaginationParams) => {
    const response = await apiClient.get<ApiListResponse<Doctor>>(
      API_ENDPOINTS.DOCTORS.BASE,
      { params }
    );
    return response.data;
  },

  getById: async (id: number): Promise<Doctor> => {
    const response = await apiClient.get<ApiResponse<Doctor>>(
      API_ENDPOINTS.DOCTORS.BY_ID(id)
    );
    return response.data.data;
  },

  create: async (data: CreateDoctorRequest): Promise<Doctor> => {
    const response = await apiClient.post<ApiResponse<Doctor>>(
      API_ENDPOINTS.DOCTORS.BASE,
      data
    );
    return response.data.data;
  },

  update: async (id: number, data: UpdateDoctorRequest): Promise<Doctor> => {
    const response = await apiClient.put<ApiResponse<Doctor>>(
      API_ENDPOINTS.DOCTORS.BY_ID(id),
      data
    );
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.DOCTORS.BY_ID(id));
  },
};