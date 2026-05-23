import React from 'react';
import type { DepartmentLoad } from '../model/dashboard.types';

interface DepartmentLoadChartProps {
  departments: DepartmentLoad[];
}

export const DepartmentLoadChart: React.FC<DepartmentLoadChartProps> = ({ departments }) => {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
        <h5 className="fw-bold">Department Load</h5>
      </div>
      <div className="card-body">
        {departments.map((dept) => (
          <div key={dept.department} className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <small className="fw-semibold">{dept.department}</small>
              <small className="text-muted">
                {dept.patients}/{dept.capacity}
              </small>
            </div>
            <div className="progress" style={{ height: '8px' }}>
              <div
                className={`progress-bar ${
                  dept.percentage >= 80
                    ? 'bg-danger'
                    : dept.percentage >= 60
                    ? 'bg-warning'
                    : 'bg-success'
                }`}
                style={{ width: `${dept.percentage}%` }}
                role="progressbar"
                aria-valuenow={dept.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};