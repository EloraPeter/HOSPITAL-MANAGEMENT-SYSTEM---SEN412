import { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { DEPARTMENTS, STAFF_TYPES, STAFF_STATUSES } from '@/entities/staff/model/staff.constants';
import type { StaffMember } from '@/entities/staff/model/staff.types';

interface StaffFormModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess?: () => void;
}

export const StaffFormModal: React.FC<StaffFormModalProps> = ({ show, onHide, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: 'male',
    type: '',
    department: '',
    designation: '',
    licenseNumber: '',
    yearsOfExperience: '',
    joiningDate: new Date().toISOString().split('T')[0],
    status: 'active',
    shift: '',
    qualifications: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('New staff data:', formData);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        gender: 'male',
        type: '',
        department: '',
        designation: '',
        licenseNumber: '',
        yearsOfExperience: '',
        joiningDate: new Date().toISOString().split('T')[0],
        status: 'active',
        shift: '',
        qualifications: '',
      });
      
      onSuccess?.();
      onHide();
    } catch (error) {
      console.error('Error adding staff:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          <span className="me-2">➕</span>
          Add New Staff Member
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row className="g-3">
            {/* Personal Information */}
            <Col md={12}>
              <h6 className="fw-bold text-primary mb-2">Personal Information</h6>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-medium">First Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-medium">Last Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-medium">Email *</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="staff@hospital.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-medium">Phone *</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={8}>
              <Form.Group>
                <Form.Label className="small fw-medium">Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="small fw-medium">Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                />
              </Form.Group>
            </Col>

            {/* Professional Information */}
            <Col md={12}>
              <hr />
              <h6 className="fw-bold text-primary mb-2">Professional Information</h6>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="small fw-medium">Staff Type *</Form.Label>
                <Form.Select
                  value={formData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  required
                >
                  <option value="">Select type</option>
                  {STAFF_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="small fw-medium">Department *</Form.Label>
                <Form.Select
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  required
                >
                  <option value="">Select department</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="small fw-medium">Designation *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., Senior Doctor"
                  value={formData.designation}
                  onChange={(e) => handleChange('designation', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="small fw-medium">License Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., MED-12345"
                  value={formData.licenseNumber}
                  onChange={(e) => handleChange('licenseNumber', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="small fw-medium">Experience (Years)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0"
                  value={formData.yearsOfExperience}
                  onChange={(e) => handleChange('yearsOfExperience', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="small fw-medium">Joining Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) => handleChange('joiningDate', e.target.value)}
                />
              </Form.Group>
            </Col>

            {/* Status & Shift */}
            <Col md={12}>
              <hr />
              <h6 className="fw-bold text-primary mb-2">Employment Details</h6>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-medium">Status</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  {STAFF_STATUSES.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-medium">Shift</Form.Label>
                <Form.Select
                  value={formData.shift}
                  onChange={(e) => handleChange('shift', e.target.value)}
                >
                  <option value="">Select shift</option>
                  <option value="morning">Morning (6AM - 2PM)</option>
                  <option value="afternoon">Afternoon (2PM - 10PM)</option>
                  <option value="night">Night (10PM - 6AM)</option>
                  <option value="general">General (9AM - 5PM)</option>
                </Form.Select>
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
                <span className="spinner-border spinner-border-sm me-2" role="status" />
                Adding Staff...
              </>
            ) : (
              'Add Staff Member'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};