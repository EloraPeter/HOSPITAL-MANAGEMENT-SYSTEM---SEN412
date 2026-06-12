// features/staff-management/ui/StaffTable.tsx
import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  createColumnHelper,
  flexRender,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Skeleton } from '@/shared/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { useStaffFilters } from '../model/useStaff';
import type { StaffMember } from '@/entities/staff/model/staff.types';

interface StaffTableProps {
  data: StaffMember[] | undefined;
  isLoading: boolean;
  totalCount?: number;
  onRowClick?: (staff: StaffMember) => void;
  onEdit?: (staff: StaffMember) => void;
  onDelete?: (staff: StaffMember) => void;
  onSchedule?: (staff: StaffMember) => void;
}

const columnHelper = createColumnHelper<StaffMember>();

const statusColorMap: Record<string, string> = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'on-leave': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  suspended: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  terminated: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  probation: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
};

export function StaffTable({ 
  data = [], 
  isLoading, 
  totalCount = 0,
  onRowClick,
  onEdit,
  onDelete,
  onSchedule 
}: StaffTableProps) {
  const { filters, updateFilters } = useStaffFilters();

  const columns = useMemo(() => [
    columnHelper.accessor('employeeId', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Employee ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: (info) => (
        <span className="font-mono text-sm">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor(row => `${row.personalInfo.firstName} ${row.personalInfo.lastName}`, {
      id: 'fullName',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Staff Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: (info) => {
        const staff = info.row.original;
        const { firstName, lastName } = staff.personalInfo;
        return (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`/api/avatars/${staff.id}`} />
              <AvatarFallback className="bg-primary/10">
                {firstName[0]}{lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{firstName} {lastName}</p>
              <p className="text-sm text-muted-foreground">
                {staff.professionalInfo.designation}
              </p>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor('professionalInfo.department', {
      header: 'Department',
      cell: (info) => (
        <Badge variant="outline">{info.getValue()}</Badge>
      ),
    }),
    columnHelper.accessor('type', {
      header: 'Role',
      cell: (info) => (
        <span className="capitalize">{info.getValue().replace('-', ' ')}</span>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => {
        const status = info.getValue();
        return (
          <Badge className={statusColorMap[status] || ''}>
            {status.replace('-', ' ')}
          </Badge>
        );
      },
    }),
    columnHelper.accessor('professionalInfo.yearsOfExperience', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Experience
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: (info) => (
        <span>{info.getValue()} years</span>
      ),
    }),
    columnHelper.accessor('employmentDetails.joiningDate', {
      header: 'Join Date',
      cell: (info) => {
        const date = new Date(info.getValue());
        return (
          <span>{date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}</span>
        );
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => {
        const staff = info.row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onRowClick?.(staff)}>
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSchedule?.(staff)}>
                View Schedule
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit?.(staff)}>
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete?.(staff)}
                className="text-red-600"
              >
                Delete Staff
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ], [onRowClick, onEdit, onDelete, onSchedule]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: (sorting: SortingState) => {
      updateFilters({
        sortBy: sorting[0]?.id,
        sortOrder: sorting[0]?.desc ? 'desc' : 'asc',
      });
    },
    onColumnFiltersChange: (filters: ColumnFiltersState) => {
      // Handle column-specific filters
    },
    state: {
      sorting: filters.sortBy ? [{
        id: filters.sortBy,
        desc: filters.sortOrder === 'desc',
      }] : [],
      pagination: {
        pageIndex: (filters.page || 1) - 1,
        pageSize: filters.limit || 10,
      },
    },
    manualPagination: true,
    pageCount: Math.ceil(totalCount / (filters.limit || 10)),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No staff members found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            totalCount
          )}{' '}
          of {totalCount} results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <Button
                key={i}
                variant={table.getState().pagination.pageIndex === i ? "default" : "outline"}
                size="sm"
                onClick={() => table.setPageIndex(i)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}