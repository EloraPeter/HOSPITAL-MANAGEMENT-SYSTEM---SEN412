import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { patientService } from '@/shared/api/services/patientService';
import { LoadingSpinner } from '@/shared/ui/feedback/LoadingSpinner';

import { useAuthStore } from '@/app/store/authStore';
import type { Patient } from '@/shared/api/types/patient.types';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog';

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hasRole } = useAuthStore();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const canEdit = hasRole(['admin', 'receptionist']);
  const canDelete = hasRole(['admin', 'receptionist']);

  const fetchPatient = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await patientService.getById(Number(id));
      setPatient(data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError('Patient not found.');
      } else {
        setError(err.response?.data?.message || 'Failed to load patient details.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPatient();
  }, [fetchPatient]);

  const handleDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      await patientService.delete(Number(id));
      navigate('/patients', { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete patient.');
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  // Calculate age from date_of_birth
  const calculateAge = (dateOfBirth: string): number => {
    if (!dateOfBirth) return 0;
    const birth = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading patient details..." />;
  }

  if (error && !patient) {
    return (
      <div className="container-fluid p-4 text-center">
        <div className="mb-3">
          <span style={{ fontSize: '3rem' }}>!</span>
        </div>
        <h5 className="text-danger">Error</h5>
        <p className="text-muted">{error}</p>
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-outline-primary" onClick={() => navigate('/patients')}>
            Back to Patients
          </button>
          <button className="btn btn-primary" onClick={fetchPatient}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!patient) return null;

  const age = calculateAge(patient.date_of_birth);
  const initials = patient.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="container-fluid p-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a
              href="/patients"
              onClick={(e) => {
                e.preventDefault();
                navigate('/patients');
              }}
            >
              Patients
            </a>
          </li>
          <li className="breadcrumb-item active">{patient.name}</li>
        </ol>
      </nav>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)} />
        </div>
      )}

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="h3 mb-1">{patient.name}</h1>
          <p className="text-muted mb-0">Patient ID: {patient.id}</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary">
            <i className="bi bi-file-text me-2"></i>
            Medical Record
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/appointments/create?patientId=${patient.id}`)}
          >
            <i className="bi bi-calendar-plus me-2"></i>
            Schedule Appointment
          </button>
          {canDelete && (
            <button
              className="btn btn-outline-danger"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <i className="bi bi-trash me-2"></i>
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="row">
        {/* Main Content */}
        <div className="col-lg-8">
          {/* Patient Info Card */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="d-flex align-items-center">
                  <div
                    className="bg-primary text-white d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                    style={{ width: '64px', height: '64px', borderRadius: '50%', fontSize: '24px', fontWeight: 'bold' }}
                  >
                    {initials}
                  </div>
                  <div>
                    <h4 className="mb-1">{patient.name}</h4>
                    <p className="text-muted mb-0">ID: {patient.id} | User ID: {patient.user_id}</p>
                  </div>
                </div>
                <span className="badge bg-success fs-6">Active</span>
              </div>

              <div className="row mb-4">
                {patient.date_of_birth && (
                  <div className="col-md-6 mb-3">
                    <small className="text-muted d-block">Date of Birth</small>
                    <span>
                      {new Date(patient.date_of_birth).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}{' '}
                      ({age} years)
                    </span>
                  </div>
                )}
                {patient.blood_type && (
                  <div className="col-md-6 mb-3">
                    <small className="text-muted d-block">Blood Type</small>
                    <span className="badge bg-danger">{patient.blood_type}</span>
                  </div>
                )}
                <div className="col-md-6 mb-3">
                  <small className="text-muted d-block">Phone</small>
                  <span>{patient.phone || 'N/A'}</span>
                </div>
                <div className="col-md-6 mb-3">
                  <small className="text-muted d-block">Email</small>
                  <span>{patient.email || 'N/A'}</span>
                </div>
                {patient.address && (
                  <div className="col-md-6 mb-3">
                    <small className="text-muted d-block">Address</small>
                    <span>{patient.address}</span>
                  </div>
                )}
                <div className="col-md-6 mb-3">
                  <small className="text-muted d-block">Registered</small>
                  <span>{new Date(patient.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Allergies Alert */}
              {patient.allergies && (
                <div className="alert alert-warning mb-0">
                  <h6 className="alert-heading">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Allergies
                  </h6>
                  <div className="d-flex gap-2 mb-0">
                    <span className="badge bg-warning text-dark">{patient.allergies}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Medical History Placeholder */}
          <div className="card shadow-sm">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <a className="nav-link active" href="#">Overview</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Medical History</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Appointments</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Documents</a>
                </li>
              </ul>
            </div>
            <div className="card-body text-center py-5">
              <i className="bi bi-clipboard2-pulse text-muted" style={{ fontSize: '3rem' }}></i>
              <p className="text-muted mt-3 mb-0">
                Medical records module coming in Phase 6.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          {/* Quick Actions */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Quick Actions</h5>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-outline-primary text-start"
                  onClick={() => navigate(`/appointments/create?patientId=${patient.id}`)}
                >
                  <i className="bi bi-calendar-plus me-2"></i>
                  Schedule Appointment
                </button>
                <button className="btn btn-outline-primary text-start" disabled>
                  <i className="bi bi-clipboard2-pulse me-2"></i>
                  Update Medical Record
                </button>
                <button className="btn btn-outline-primary text-start" disabled>
                  <i className="bi bi-prescription2 me-2"></i>
                  Write Prescription
                </button>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          {patient.emergency_contact && (
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">
                  <i className="bi bi-telephone-plus me-2"></i>
                  Emergency Contact
                </h5>
                <p className="mb-1 fw-medium">{patient.emergency_contact}</p>
                {patient.emergency_contact_phone && (
                  <p className="text-muted mb-0">{patient.emergency_contact_phone}</p>
                )}
              </div>
            </div>
          )}

          {/* Address */}
          {patient.address && (
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">
                  <i className="bi bi-geo-alt me-2"></i>
                  Address
                </h5>
                <p className="mb-0">{patient.address}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        show={showDeleteConfirm}
        onHide={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Patient"
        message={`Are you sure you want to delete ${patient.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        confirmVariant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default PatientDetailPage;