import React from 'react';
import { Badge } from 'react-bootstrap';
import { Clock } from 'react-bootstrap-icons';
import type { AppointmentWithDetails } from '@/entities/appointment/model/appointment.types';
import { APPOINTMENT_STATUSES } from '@/entities/appointment/model/appointment.constants';

interface AppointmentListProps {
  appointments: AppointmentWithDetails[];
}

const statusColors: Record<string, string> = {
  pending: 'secondary',
  approved: 'info',
  confirmed: 'primary',
  'in-progress': 'warning',
  completed: 'success',
  cancelled: 'danger',
  'no-show': 'dark',
};

export const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center py-3">
        <h5 className="fw-bold mb-0">Today's Appointments</h5>
        <Badge bg="primary" className="rounded-pill">
          {appointments.length}
        </Badge>
      </div>
      <div className="card-body p-0" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="d-flex align-items-center justify-content-between p-3 border-bottom hover:bg-light cursor-pointer"
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '42px', height: '42px' }}
              >
                <span className="fw-bold text-primary small">
                  {apt.patient.user.first_name[0]}{apt.patient.user.last_name[0]}
                </span>
              </div>
              <div>
                <p className="mb-0 fw-semibold small">
                  {apt.patient.user.first_name} {apt.patient.user.last_name}
                </p>
                <small className="text-muted d-block">
                  {apt.doctor.user.first_name} {apt.doctor.user.last_name} • {apt.doctor.specialty}
                </small>
                <small className="text-muted d-flex align-items-center gap-1 mt-1">
                  <Clock size={12} />
                  {apt.time_slot} • {apt.type}
                </small>
              </div>
            </div>
            <div className="text-end">
              <Badge bg={statusColors[apt.status] || 'secondary'} className="text-capitalize">
                {APPOINTMENT_STATUSES[apt.status]}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};