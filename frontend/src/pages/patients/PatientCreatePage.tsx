import { useNavigate } from 'react-router-dom';

export function PatientCreatePage() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    navigate('/patients');
  };

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
          <li className="breadcrumb-item active">Add New Patient</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-4">
        <h1 className="h3 mb-1">Add New Patient</h1>
        <p className="text-muted mb-0">Create a new patient record</p>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <h5 className="card-title mb-4">Personal Information</h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label">First Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Date of Birth <span className="text-danger">*</span></label>
                    <input type="date" className="form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Gender <span className="text-danger">*</span></label>
                    <select className="form-select" required>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Blood Group</label>
                    <select className="form-select">
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>

                {/* Contact Information */}
                <h5 className="card-title mb-4">Contact Information</h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label">Email <span className="text-danger">*</span></label>
                    <input type="email" className="form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone <span className="text-danger">*</span></label>
                    <input type="tel" className="form-control" required />
                  </div>
                </div>

                {/* Address */}
                <h5 className="card-title mb-4">Address</h5>
                <div className="row g-3 mb-4">
                  <div className="col-12">
                    <label className="form-label">Street Address <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">State <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">ZIP Code <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" required />
                  </div>
                </div>

                {/* Emergency Contact */}
                <h5 className="card-title mb-4">Emergency Contact</h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label">Contact Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Relationship</label>
                    <select className="form-select">
                      <option value="">Select Relationship</option>
                      <option value="spouse">Spouse</option>
                      <option value="parent">Parent</option>
                      <option value="sibling">Sibling</option>
                      <option value="child">Child</option>
                      <option value="friend">Friend</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Contact Phone</label>
                    <input type="tel" className="form-control" />
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="d-flex justify-content-end gap-2 border-top pt-4">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/patients')}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-check-lg me-2"></i>
                    Create Patient
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar Help */}
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">
                <i className="bi bi-info-circle me-2"></i>
                Information
              </h5>
              <p className="text-muted mb-2">
                Please fill in all required fields marked with <span className="text-danger">*</span>
              </p>
              <ul className="text-muted mb-0">
                <li className="mb-2">Ensure email and phone number are valid</li>
                <li className="mb-2">Emergency contact is optional but recommended</li>
                <li>You can update this information later</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}