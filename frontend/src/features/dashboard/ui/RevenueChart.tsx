import React from 'react';
import type { RevenueData } from '../model/dashboard.types';
import { formatCurrency } from '../lib/dashboardHelper';


interface RevenueChartProps {
  data: RevenueData[];
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
        <h5 className="fw-bold">Revenue Overview</h5>
      </div>
      <div className="card-body">
        <div className="d-flex align-items-end gap-1" style={{ height: '200px' }}>
          {data.map((item) => (
            <div
              key={item.month}
              className="flex-grow-1 d-flex flex-column align-items-center"
              style={{ height: '100%' }}
            >
              <div className="d-flex flex-column justify-content-end flex-grow-1 w-100">
                <div
                  className="bg-primary bg-opacity-75 rounded-top w-100 mx-auto"
                  style={{
                    height: `${(item.revenue / maxRevenue) * 160}px`,
                    maxWidth: '30px',
                    transition: 'height 0.3s ease',
                  }}
                  title={`${item.month}: ${formatCurrency(item.revenue)}`}
                />
              </div>
              <small className="text-muted mt-1" style={{ fontSize: '0.65rem' }}>
                {item.month}
              </small>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-top">
          <div className="d-flex justify-content-between">
            <small className="text-muted">
              Total Revenue: <strong>{formatCurrency(data.reduce((s, d) => s + d.revenue, 0))}</strong>
            </small>
            <small className="text-muted">
              Total Expenses: <strong>{formatCurrency(data.reduce((s, d) => s + d.expenses, 0))}</strong>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};