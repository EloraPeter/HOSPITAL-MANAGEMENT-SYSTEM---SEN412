import { useState } from 'react';
import { Modal, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { appointmentService } from '@/shared/api/services/appointmentService';
import type { Patient } from '@/shared/api/types/patient.types';
import type { Doctor } from '@/shared/api/types/doctor.types';

interface AppointmentFormModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess?: () => void;
  patientId?: number;
  patients: Patient[];
  doctors: Doctor[];
}

export const AppointmentFormModal: React.FC<AppointmentFormModalProps> = ({
  show,
  onHide,
  onSuccess,
  patientId,
  patients,
  doctors,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  const [formData, setFormData] = useState({
    patient_id: patientId || 0,
    doctor_id: 0,
    appointment_date: new Date().toISOString().split('T')[0],
    time_slot: '',
    status: 'scheduled' as const,
    notes: '',
  });

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00',
  ];

  // Update when patientId changes
  if (patientId && formData.patient_id !== patientId) {
    setFormData((prev) => ({ ...prev, patient_id: patientId }));
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setValidationErrors({});

    try {
      await appointmentService.create(formData as any);
      setFormData({
        patient_id: 0,
        doctor_id: 0,
        appointment_date: new Date().toISOString().split('T')[0],
        time_slot: '',
        status: 'scheduled',
        notes: '',
      });
      onSuccess?.();
      onHide();
    } catch (err: any) {
      if (err.response?.status === 422) {
        setValidationErrors(err.response.data.errors || {});
        setError(err.response.data.message || 'Validation failed');
      } else {
        setError(err.response?.data?.message || 'Failed to create appointment');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableDoctors = doctors.filter((d) => d.status === 'available');

  return (
    <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-calendar-plus me-2"></i>
          Schedule New Appointment
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Patient <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  value={formData.patient_id}
                  onChange={(e) => handleChange('patient_id', Number(e.target.value))}
                  isInvalid={!!validationErrors.patient_id}
                  required
                >
                  <option value={0}>Select Patient</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </Form.Select>
                {validationErrors.patient_id?.map((msg, i) => (
                  <Form.Control.Feedback key={i} type="invalid">{msg}</Form.Control.Feedback>
                ))}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Doctor <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  value={formData.doctor_id}
                  onChange={(e) => handleChange('doctor_id', Number(e.target.value))}
                  isInvalid={!!validationErrors.doctor_id}
                  required
                >
                  <option value={0}>Select Doctor</option>
                  {availableDoctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      Dr. {d.name} - {d.specialty || 'General'}
                    </option>
                  ))}
                </Form.Select>
                {validationErrors.doctor_id?.map((msg, i) => (
                  <Form.Control.Feedback key={i} type="invalid">{msg}</Form.Control.Feedback>
                ))}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Date <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="date"
                  value={formData.appointment_date}
                  onChange={(e) => handleChange('appointment_date', e.target.value)}
                  isInvalid={!!validationErrors.appointment_date}
                  required
                />
                {validationErrors.appointment_date?.map((msg, i) => (
                  <Form.Control.Feedback key={i} type="invalid">{msg}</Form.Control.Feedback>
                ))}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Time <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  value={formData.time_slot}
                  onChange={(e) => handleChange('time_slot', e.target.value)}
                  isInvalid={!!validationErrors.time_slot}
                  required
                >
                  <option value="">Select Time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </Form.Select>
                {validationErrors.time_slot?.map((msg, i) => (
                  <Form.Control.Feedback key={i} type="invalid">{msg}</Form.Control.Feedback>
                ))}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="confirmed">Confirmed</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Reason for visit or additional notes"
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Scheduling...
              </>
            ) : (
              'Schedule Appointment'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};