import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PatientFormModal } from '@/features/patient-records/ui/PatientFormModal';

export function PatientListPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Patients</h1>
          <p className="text-muted mb-0">Manage patient records and information</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary"
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Patient
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search patients by name, MRN, or phone..."
              />
            </div>
            <div className="col-md-3">
              <select className="form-select">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-md-3">
              <button className="btn btn-outline-secondary w-100">
                <i className="bi bi-funnel me-2"></i>
                More Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Table */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Patient</th>
                  <th>Contact</th>
                  <th>Age/Gender</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr onClick={() => navigate('/patients/1')} style={{ cursor: 'pointer' }}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div 
                        className="bg-primary text-white me-3 d-flex align-items-center justify-content-center"
                        style={{ width: '40px', height: '40px', borderRadius: '50%', fontSize: '0.9rem', fontWeight: 'bold' }}
                      >
                        JD
                      </div>
                      <div>
                        <p className="mb-0 fw-medium">John Doe</p>
                        <small className="text-muted">MRN: 10001</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="mb-0">(555) 123-4567</p>
                      <small className="text-muted">john@example.com</small>
                    </div>
                  </td>
                  <td>34 / Male</td>
                  <td>O+</td>
                  <td>
                    <span className="badge bg-success">Active</span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/patients/1');
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
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <p className="text-muted mb-0">Showing 1-2 of 50 patients</p>
        <nav>
          <ul className="pagination mb-0">
            <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
            <li className="page-item active"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>

      {/* Patient Form Modal */}
      <PatientFormModal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
      />
    </div>
  );
}


export default PatientListPage;