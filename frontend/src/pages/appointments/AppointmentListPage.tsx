import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppointmentFormModal } from '@/features/appointment-scheduling/ui/AppointmentFormModal';

export function AppointmentListPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  const handleNewAppointment = (patientId?: string) => {
    setSelectedPatientId(patientId || null);
    setShowModal(true);
  };

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Appointments</h1>
          <p className="text-muted mb-0">Manage and schedule patient appointments</p>
        </div>
        <button
          onClick={() => handleNewAppointment()}
          className="btn btn-primary"
        >
          <i className="bi bi-plus-lg me-2"></i>
          New Appointment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-primary">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">Today's Appointments</p>
                  <h3 className="mb-0">24</h3>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <i className="bi bi-calendar-check text-primary fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-success">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">Checked In</p>
                  <h3 className="mb-0">18</h3>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <i className="bi bi-person-check text-success fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-warning">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">Waiting</p>
                  <h3 className="mb-0">4</h3>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded">
                  <i className="bi bi-clock text-warning fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-info">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">Completed</p>
                  <h3 className="mb-0">2</h3>
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
              <label className="form-label">Date</label>
              <input type="date" className="form-control" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Status</label>
              <select className="form-select">
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="confirmed">Confirmed</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Doctor</label>
              <select className="form-select">
                <option value="all">All Doctors</option>
                <option value="1">Dr. Johnson</option>
                <option value="2">Dr. Smith</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">View</label>
              <div className="btn-group w-100">
                <button className="btn btn-outline-primary active">
                  <i className="bi bi-list me-2"></i>List
                </button>
                <button className="btn btn-outline-primary">
                  <i className="bi bi-calendar me-2"></i>Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>
                      <p className="mb-0 fw-medium">Mar 15, 2025</p>
                      <small className="text-muted">10:00 AM - 10:30 AM</small>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="mb-0">John Doe</p>
                      <small className="text-muted">MRN: 10001</small>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="mb-0">Dr. Sarah Johnson</p>
                      <small className="text-muted">Cardiology</small>
                    </div>
                  </td>
                  <td>Consultation</td>
                  <td>
                    <span className="badge bg-primary">Scheduled</span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline-primary me-1"
                      onClick={() => navigate('/appointments/1')}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-success me-1">
                      <i className="bi bi-check-lg"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      <i className="bi bi-x-lg"></i>
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
        <p className="text-muted mb-0">Showing 1-2 of 45 appointments</p>
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

      {/* Appointment Modal */}
      <AppointmentFormModal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        patientId={selectedPatientId}
      />
    </div>
  );
}


export default AppointmentListPage;