import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Button, Form, ButtonGroup } from 'react-bootstrap';
import { Plus, Download, Upload, Filter, Search, LayoutList, Grid3x3 } from 'lucide-react';
import { useStaff } from '@/features/staff-management/model/useStaff';
import { StaffCard } from './components/StaffCard/StaffCard';

import { StaffStats } from './components/StaffStats/StaffStats';
import { PageHeader } from '@/shared/ui/layout/PageHeader';
import { LoadingSpinner } from '@/shared/ui/feedback/LoadingSpinner';
import type { StaffFilters as StaffFiltersType } from '@/entities/staff/model/staff.types';
import { StaffFilters } from './components/StaffFilter/StaffFilter';

const StaffPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filters: StaffFiltersType = useMemo(
    () => ({
      search: searchParams.get('search') || '',
      department: searchParams.get('department') || '',
      type: searchParams.get('type') || '',
      status: searchParams.get('status') || '',
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 20,
      sortBy: searchParams.get('sortBy') || 'firstName',
      sortOrder: (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc',
    }),
    [searchParams]
  );

  const { data, isLoading, error } = useStaff(filters);

  const updateFilters = (newFilters: Partial<StaffFiltersType>) => {
    setSearchParams((prev) => {
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

  if (isLoading) {
    return <LoadingSpinner text="Loading staff..." />;
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <h5 className="text-danger">Error loading staff</h5>
        <p className="text-muted">{error}</p>
      </Container>
    );
  }

  return (
    <Container fluid className="p-3 p-md-4">
      <PageHeader
        title="Staff Management"
        subtitle="Manage hospital staff, schedules, and performance"
        actions={
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" size="sm">
              <Upload size={16} className="me-1" /> Import
            </Button>
            <Button variant="outline-secondary" size="sm">
              <Download size={16} className="me-1" /> Export
            </Button>
            <Button variant="primary" size="sm">
              <Plus size={16} className="me-1" /> Add Staff
            </Button>
          </div>
        }
      />

      {/* Stats */}
      <StaffStats data={data?.summary} />

      {/* Search & Filters */}
      <Row className="my-3 g-2">
        <Col md={6} lg={5}>
          <div className="input-group">
            <span className="input-group-text bg-white">
              <Search size={16} className="text-muted" />
            </span>
            <Form.Control
              type="text"
              placeholder="Search staff by name, email, or department..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
            />
          </div>
        </Col>
        <Col md={2} className="ms-auto">
          <div className="d-flex gap-2">
            <Button
              variant={showFilters ? 'primary' : 'outline-secondary'}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} className="me-1" /> Filters
            </Button>
            <ButtonGroup>
              <Button
                variant={viewMode === 'table' ? 'primary' : 'outline-secondary'}
                onClick={() => setViewMode('table')}
              >
                <LayoutList size={16} />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline-secondary'}
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 size={16} />
              </Button>
            </ButtonGroup>
          </div>
        </Col>
      </Row>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-3">
          <StaffFilters
            filters={filters}
            onFilterChange={updateFilters}
            onClose={() => setShowFilters(false)}
          />
        </div>
      )}

      {/* Staff List */}
      {viewMode === 'grid' ? (
        <Row className="g-3">
          {data?.staff?.map((staff) => (
            <Col key={staff.id} sm={6} lg={4} xl={3}>
              <StaffCard
                staff={staff}
                onClick={(s) => console.log('View staff:', s.id)}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.staff?.map((staff) => (
                  <tr key={staff.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center"
                          style={{ width: '36px', height: '36px', fontSize: '0.85rem', fontWeight: 600 }}
                        >
                          <span className="text-primary">
                            {staff.personalInfo.firstName[0]}{staff.personalInfo.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <p className="mb-0 fw-medium" style={{ fontSize: '0.9rem' }}>
                            {staff.personalInfo.firstName} {staff.personalInfo.lastName}
                          </p>
                          <small className="text-muted">{staff.type}</small>
                        </div>
                      </div>
                    </td>
                    <td>{staff.personalInfo.contactInfo.email}</td>
                    <td>{staff.professionalInfo.department}</td>
                    <td>{staff.professionalInfo.designation}</td>
                    <td>
                      <span className={`badge bg-${staff.status === 'active' ? 'success' : staff.status === 'on-leave' ? 'warning' : 'secondary'}`}>
                        {staff.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-1">View</button>
                      <button className="btn btn-sm btn-outline-secondary">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!data?.staff || data.staff.length === 0) && (
        <div className="text-center py-5">
          <p className="text-muted">No staff members found matching your filters.</p>
        </div>
      )}
    </Container>
  );
};

export default StaffPage;