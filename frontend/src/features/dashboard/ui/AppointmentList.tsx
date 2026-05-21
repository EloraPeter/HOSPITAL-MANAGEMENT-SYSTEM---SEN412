import React from 'react';
import { Badge } from 'react-bootstrap';
import type { AppointmentSummary } from '../model/dashboard.types';

interface AppointmentListProps {
  appointments: AppointmentSummary[];
}

const statusColors: Record<string, string> = {
  completed: 'success',
  'in-progress': 'primary',
  scheduled: 'warning',
  cancelled: 'danger',
  'no-show': 'secondary',
};

export const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
        <h5 className="fw-bold">Today's Appointments</h5>
      </div>
      <div className="card-body">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="d-flex align-items-center justify-content-between py-2 border-bottom last:border-0"
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px' }}
              >
                <span className="fw-bold text-primary">
                  {apt.patientName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="mb-0 fw-semibold small">{apt.patientName}</p>
                <small className="text-muted">{apt.doctorName}</small>
              </div>
            </div>
            <div className="text-end">
              <small className="text-muted d-block">{apt.time}</small>
              <Badge bg={statusColors[apt.status] || 'secondary'} className="mt-1">
                {apt.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};