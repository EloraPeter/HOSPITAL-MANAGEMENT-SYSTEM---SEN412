// src/pages/staff/components/StaffStats/StaffStats.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Users, UserCheck, UserX, Activity, Stethoscope } from 'lucide-react';

interface StaffStatsData {
  total: number;
  active: number;
  onLeave: number;
  byDepartment: Record<string, number>;
  byType: Record<string, number>;
}

interface StaffStatsProps {
  data?: StaffStatsData;
}

export function StaffStats({ data }: StaffStatsProps) {
  const stats = data || {
    total: 0,
    active: 0,
    onLeave: 0,
    byDepartment: {},
    byType: {},
  };

  const statCards = [
    {
      title: 'Total Staff',
      value: stats.total,
      icon: <Users className="h-6 w-6 text-blue-600" />,
      description: 'All staff members',
    },
    {
      title: 'Active Staff',
      value: stats.active,
      icon: <UserCheck className="h-6 w-6 text-green-600" />,
      description: 'Currently working',
    },
    {
      title: 'On Leave',
      value: stats.onLeave,
      icon: <UserX className="h-6 w-6 text-yellow-600" />,
      description: 'Currently on leave',
    },
    {
      title: 'Departments',
      value: Object.keys(stats.byDepartment).length,
      icon: <Activity className="h-6 w-6 text-purple-600" />,
      description: 'Active departments',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>w
      ))}
    </div>
  );
}