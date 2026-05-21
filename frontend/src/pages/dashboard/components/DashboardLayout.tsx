import { PageHeader } from '@/shared/ui/layout';
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { 
  People, 
  CalendarCheck, 
  PersonBadge, 
  CashStack,
  ArrowUp,
  ArrowDown
} from 'react-bootstrap-icons';


const DashboardPage: React.FC = () => {
  const stats = [
    { 
      title: 'Total Patients', 
      value: '1,234', 
      change: '+12%', 
      trend: 'up',
      icon: <People size={24} />, 
      color: 'primary' 
    },
    { 
      title: 'Appointments Today', 
      value: '48', 
      change: '+8%', 
      trend: 'up',
      icon: <CalendarCheck size={24} />, 
      color: 'success' 
    },
    { 
      title: 'Active Doctors', 
      value: '32', 
      change: '-2%', 
      trend: 'down',
      icon: <PersonBadge size={24} />, 
      color: 'info' 
    },
    { 
      title: 'Revenue Today', 
      value: '$12,450', 
      change: '+15%', 
      trend: 'up',
      icon: <CashStack size={24} />, 
      color: 'warning' 
    },
  ];

  return (
    <>
      <PageHeader 
        title="Dashboard" 
        subtitle="Welcome back! Here's what's happening today."
        actions={
          <button className="btn btn-primary">
            Download Report
          </button>
        }
      />

      {/* Stats Cards */}
      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col key={index} md={6} lg={3} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <p className="text-muted mb-1 small">{stat.title}</p>
                    <h3 className="mb-0 fw-bold">{stat.value}</h3>
                  </div>
                  <div 
                    className={`rounded-3 d-flex align-items-center justify-content-center bg-${stat.color} bg-opacity-10`}
                    style={{ width: '48px', height: '48px' }}
                  >
                    <span className={`text-${stat.color}`}>{stat.icon}</span>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-1">
                  {stat.trend === 'up' ? (
                    <ArrowUp size={14} className="text-success" />
                  ) : (
                    <ArrowDown size={14} className="text-danger" />
                  )}
                  <small className={stat.trend === 'up' ? 'text-success' : 'text-danger'}>
                    {stat.change}
                  </small>
                  <small className="text-muted">vs last month</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts and Tables Placeholder */}
      <Row>
        <Col lg={8} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-3">Patient Statistics</h5>
              <div className="bg-light rounded-3 d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                <p className="text-muted">Chart will be displayed here</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-3">Recent Patients</h5>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                  <div 
                    className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: '40px', height: '40px' }}
                  >
                    <People size={18} className="text-primary" />
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-0 fw-semibold small">Patient {i}</p>
                    <small className="text-muted">Checked in 5 min ago</small>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;