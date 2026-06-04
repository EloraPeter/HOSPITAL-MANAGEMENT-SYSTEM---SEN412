import { useState, useCallback } from 'react';
import { patientService } from '../services/patientService';
import type { Patient, CreatePatientRequest, UpdatePatientRequest } from '../types/patient.types';
import type { ApiListResponse } from '../types/api.types';

export const usePatientsApi = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [meta, setMeta] = useState<ApiListResponse<Patient>['meta'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = useCallback(async (page: number = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await patientService.getAll({ page });
      setPatients(response.data);
      setMeta(response.meta);
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch patients';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPatient = useCallback(async (data: CreatePatientRequest) => {
    setError(null);
    try {
      const newPatient = await patientService.create(data);
      setPatients(prev => [newPatient, ...prev]);
      return newPatient;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to create patient';
      throw new Error(message);
    }
  }, []);

  const updatePatient = useCallback(async (id: number, data: UpdatePatientRequest) => {
    setError(null);
    try {
      const updated = await patientService.update(id, data);
      setPatients(prev => prev.map(p => p.id === id ? updated : p));
      return updated;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update patient';
      throw new Error(message);
    }
  }, []);

  const deletePatient = useCallback(async (id: number) => {
    setError(null);
    try {
      await patientService.delete(id);
      setPatients(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to delete patient';
      throw new Error(message);
    }
  }, []);

  return {
    patients,
    meta,
    isLoading,
    error,
    fetchPatients,
    createPatient,
    updatePatient,
    deletePatient,
  };
};