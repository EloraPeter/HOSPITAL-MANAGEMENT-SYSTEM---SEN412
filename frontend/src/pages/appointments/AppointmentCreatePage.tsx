import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function AppointmentCreatePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedPatientId = searchParams.get('patientId');

  const [step, setStep] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(preselectedPatientId || '');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('consultation');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    navigate('/appointments');
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  return (
    <div className="container-fluid p-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/appointments" onClick={(e) => { e.preventDefault(); navigate('/appointments'); }}>
              Appointments
            </a>
          </li>
          <li className="breadcrumb-item active">Schedule Appointment</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-4">
        <h1 className="h3 mb-1">Schedule Appointment</h1>
        <p className="text-muted mb-0">Create a new patient appointment</p>
      </div>

      {/* Steps Indicator */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-center">
            <div className="d-flex align-items-center">
              <div className={`rounded-circle d-flex align-items-center justify-content-center ${step >= 1 ? 'bg-primary text-white' : 'bg-light'}`} style={{ width: '32px', height: '32px' }}>
                {step > 1 ? <i className="bi bi-check"></i> : '1'}
              </div>
              <span className={`ms-2 ${step === 1 ? 'fw-bold' : ''}`}>Patient</span>
            </div>
            <div className={`mx-4 flex-grow-1 ${step >= 2 ? 'bg-primary' : 'bg-light'}`} style={{ height: '2px', width: '100px' }}></div>
            <div className="d-flex align-items-center">
              <div className={`rounded-circle d-flex align-items-center justify-content-center ${step >= 2 ? 'bg-primary text-white' : 'bg-light'}`} style={{ width: '32px', height: '32px' }}>
                {step > 2 ? <i className="bi bi-check"></i> : '2'}
              </div>
              <span className={`ms-2 ${step === 2 ? 'fw-bold' : ''}`}>Details</span>
            </div>
            <div className={`mx-4 flex-grow-1 ${step >= 3 ? 'bg-primary' : 'bg-light'}`} style={{ height: '2px', width: '100px' }}></div>
            <div className="d-flex align-items-center">
              <div className={`rounded-circle d-flex align-items-center justify-content-center ${step >= 3 ? 'bg-primary text-white' : 'bg-light'}`} style={{ width: '32px', height: '32px' }}>
                3
              </div>
              <span className={`ms-2 ${step === 3 ? 'fw-bold' : ''}`}>Confirm</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Select Patient */}
                {step === 1 && (
                  <div>
                    <h5 className="card-title mb-4">Select Patient</h5>
                    <div className="mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search patient by name or MRN..."
                        value={selectedPatient}
                        onChange={(e) => setSelectedPatient(e.target.value)}
                      />
                    </div>
                    {selectedPatient && (
                      <div className="alert alert-info">
                        <h6 className="alert-heading">Selected Patient</h6>
                        <p className="mb-1">John Doe</p>
                        <small>MRN: 10001</small>
                      </div>
                    )}
                    <div className="d-flex justify-content-end">
                      <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={() => setStep(2)}
                        disabled={!selectedPatient}
                      >
                        Continue
                        <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Appointment Details */}
                {step === 2 && (
                  <div>
                    <h5 className="card-title mb-4">Appointment Details</h5>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <label className="form-label">Doctor</label>
                        <select 
                          className="form-select"
                          value={selectedDoctor}
                          onChange={(e) => setSelectedDoctor(e.target.value)}
                        >
                          <option value="">Select Doctor</option>
                          <option value="1">Dr. Sarah Johnson - Cardiology</option>
                          <option value="2">Dr. Michael Brown - Pediatrics</option>
                          <option value="3">Dr. Emily Davis - Orthopedics</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Appointment Type</label>
                        <select 
                          className="form-select"
                          value={appointmentType}
                          onChange={(e) => setAppointmentType(e.target.value)}
                        >
                          <option value="consultation">Consultation (30 min)</option>
                          <option value="follow-up">Follow-up (20 min)</option>
                          <option value="procedure">Procedure (60 min)</option>
                          <option value="emergency">Emergency (45 min)</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Date</label>
                        <input 
                          type="date" 
                          className="form-control"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Reason for Visit <span className="text-danger">*</span></label>
                        <textarea 
                          className="form-control" 
                          rows={3}
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          placeholder="Brief description of the reason for visit..."
                        ></textarea>
                      </div>
                      <div className="col-12">
                        <label className="form-label">Additional Notes</label>
                        <textarea 
                          className="form-control" 
                          rows={2}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Any special instructions or notes..."
                        ></textarea>
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div className="mt-4">
                      <label className="form-label">Available Time Slots</label>
                      <div className="row g-2">
                        {timeSlots.map((slot) => (
                          <div key={slot} className="col-3">
                            <button
                              type="button"
                              className={`btn w-100 ${selectedTime === slot ? 'btn-primary' : 'btn-outline-primary'}`}
                              onClick={() => setSelectedTime(slot)}
                            >
                              {slot}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={() => setStep(1)}
                      >
                        <i className="bi bi-arrow-left me-2"></i>
                        Back
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={() => setStep(3)}
                        disabled={!selectedDoctor || !selectedTime || !reason}
                      >
                        Review
                        <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Confirm */}
                {step === 3 && (
                  <div>
                    <h5 className="card-title mb-4">Confirm Appointment</h5>
                    <div className="card bg-light mb-4">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <small className="text-muted d-block">Patient</small>
                            <span className="fw-medium">John Doe</span>
                          </div>
                          <div className="col-md-6 mb-3">
                            <small className="text-muted d-block">Doctor</small>
                            <span className="fw-medium">Dr. Sarah Johnson</span>
                          </div>
                          <div className="col-md-6 mb-3">
                            <small className="text-muted d-block">Date & Time</small>
                            <span className="fw-medium">{selectedDate} at {selectedTime}</span>
                          </div>
                          <div className="col-md-6 mb-3">
                            <small className="text-muted d-block">Type</small>
                            <span className="fw-medium text-capitalize">{appointmentType}</span>
                          </div>
                          <div className="col-12 mb-3">
                            <small className="text-muted d-block">Reason</small>
                            <span className="fw-medium">{reason}</span>
                          </div>
                          {notes && (
                            <div className="col-12">
                              <small className="text-muted d-block">Notes</small>
                              <span className="fw-medium">{notes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={() => setStep(2)}
                      >
                        <i className="bi bi-arrow-left me-2"></i>
                        Back
                      </button>
                      <button type="submit" className="btn btn-success">
                        <i className="bi bi-calendar-check me-2"></i>
                        Schedule Appointment
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}