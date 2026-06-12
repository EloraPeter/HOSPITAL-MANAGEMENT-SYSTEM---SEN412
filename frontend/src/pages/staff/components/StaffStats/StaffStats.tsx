import { Card, Row, Col } from 'react-bootstrap';
import { Users, UserCheck, UserX, Activity } from 'lucide-react';
import type { StaffStatsData } from '@/entities/staff/model/staff.types';

interface StaffStatsProps {
  data?: StaffStatsData;
}

export const StaffStats: React.FC<StaffStatsProps> = ({ data }) => {
  const stats = data || { total: 0, active: 0, onLeave: 0, byDepartment: {}, byType: {} };

  const statCards = [
    {
      title: 'Total Staff',
      value: stats.total,
      icon: <Users size={22} />,
      color: 'primary',
      description: 'All staff members',
    },
    {
      title: 'Active Staff',
      value: stats.active,
      icon: <UserCheck size={22} />,
      color: 'success',
      description: 'Currently working',
    },
    {
      title: 'On Leave',
      value: stats.onLeave,
      icon: <UserX size={22} />,
      color: 'warning',
      description: 'Currently on leave',
    },
    {
      title: 'Departments',
      value: Object.keys(stats.byDepartment).length,
      icon: <Activity size={22} />,
      color: 'info',
      description: 'Active departments',
    },
  ];

  return (
    <Row className="g-3">
      {statCards.map((stat, index) => (
        <Col key={index} sm={6} lg={3}>
          <Card className={`border-${stat.color} border-start border-4 shadow-sm h-100`}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>
                    {stat.title}
                  </p>
                  <h3 className="fw-bold mb-0">{stat.value}</h3>
                  <small className="text-muted">{stat.description}</small>
                </div>
                <div className={`text-${stat.color} bg-${stat.color} bg-opacity-10 rounded-3 p-2`}>
                  {stat.icon}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};