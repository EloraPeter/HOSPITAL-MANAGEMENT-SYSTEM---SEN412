import React from 'react';
import type { RevenueData } from '../model/dashboard.types';
import { formatCurrency, getTotalProfit, getTotalRevenue } from '../lib/dashboardHelper';
// import { formatCurrency, getTotalRevenue, getTotalProfit } from '../lib/dashboardHelpers';

interface RevenueChartProps {
  data: RevenueData[];
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const totalRevenue = getTotalRevenue(data);
  const totalProfit = getTotalProfit(data);

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white border-bottom py-3">
        <h5 className="fw-bold mb-0">Revenue Overview (12 Months)</h5>
      </div>
      <div className="card-body">
        <div className="d-flex align-items-end gap-1 mb-3" style={{ height: '200px' }}>
          {data.map((item) => (
            <div
              key={item.month}
              className="flex-grow-1 d-flex flex-column align-items-center"
              style={{ height: '100%' }}
            >
              <div className="d-flex flex-column justify-content-end flex-grow-1 w-100">
                <div
                  className="bg-primary bg-opacity-75 rounded-top mx-auto"
                  style={{
                    height: `${(item.revenue / maxRevenue) * 160}px`,
                    width: '70%',
                    maxWidth: '35px',
                    transition: 'height 0.3s ease',
                    cursor: 'pointer',
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

        {/* Summary */}
        <div className="row g-2 pt-3 border-top">
          <div className="col-6">
            <div className="bg-success bg-opacity-10 rounded-3 p-2 text-center">
              <small className="text-muted d-block">Total Revenue</small>
              <strong className="text-success">{formatCurrency(totalRevenue)}</strong>
            </div>
          </div>
          <div className="col-6">
            <div className="bg-primary bg-opacity-10 rounded-3 p-2 text-center">
              <small className="text-muted d-block">Total Profit</small>
              <strong className="text-primary">{formatCurrency(totalProfit)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};