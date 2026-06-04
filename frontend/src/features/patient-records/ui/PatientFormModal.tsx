import { useState } from 'react';
import { Modal, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { patientService } from '@/shared/api/services/patientService';
import type { CreatePatientRequest, BloodType } from '@/shared/api/types/patient.types';

interface PatientFormModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess?: () => void;
}

export const PatientFormModal: React.FC<PatientFormModalProps> = ({ show, onHide, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  const [formData, setFormData] = useState<CreatePatientRequest>({
    name: '',
    email: '',
    password: 'Patient@123',
    phone: '',
    date_of_birth: '',
    blood_type: undefined,
    emergency_contact: '',
    emergency_contact_phone: '',
    allergies: '',
    address: '',
  });

  const bloodTypes: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (field: keyof CreatePatientRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation error for this field
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
      // Prepare data - remove empty optional fields
      const submitData: CreatePatientRequest = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
        date_of_birth: formData.date_of_birth || undefined,
        blood_type: formData.blood_type || undefined,
        emergency_contact: formData.emergency_contact || undefined,
        emergency_contact_phone: formData.emergency_contact_phone || undefined,
        allergies: formData.allergies || undefined,
        address: formData.address || undefined,
      };

      await patientService.create(submitData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: 'Patient@123',
        phone: '',
        date_of_birth: '',
        blood_type: undefined,
        emergency_contact: '',
        emergency_contact_phone: '',
        allergies: '',
        address: '',
      });
      
      onSuccess?.();
      onHide();
    } catch (err: any) {
      if (err.response?.status === 422) {
        setValidationErrors(err.response.data.errors || {});
        setError(err.response.data.message || 'Validation failed');
      } else {
        setError(err.response?.data?.message || 'Failed to create patient');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setError(null);
      setValidationErrors({});
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-person-plus me-2"></i>
          Register New Patient
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
            {/* Full Name - matches backend "name" field */}
            <Col md={12}>
              <Form.Group>
                <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter full name (e.g., Emmanuel Okafor)"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  isInvalid={!!validationErrors.name}
                  required
                />
                {validationErrors.name?.map((msg, i) => (
                  <Form.Control.Feedback key={i} type="invalid">{msg}</Form.Control.Feedback>
                ))}
              </Form.Group>
            </Col>

            {/* Email */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="email"
                  placeholder="patient@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  isInvalid={!!validationErrors.email}
                  required
                />
                {validationErrors.email?.map((msg, i) => (
                  <Form.Control.Feedback key={i} type="invalid">{msg}</Form.Control.Feedback>
                ))}
              </Form.Group>
            </Col>

            {/* Phone */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="08012345678"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  isInvalid={!!validationErrors.phone}
                />
                {validationErrors.phone?.map((msg, i) => (
                  <Form.Control.Feedback key={i} type="invalid">{msg}</Form.Control.Feedback>
                ))}
              </Form.Group>
            </Col>

            {/* Date of Birth */}
            <Col md={4}>
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => handleChange('date_of_birth', e.target.value)}
                />
              </Form.Group>
            </Col>

            {/* Blood Type */}
            <Col md={4}>
              <Form.Group>
                <Form.Label>Blood Type</Form.Label>
                <Form.Select
                  value={formData.blood_type || ''}
                  onChange={(e) => handleChange('blood_type', e.target.value)}
                >
                  <option value="">Select Blood Type</option>
                  {bloodTypes.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Password (auto-generated, hidden) */}
            <Col md={4}>
              <Form.Group>
                <Form.Label>Initial Password</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  isInvalid={!!validationErrors.password}
                />
                <Form.Text className="text-muted">
                  Default: Patient@123
                </Form.Text>
                {validationErrors.password?.map((msg, i) => (
                  <Form.Control.Feedback key={i} type="invalid">{msg}</Form.Control.Feedback>
                ))}
              </Form.Group>
            </Col>

            {/* Address */}
            <Col md={12}>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                />
              </Form.Group>
            </Col>

            {/* Allergies */}
            <Col md={12}>
              <Form.Group>
                <Form.Label>Allergies</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., Penicillin, Latex"
                  value={formData.allergies}
                  onChange={(e) => handleChange('allergies', e.target.value)}
                />
              </Form.Group>
            </Col>

            {/* Emergency Contact */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Emergency Contact Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contact name"
                  value={formData.emergency_contact}
                  onChange={(e) => handleChange('emergency_contact', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Emergency Contact Phone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="08012345678"
                  value={formData.emergency_contact_phone}
                  onChange={(e) => handleChange('emergency_contact_phone', e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Creating...
              </>
            ) : (
              'Register Patient'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};