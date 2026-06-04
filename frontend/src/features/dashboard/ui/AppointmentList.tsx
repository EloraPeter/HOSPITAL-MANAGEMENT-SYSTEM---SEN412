import React from 'react';
import { Badge } from 'react-bootstrap';
import { Clock } from 'react-bootstrap-icons';
import type { Appointment } from '@/shared/api/types/appointment.types';

interface AppointmentListProps {
  appointments: Appointment[];
}

const statusColors: Record<string, string> = {
  scheduled: 'warning',
  confirmed: 'primary',
  'in-progress': 'info',
  completed: 'success',
  cancelled: 'danger',
  no_show: 'dark',
};

const statusLabels: Record<string, string> = {
  scheduled: 'Scheduled',
  confirmed: 'Confirmed',
  'in-progress': 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
  no_show: 'No Show',
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
        {appointments.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <Clock size={40} className="mb-2 opacity-50" />
            <p className="mb-0">No appointments for today</p>
          </div>
        ) : (
          appointments.map((apt) => {
            const initials = apt.patient.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .substring(0, 2)
              .toUpperCase();

            return (
              <div
                key={apt.id}
                className="d-flex align-items-center justify-content-between p-3 border-bottom"
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: '42px', height: '42px' }}
                  >
                    <span className="fw-bold text-primary small">{initials}</span>
                  </div>
                  <div>
                    <p className="mb-0 fw-semibold small">{apt.patient.name}</p>
                    <small className="text-muted d-block">
                      Dr. {apt.doctor.name} • {apt.doctor.specialty || 'General'}
                    </small>
                    <small className="text-muted d-flex align-items-center gap-1 mt-1">
                      <Clock size={12} />
                      {apt.time_slot} • {apt.appointment_date}
                    </small>
                  </div>
                </div>
                <div className="text-end">
                  <Badge bg={statusColors[apt.status] || 'secondary'}>
                    {statusLabels[apt.status] || apt.status}
                  </Badge>
                  {apt.notes && (
                    <small className="text-muted d-block mt-1" style={{ maxWidth: '120px' }} title={apt.notes}>
                      {apt.notes.substring(0, 30)}{apt.notes.length > 30 ? '...' : ''}
                    </small>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};