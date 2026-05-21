import React from 'react';
import { Badge } from 'react-bootstrap';
import { Clock, Droplet } from 'react-bootstrap-icons';
import type { PatientWithUser } from '@/entities/patient/model/patient.types';
import { BLOOD_GROUPS } from '@/entities/patient/model/patient.constants';

interface RecentPatientsListProps {
  patients: PatientWithUser[];
}

export const RecentPatientsList: React.FC<RecentPatientsListProps> = ({ patients }) => {
  const timeAgo = ['5 min ago', '15 min ago', '30 min ago', '1 hour ago', '2 hours ago'];

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center py-3">
        <h5 className="fw-bold mb-0">Recent Patients</h5>
        <Badge bg="info" className="rounded-pill">
          {patients.length} new
        </Badge>
      </div>
      <div className="card-body p-0" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {patients.map((patient, index) => (
          <div
            key={patient.id}
            className="d-flex align-items-center justify-content-between p-3 border-bottom hover:bg-light cursor-pointer"
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle bg-info bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '42px', height: '42px' }}
              >
                <span className="fw-bold text-info small">
                  {patient.user.first_name[0]}{patient.user.last_name[0]}
                </span>
              </div>
              <div>
                <p className="mb-0 fw-semibold small">
                  {patient.user.first_name} {patient.user.last_name}
                </p>
                <small className="text-muted">
                  {new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear()} yrs • {patient.gender}
                </small>
                <div className="d-flex align-items-center gap-2 mt-1">
                  <small className="text-muted d-flex align-items-center gap-1">
                    <Droplet size={10} className="text-danger" />
                    {patient.blood_group}
                  </small>
                  {patient.medical_conditions.length > 0 && (
                    <Badge bg="warning" className="py-0" style={{ fontSize: '0.65rem' }}>
                      {patient.medical_conditions[0]}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="text-end">
              <small className="text-muted d-flex align-items-center gap-1">
                <Clock size={12} />
                {timeAgo[index] || 'Recently'}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};