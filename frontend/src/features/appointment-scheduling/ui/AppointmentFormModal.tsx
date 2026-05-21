import { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { APPOINTMENT_TYPES, TIME_SLOTS } from '@/entities/appointment/model/appointment.constants';

interface AppointmentFormModalProps {
  show: boolean;
  onHide: () => void;
  patientId?: string | null;
}

export const AppointmentFormModal: React.FC<AppointmentFormModalProps> = ({ 
  show, 
  onHide, 
  patientId 
}) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: patientId || '',
    doctorName: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    type: 'Consultation',
    reason: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New appointment:', formData);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-calendar-plus me-2"></i>
          Schedule New Appointment
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search or enter patient name"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Doctor</Form.Label>
                <Form.Select
                  value={formData.doctorName}
                  onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                  required
                >
                  <option value="">Select Doctor</option>
                  <option value="Dr. Sarah Johnson">Dr. Sarah Johnson - Cardiology</option>
                  <option value="Dr. Michael Brown">Dr. Michael Brown - Pediatrics</option>
                  <option value="Dr. Emily White">Dr. Emily White - Neurology</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Time</Form.Label>
                <Form.Select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                >
                  <option value="">Select Time</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                >
                  {APPOINTMENT_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Reason for Visit</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Brief description of the visit"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Additional notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Schedule Appointment
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};