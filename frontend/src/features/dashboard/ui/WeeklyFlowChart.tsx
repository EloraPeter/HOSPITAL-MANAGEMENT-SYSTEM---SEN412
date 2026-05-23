import React from 'react';
import type { WeeklyPatientFlow } from '../model/dashboard.types';

interface WeeklyFlowChartProps {
  data: WeeklyPatientFlow[];
}

export const WeeklyFlowChart: React.FC<WeeklyFlowChartProps> = ({ data }) => {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white border-bottom py-3">
        <h5 className="fw-bold mb-0">Weekly Patient Flow</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-sm table-borderless mb-0">
            <thead>
              <tr className="text-muted small">
                <th>Day</th>
                <th className="text-center">Admissions</th>
                <th className="text-center">Discharges</th>
                <th className="text-center">Consultations</th>
                <th className="text-center">Emergencies</th>
              </tr>
            </thead>
            <tbody>
              {data.map((day) => (
                <tr key={day.day}>
                  <td className="fw-semibold small">{day.day}</td>
                  <td className="text-center">
                    <span className="badge bg-success bg-opacity-10 text-success">
                      {day.admissions}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-info bg-opacity-10 text-info">
                      {day.discharges}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-primary bg-opacity-10 text-primary">
                      {day.consultations}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-danger bg-opacity-10 text-danger">
                      {day.emergencies}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};