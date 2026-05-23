// src/pages/staff/components/StaffCard/StaffCard.tsx
import { StaffMember } from '@/entities/staff/model/staff.types';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';

interface StaffCardProps {
  staff: StaffMember;
  onClick?: (staff: StaffMember) => void;
}

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  'on-leave': 'bg-yellow-100 text-yellow-800',
  suspended: 'bg-red-100 text-red-800',
  terminated: 'bg-gray-100 text-gray-800',
  probation: 'bg-blue-100 text-blue-800',
};

export function StaffCard({ staff, onClick }: StaffCardProps) {
  const { personalInfo, professionalInfo, status, type } = staff;
  
  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick?.(staff)}
    >
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={`/api/avatars/${staff.id}`} />
          <AvatarFallback>
            {personalInfo.firstName[0]}{personalInfo.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold">
            {personalInfo.firstName} {personalInfo.lastName}
          </h3>
          <p className="text-sm text-muted-foreground">
            {professionalInfo.designation}
          </p>
        </div>
        <Badge className={statusColors[status]}>
          {status.replace('-', ' ')}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          {personalInfo.contactInfo.email}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          {personalInfo.contactInfo.phone}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {professionalInfo.department}
        </div>
        <div className="flex gap-2 mt-3">
          <Badge variant="outline">{type}</Badge>
          <Badge variant="outline">
            {professionalInfo.yearsOfExperience} years exp.
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}