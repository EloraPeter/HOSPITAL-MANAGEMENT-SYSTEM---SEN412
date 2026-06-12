import React from 'react';
import type { DepartmentLoad } from '../model/dashboard.types';
import { getOccupancyColor } from '../lib/dashboardHelper';


interface DepartmentLoadChartProps {
  departments: DepartmentLoad[];
}

export const DepartmentLoadChart: React.FC<DepartmentLoadChartProps> = ({ departments }) => {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white border-bottom py-3">
        <h5 className="fw-bold mb-0">Department Occupancy</h5>
      </div>
      <div className="card-body">
        {departments.map((dept) => {
          const color = getOccupancyColor(dept.occupancyRate);
          return (
            <div key={dept.department} className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div>
                  <small className="fw-semibold d-block">{dept.department}</small>
                  <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                    {dept.doctorsCount} doctors • {dept.nursesCount} nurses
                  </small>
                </div>
                <small className={`text-${color} fw-semibold`}>
                  {dept.occupancyRate}%
                </small>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                  {dept.occupiedBeds} occupied
                </small>
                <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                  {dept.availableBeds} available
                </small>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div
                  className={`progress-bar bg-${color}`}
                  style={{ width: `${dept.occupancyRate}%` }}
                  role="progressbar"
                  aria-valuenow={dept.occupancyRate}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <small className="text-muted mt-1 d-block" style={{ fontSize: '0.7rem' }}>
                {dept.patientsCount} patients • {dept.totalBeds} total beds
              </small>
            </div>
          );
        })}
      </div>
    </div>
  );
};