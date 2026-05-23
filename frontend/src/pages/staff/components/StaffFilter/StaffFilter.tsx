import { Form, Row, Col, Button } from 'react-bootstrap';
import { X } from 'lucide-react';
import { DEPARTMENTS, STAFF_TYPES, STAFF_STATUSES } from '@/entities/staff/model/staff.constants';
import type { StaffFilters as StaffFiltersType } from '@/entities/staff/model/staff.types';

interface StaffFiltersProps {
  filters: StaffFiltersType;
  onFilterChange: (filters: Partial<StaffFiltersType>) => void;
  onClose: () => void;
}

export const StaffFilters: React.FC<StaffFiltersProps> = ({ filters, onFilterChange, onClose }) => {
  return (
    <div className="card shadow-sm border">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-semibold mb-0">Filters</h6>
          <Button variant="link" className="p-0 text-dark" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>

        <Row className="g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label className="small fw-medium">Department</Form.Label>
              <Form.Select
                value={filters.department}
                onChange={(e) => onFilterChange({ department: e.target.value })}
              >
                <option value="">All Departments</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept.toLowerCase()}>
                    {dept}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label className="small fw-medium">Staff Type</Form.Label>
              <Form.Select
                value={filters.type}
                onChange={(e) => onFilterChange({ type: e.target.value })}
              >
                <option value="">All Types</option>
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
              <Form.Label className="small fw-medium">Status</Form.Label>
              <Form.Select
                value={filters.status}
                onChange={(e) => onFilterChange({ status: e.target.value })}
              >
                <option value="">All Statuses</option>
                {STAFF_STATUSES.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <div className="mt-3">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() =>
              onFilterChange({ department: '', type: '', status: '' })
            }
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};