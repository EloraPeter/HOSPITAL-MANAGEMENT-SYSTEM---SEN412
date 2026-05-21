import { useParams, useNavigate } from 'react-router-dom';

export function PatientDetailPage() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/patients" onClick={(e) => { e.preventDefault(); navigate('/patients'); }}>
              Patients
            </a>
          </li>
          <li className="breadcrumb-item active">John Doe</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">John Doe</h1>
          <p className="text-muted mb-0">MRN: 10001</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary">
            <i className="bi bi-file-text me-2"></i>
            Medical Record
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => navigate(`/appointments/create?patientId=${patientId}`)}
          >
            <i className="bi bi-calendar-plus me-2"></i>
            Schedule Appointment
          </button>
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
                    className="bg-primary text-white d-flex align-items-center justify-content-center me-3" 
                    style={{ width: '64px', height: '64px', borderRadius: '50%', fontSize: '24px' }}
                  >
                    JD
                  </div>
                  <div>
                    <h4 className="mb-1">John Doe</h4>
                    <p className="text-muted mb-0">MRN: 10001</p>
                  </div>
                </div>
                <span className="badge bg-success fs-6">Active</span>
              </div>

              <div className="row mb-4">
                <div className="col-md-6 mb-3">
                  <small className="text-muted d-block">Date of Birth</small>
                  <span>January 15, 1990 (34 years)</span>
                </div>
                <div className="col-md-6 mb-3">
                  <small className="text-muted d-block">Blood Group</small>
                  <span className="badge bg-danger">O+</span>
                </div>
                <div className="col-md-6 mb-3">
                  <small className="text-muted d-block">Phone</small>
                  <span>(555) 123-4567</span>
                </div>
                <div className="col-md-6 mb-3">
                  <small className="text-muted d-block">Email</small>
                  <span>john.doe@email.com</span>
                </div>
              </div>

              {/* Allergies Alert */}
              <div className="alert alert-warning mb-0">
                <h6 className="alert-heading">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Allergies
                </h6>
                <div className="d-flex gap-2 mb-0">
                  <span className="badge bg-warning text-dark">Penicillin - Severe</span>
                  <span className="badge bg-warning text-dark">Peanuts - Mild</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
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
                <li className="nav-item">
                  <a className="nav-link" href="#">Billing</a>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title mb-4">Recent Medical History</h5>
              
              <div className="timeline">
                <div className="d-flex mb-4">
                  <div className="me-3">
                    <div className="bg-primary rounded-circle" style={{ width: '12px', height: '12px', marginTop: '4px' }}></div>
                  </div>
                  <div>
                    <h6 className="mb-1">General Checkup</h6>
                    <small className="text-muted">December 10, 2024 - Dr. Sarah Johnson</small>
                    <p className="mb-0 mt-2">Routine annual checkup. Blood pressure normal. Recommended continued exercise regimen.</p>
                  </div>
                </div>
                <div className="d-flex mb-4">
                  <div className="me-3">
                    <div className="bg-info rounded-circle" style={{ width: '12px', height: '12px', marginTop: '4px' }}></div>
                  </div>
                  <div>
                    <h6 className="mb-1">Blood Test Results</h6>
                    <small className="text-muted">November 25, 2024</small>
                    <p className="mb-0 mt-2">All results within normal range. Vitamin D slightly low, prescribed supplements.</p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="me-3">
                    <div className="bg-warning rounded-circle" style={{ width: '12px', height: '12px', marginTop: '4px' }}></div>
                  </div>
                  <div>
                    <h6 className="mb-1">Flu Vaccination</h6>
                    <small className="text-muted">October 5, 2024</small>
                    <p className="mb-0 mt-2">Annual flu shot administered. No adverse reactions.</p>
                  </div>
                </div>
              </div>
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
                  onClick={() => navigate(`/appointments/create?patientId=${patientId}`)}
                >
                  <i className="bi bi-calendar-plus me-2"></i>
                  Schedule Appointment
                </button>
                <button className="btn btn-outline-primary text-start">
                  <i className="bi bi-clipboard2-pulse me-2"></i>
                  Update Medical Record
                </button>
                <button className="btn btn-outline-primary text-start">
                  <i className="bi bi-prescription2 me-2"></i>
                  Write Prescription
                </button>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">
                <i className="bi bi-telephone-plus me-2"></i>
                Emergency Contact
              </h5>
              <p className="mb-1 fw-medium">Jane Doe</p>
              <p className="text-muted mb-1">Spouse</p>
              <p className="text-muted mb-0">(555) 999-8888</p>
            </div>
          </div>

          {/* Insurance Info */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">
                <i className="bi bi-shield-check me-2"></i>
                Insurance Information
              </h5>
              <p className="mb-1 fw-medium">BlueCross Health Insurance</p>
              <p className="text-muted mb-1">Policy: BCH-2024-12345</p>
              <p className="text-muted mb-0">Group: GRP-98765</p>
            </div>
          </div>

          {/* Address */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">
                <i className="bi bi-geo-alt me-2"></i>
                Address
              </h5>
              <p className="mb-1">123 Main Street</p>
              <p className="mb-1">Apt 4B</p>
              <p className="mb-1">New York, NY 10001</p>
              <p className="text-muted mb-0">United States</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}