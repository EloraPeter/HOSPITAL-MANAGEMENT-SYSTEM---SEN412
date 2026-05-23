import { Card, Badge } from 'react-bootstrap';
import { Mail, Phone, MapPin, Briefcase, Award } from 'lucide-react';
import type { StaffMember } from '@/entities/staff/model/staff.types';

interface StaffCardProps {
  staff: StaffMember;
  onClick?: (staff: StaffMember) => void;
}

const statusColors: Record<string, string> = {
  active: 'success',
  'on-leave': 'warning',
  suspended: 'danger',
  terminated: 'secondary',
  probation: 'info',
};

export const StaffCard: React.FC<StaffCardProps> = ({ staff, onClick }) => {
  const { personalInfo, professionalInfo, status, type } = staff;

  return (
    <Card
      className="shadow-sm h-100"
      style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
      onClick={() => onClick?.(staff)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
      }}
    >
      <Card.Body>
        {/* Header */}
        <div className="d-flex align-items-start gap-3 mb-3">
          <div
            className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0"
            style={{ width: '48px', height: '48px', fontSize: '1.1rem', fontWeight: 600 }}
          >
            <span className="text-primary">
              {personalInfo.firstName[0]}{personalInfo.lastName[0]}
            </span>
          </div>
          <div className="flex-grow-1 min-w-0">
            <h6 className="fw-semibold mb-0 text-truncate">
              {personalInfo.firstName} {personalInfo.lastName}
            </h6>
            <small className="text-muted text-truncate d-block">
              {professionalInfo.designation}
            </small>
          </div>
          <Badge bg={statusColors[status]} className="text-capitalize flex-shrink-0">
            {status.replace('-', ' ')}
          </Badge>
        </div>

        {/* Details */}
        <div className="d-flex flex-column gap-2">
          <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '0.85rem' }}>
            <Mail size={14} className="flex-shrink-0" />
            <span className="text-truncate">{personalInfo.contactInfo.email}</span>
          </div>
          <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '0.85rem' }}>
            <Phone size={14} className="flex-shrink-0" />
            <span>{personalInfo.contactInfo.phone}</span>
          </div>
          <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '0.85rem' }}>
            <MapPin size={14} className="flex-shrink-0" />
            <span>{professionalInfo.department}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="d-flex gap-2 mt-3">
          <Badge bg="light" text="dark" className="text-capitalize">
            <Briefcase size={12} className="me-1" />
            {type}
          </Badge>
          <Badge bg="light" text="dark">
            <Award size={12} className="me-1" />
            {professionalInfo.yearsOfExperience} yrs exp.
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );
};