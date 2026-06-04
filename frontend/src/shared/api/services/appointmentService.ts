import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { ApiResponse, ApiListResponse, PaginationParams } from '../types/api.types';
import type { Appointment, CreateAppointmentRequest, UpdateAppointmentRequest } from '../types/appointment.types';

export const appointmentService = {
  getAll: async (params?: PaginationParams) => {
    const response = await apiClient.get<ApiListResponse<Appointment>>(
      API_ENDPOINTS.APPOINTMENTS.BASE,
      { params }
    );
    return response.data;
  },

  getById: async (id: number): Promise<Appointment> => {
    const response = await apiClient.get<ApiResponse<Appointment>>(
      API_ENDPOINTS.APPOINTMENTS.BY_ID(id)
    );
    return response.data.data;
  },

  create: async (data: CreateAppointmentRequest): Promise<Appointment> => {
    const response = await apiClient.post<ApiResponse<Appointment>>(
      API_ENDPOINTS.APPOINTMENTS.BASE,
      data
    );
    return response.data.data;
  },

  update: async (id: number, data: UpdateAppointmentRequest): Promise<Appointment> => {
    const response = await apiClient.put<ApiResponse<Appointment>>(
      API_ENDPOINTS.APPOINTMENTS.BY_ID(id),
      data
    );
    return response.data.data;
  },

  cancel: async (id: number): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.APPOINTMENTS.BY_ID(id));
  },
};