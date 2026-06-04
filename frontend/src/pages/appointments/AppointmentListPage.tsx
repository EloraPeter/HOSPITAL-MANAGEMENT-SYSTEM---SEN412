import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { appointmentService } from '@/shared/api/services/appointmentService';
import { patientService } from '@/shared/api/services/patientService';
import { doctorService } from '@/shared/api/services/doctorService';
import { AppointmentFormModal } from '@/features/appointment-scheduling/ui/AppointmentFormModal';
import { LoadingSpinner } from '@/shared/ui/feedback/LoadingSpinner';
import { useAuthStore } from '@/app/store/authStore';
import type { Appointment } from '@/shared/api/types/appointment.types';
import type { Patient } from '@/shared/api/types/patient.types';
import type { Doctor } from '@/shared/api/types/doctor.types';

const APPOINTMENT_STATUSES: Record<string, string> = {
  scheduled: 'Scheduled',
  confirmed: 'Confirmed',
  completed: 'Completed',
  cancelled: 'Cancelled',
  no_show: 'No Show',
};

const STATUS_COLORS: Record<string, string> = {
  scheduled: 'warning',
  confirmed: 'primary',
  completed: 'success',
  cancelled: 'danger',
  no_show: 'dark',
};

const AppointmentListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { hasRole } = useAuthStore();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<{ total: number; current_page: number; last_page: number; per_page: number } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<number | undefined>(undefined);

  // Filters
  const [dateFilter, setDateFilter] = useState(searchParams.get('date') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [doctorFilter, setDoctorFilter] = useState(searchParams.get('doctor_id') || '');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const currentPage = Number(searchParams.get('page')) || 1;
  const canCreate = hasRole(['admin', 'receptionist']);
  const canUpdate = hasRole(['admin', 'receptionist', 'doctor', 'nurse']);
  const canCancel = hasRole(['admin', 'receptionist']);

  const fetchAppointments = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const params: any = { page, per_page: 15 };
      if (dateFilter) params.appointment_date = dateFilter;
      if (statusFilter) params.status = statusFilter;
      if (doctorFilter) params.doctor_id = doctorFilter;

      const response = await appointmentService.getAll(params);
      setAppointments(response.data);
      setMeta(response.meta);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load appointments');
    } finally {
      setIsLoading(false);
    }
  }, [dateFilter, statusFilter, doctorFilter]);

  const fetchPatientsAndDoctors = useCallback(async () => {
    try {
      const [patientsRes, doctorsRes] = await Promise.all([
        patientService.getAll({ per_page: 100 }),
        doctorService.getAll({ per_page: 100 }),
      ]);
      setPatients(patientsRes.data);
      setDoctors(doctorsRes.data);
    } catch (err) {
      console.error('Failed to fetch patients/doctors:', err);
    }
  }, []);

  useEffect(() => {
    fetchAppointments(currentPage);
    fetchPatientsAndDoctors();
  }, [currentPage, fetchAppointments, fetchPatientsAndDoctors]);

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', String(page));
      return params;
    });
  };

  const handleFilterChange = (key: string, value: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.set('page', '1');
      return params;
    });
  };

  const handleNewAppointment = (patientId?: number) => {
    setSelectedPatientId(patientId);
    setShowModal(true);
  };

  const handleAppointmentCreated = () => {
    setShowModal(false);
    fetchAppointments(currentPage);
  };

  const handleCancelAppointment = async (id: number) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      await appointmentService.cancel(id);
      fetchAppointments(currentPage);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to cancel appointment');
    }
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      await appointmentService.update(id, { status: newStatus as any });
      fetchAppointments(currentPage);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  // Stats
  const todayAppointments = appointments.filter((a) => a.appointment_date === new Date().toISOString().split('T')[0]);
  const checkedIn = appointments.filter((a) => a.status === 'confirmed');
  const waiting = appointments.filter((a) => a.status === 'scheduled');
  const completed = appointments.filter((a) => a.status === 'completed');

  if (isLoading && appointments.length === 0) {
    return <LoadingSpinner text="Loading appointments..." />;
  }

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Appointments</h1>
          <p className="text-muted mb-0">
            {meta ? `${meta.total} total appointments` : 'Manage and schedule patient appointments'}
          </p>
        </div>
        {canCreate && (
          <button onClick={() => handleNewAppointment()} className="btn btn-primary">
            <i className="bi bi-plus-lg me-2"></i>
            New Appointment
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-start border-primary border-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">Today's Appointments</p>
                  <h3 className="mb-0">{todayAppointments.length}</h3>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <i className="bi bi-calendar-check text-primary fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-start border-success border-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">Checked In</p>
                  <h3 className="mb-0">{checkedIn.length}</h3>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <i className="bi bi-person-check text-success fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-start border-warning border-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">Waiting</p>
                  <h3 className="mb-0">{waiting.length}</h3>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded">
                  <i className="bi bi-clock text-warning fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-start border-info border-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">Completed</p>
                  <h3 className="mb-0">{completed.length}</h3>
                </div>
                <div className="bg-info bg-opacity-10 p-3 rounded">
                  <i className="bi bi-check-circle text-info fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label small fw-medium">Date</label>
              <input
                type="date"
                className="form-control"
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  handleFilterChange('date', e.target.value);
                }}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-medium">Status</label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  handleFilterChange('status', e.target.value);
                }}
              >
                <option value="">All Statuses</option>
                {Object.entries(APPOINTMENT_STATUSES).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-medium">Doctor</label>
              <select
                className="form-select"
                value={doctorFilter}
                onChange={(e) => {
                  setDoctorFilter(e.target.value);
                  handleFilterChange('doctor_id', e.target.value);
                }}
              >
                <option value="">All Doctors</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>Dr. {doc.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-medium">View</label>
              <div className="btn-group w-100">
                <button
                  className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setViewMode('list')}
                >
                  <i className="bi bi-list me-2"></i>List
                </button>
                <button
                  className={`btn ${viewMode === 'calendar' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setViewMode('calendar')}
                >
                  <i className="bi bi-calendar me-2"></i>Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
          <span>{error}</span>
          <button className="btn btn-outline-danger btn-sm ms-auto" onClick={() => fetchAppointments(currentPage)}>
            Retry
          </button>
        </div>
      )}

      {/* Appointments Table */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Date & Time</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-muted">
                      No appointments found.
                    </td>
                  </tr>
                ) : (
                  appointments.map((apt) => (
                    <tr key={apt.id}>
                      <td>
                        <div>
                          <p className="mb-0 fw-medium">
                            {new Date(apt.appointment_date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                          <small className="text-muted">{apt.time_slot}</small>
                        </div>
                      </td>
                      <td>
                        <p className="mb-0">{apt.patient.name}</p>
                        <small className="text-muted">ID: {apt.patient.id}</small>
                      </td>
                      <td>
                        <p className="mb-0">Dr. {apt.doctor.name}</p>
                        <small className="text-muted">{apt.doctor.specialty || 'General'}</small>
                      </td>
                      <td>
                        <span className={`badge bg-${STATUS_COLORS[apt.status] || 'secondary'}`}>
                          {APPOINTMENT_STATUSES[apt.status] || apt.status}
                        </span>
                      </td>
                      <td>
                        <small className="text-muted">
                          {apt.notes ? apt.notes.substring(0, 40) + (apt.notes.length > 40 ? '...' : '') : '-'}
                        </small>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            title="View Details"
                            onClick={() => navigate(`/appointments/${apt.id}`)}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          {canUpdate && apt.status === 'scheduled' && (
                            <button
                              className="btn btn-sm btn-outline-success"
                              title="Confirm"
                              onClick={() => handleStatusUpdate(apt.id, 'confirmed')}
                            >
                              <i className="bi bi-check-lg"></i>
                            </button>
                          )}
                          {canUpdate && apt.status === 'confirmed' && (
                            <button
                              className="btn btn-sm btn-outline-info"
                              title="Mark Completed"
                              onClick={() => handleStatusUpdate(apt.id, 'completed')}
                            >
                              <i className="bi bi-check-all"></i>
                            </button>
                          )}
                          {canCancel && ['scheduled', 'confirmed'].includes(apt.status) && (
                            <button
                              className="btn btn-sm btn-outline-danger"
                              title="Cancel"
                              onClick={() => handleCancelAppointment(apt.id)}
                            >
                              <i className="bi bi-x-lg"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {meta && meta.last_page > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <p className="text-muted mb-0">
            Showing {((meta.current_page - 1) * meta.per_page) + 1}-{Math.min(meta.current_page * meta.per_page, meta.total)} of {meta.total} appointments
          </p>
          <nav>
            <ul className="pagination mb-0">
              <li className={`page-item ${meta.current_page <= 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(meta.current_page - 1)}>Previous</button>
              </li>
              {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((page) => (
                <li key={page} className={`page-item ${page === meta.current_page ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
                </li>
              ))}
              <li className={`page-item ${meta.current_page >= meta.last_page ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(meta.current_page + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Create Appointment Modal */}
      <AppointmentFormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSuccess={handleAppointmentCreated}
        patientId={selectedPatientId}
        patients={patients}
        doctors={doctors}
      />
    </div>
  );
};

export default AppointmentListPage;