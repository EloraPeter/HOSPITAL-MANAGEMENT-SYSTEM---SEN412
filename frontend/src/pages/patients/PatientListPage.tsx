import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PatientFormModal } from '@/features/patient-records/ui/PatientFormModal';
import { patientService } from '@/shared/api/services/patientService';
import { LoadingSpinner } from '@/shared/ui/feedback/LoadingSpinner';
import { useAuthStore } from '@/app/store/authStore';
import type { Patient } from '@/shared/api/types/patient.types';

const PatientListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { hasRole } = useAuthStore();

  const [showModal, setShowModal] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<{ total: number; per_page: number; current_page: number; last_page: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const currentPage = Number(searchParams.get('page')) || 1;

  const fetchPatients = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await patientService.getAll({ page, per_page: 15 });
      setPatients(response.data);
      setMeta(response.meta);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load patients');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatients(currentPage);
  }, [currentPage, fetchPatients]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  const handlePatientCreated = () => {
    fetchPatients(currentPage);
  };

  const canCreatePatient = hasRole(['admin', 'receptionist']);
  const canDeletePatient = hasRole(['admin', 'receptionist']);

  // Filter patients client-side for search
  const filteredPatients = patients.filter((patient) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      patient.name.toLowerCase().includes(term) ||
      patient.email?.toLowerCase().includes(term) ||
      patient.phone?.toLowerCase().includes(term) ||
      patient.blood_type?.toLowerCase().includes(term)
    );
  });

  if (isLoading && patients.length === 0) {
    return <LoadingSpinner text="Loading patients..." />;
  }

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Patients</h1>
          <p className="text-muted mb-0">
            {meta ? `${meta.total} total patients` : 'Manage patient records and information'}
          </p>
        </div>
        {canCreatePatient && (
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            <i className="bi bi-plus-lg me-2"></i>
            Add Patient
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Search patients by name, phone, or blood type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => fetchPatients(currentPage)}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
          <span>!</span>
          <span>{error}</span>
          <button className="btn btn-outline-danger btn-sm ms-auto" onClick={() => fetchPatients(currentPage)}>
            Retry
          </button>
        </div>
      )}

      {/* Patient Table */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Patient</th>
                  <th>Contact</th>
                  <th>Blood Type</th>
                  <th>Emergency Contact</th>
                  <th>Allergies</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-muted">
                      {searchTerm ? 'No patients match your search.' : 'No patients registered yet.'}
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr key={patient.id} onClick={() => navigate(`/patients/${patient.id}`)} style={{ cursor: 'pointer' }}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div
                            className="bg-primary bg-opacity-10 text-primary me-3 d-flex align-items-center justify-content-center fw-bold"
                            style={{ width: '40px', height: '40px', borderRadius: '50%', fontSize: '0.9rem' }}
                          >
                            {patient.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="mb-0 fw-medium">{patient.name}</p>
                            <small className="text-muted">ID: {patient.id}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <p className="mb-0">{patient.phone || 'N/A'}</p>
                          <small className="text-muted">{patient.email}</small>
                        </div>
                      </td>
                      <td>
                        {patient.blood_type ? (
                          <span className="badge bg-danger bg-opacity-10 text-danger">{patient.blood_type}</span>
                        ) : (
                          <span className="text-muted">N/A</span>
                        )}
                      </td>
                      <td>
                        {patient.emergency_contact ? (
                          <div>
                            <small className="d-block">{patient.emergency_contact}</small>
                            <small className="text-muted">{patient.emergency_contact_phone}</small>
                          </div>
                        ) : (
                          <span className="text-muted">N/A</span>
                        )}
                      </td>
                      <td>
                        {patient.allergies ? (
                          <span className="badge bg-warning bg-opacity-10 text-warning">{patient.allergies}</span>
                        ) : (
                          <span className="text-muted">None</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/patients/${patient.id}`);
                          }}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/appointments');
                          }}
                        >
                          Schedule
                        </button>
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
            Showing {((meta.current_page - 1) * meta.per_page) + 1}-{Math.min(meta.current_page * meta.per_page, meta.total)} of {meta.total} patients
          </p>
          <nav>
            <ul className="pagination mb-0">
              <li className={`page-item ${meta.current_page <= 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(meta.current_page - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((page) => (
                <li key={page} className={`page-item ${page === meta.current_page ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(page)}>
                    {page}
                  </button>
                </li>
              ))}
              <li className={`page-item ${meta.current_page >= meta.last_page ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(meta.current_page + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Patient Form Modal */}
      <PatientFormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSuccess={handlePatientCreated}
      />
    </div>
  );
};

export default PatientListPage;