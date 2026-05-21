import React from 'react';
import { Badge } from 'react-bootstrap';
import type { RecentPatientSummary } from '../model/dashboard.types';

interface RecentPatientsListProps {
  patients: RecentPatientSummary[];
}

const statusColors: Record<string, string> = {
  admitted: 'danger',
  discharged: 'success',
  observation: 'warning',
};

export const RecentPatientsList: React.FC<RecentPatientsListProps> = ({ patients }) => {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
        <h5 className="fw-bold">Recent Patients</h5>
      </div>
      <div className="card-body">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="d-flex align-items-center justify-content-between py-2 border-bottom"
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle bg-info bg-opacity-10 d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px' }}
              >
                <span className="fw-bold text-info">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="mb-0 fw-semibold small">{patient.name}</p>
                <small className="text-muted">
                  {patient.age} yrs • {patient.gender} • {patient.reason}
                </small>
              </div>
            </div>
            <div className="text-end">
              <small className="text-muted d-block">{patient.time}</small>
              <Badge bg={statusColors[patient.status] || 'secondary'} className="mt-1">
                {patient.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};