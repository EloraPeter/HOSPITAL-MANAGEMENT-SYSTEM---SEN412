// pages/staff/components/StaffTable/StaffTable.tsx
import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { Badge } from '@/shared/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Skeleton } from '@/shared/ui/skeleton';
import type { StaffMember } from '@/entities/staff';

const columnHelper = createColumnHelper<StaffMember>();

const statusColorMap: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  'on-leave': 'bg-yellow-100 text-yellow-800',
  suspended: 'bg-red-100 text-red-800',
  terminated: 'bg-gray-100 text-gray-800',
  probation: 'bg-blue-100 text-blue-800',
};

const columns = [
  columnHelper.accessor('employeeId', {
    header: 'Employee ID',
    cell: (info) => (
      <span className="font-mono text-sm">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('personalInfo', {
    header: 'Staff Name',
    cell: (info) => {
      const { firstName, lastName } = info.getValue();
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={`/avatars/${info.row.original.id}`} />
            <AvatarFallback>
              {firstName[0]}{lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{firstName} {lastName}</p>
            <p className="text-sm text-muted-foreground">
              {info.row.original.professionalInfo.designation}
            </p>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor('professionalInfo.department', {
    header: 'Department',
    cell: (info) => <Badge variant="outline">{info.getValue()}</Badge>,
  }),
  columnHelper.accessor('type', {
    header: 'Role',
   