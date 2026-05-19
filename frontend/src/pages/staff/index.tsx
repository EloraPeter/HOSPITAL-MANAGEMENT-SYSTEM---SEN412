// pages/staff/index.tsx
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Download, Upload, Filter } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { useStaff } from '@/shared/api/hooks/useStaff';
import StaffTable from './components/StaffTable/StaffTable';
import StaffCard from './components/StaffCard/StaffCard';
import StaffFilters from './components/StaffFilters/StaffFilters';
import StaffStats from './components/StaffStats/StaffStats';

export default function StaffPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract filters from URL
  const filters = useMemo(() => ({
    search: searchParams.get('search') || '',
    department: searchParams.get('department') || '',
    type: searchParams.get('type') || '',
    status: searchParams.get('status') || '',
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 20,
    sortBy: searchParams.get('sortBy') || 'firstName',
    sortOrder: (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc',
  }), [searchParams]);

  const { data, isLoading, error } = useStaff(filters);

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });
      return params;
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage hospital staff, schedules, and performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {}}>
            <Upload className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button variant="outline" onClick={() => {}}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button onClick={() => {}}>
            <Plus className="mr-2 h-4 w-4" /> Add Staff
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <StaffStats data={data?.summary} />

      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <Input
            placeholder="Search staff by name, ID, or department..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
          <TabsList>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="grid">Grid</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {showFilters && (
        <StaffFilters
          filters={filters}
          onFilterChange={updateFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      {/* Staff List */}
      {viewMode === 'table' ? (
        <StaffTable
          data={data?.staff}
          isLoading={isLoading}
          filters={filters}
          onFilterChange={updateFilters}
          onRowClick={(staff) => {
            // Navigate to staff detail
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.staff?.map((staff) => (
            <StaffCard
              key={staff.id}
              staff={staff}
              onClick={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}