import { useAuthStore, useUIStore } from '@/app/store';
import React from 'react';
import { Dropdown, Badge } from 'react-bootstrap';
import { 
  Bell, 
  Search, 
  PersonCircle, 
  Gear, 
  BoxArrowRight,
  List,
  Moon,
  Sun
} from 'react-bootstrap-icons';


export const Header: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const theme = useUIStore((state) => state.theme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);

  return (
    <header className="bg-white border-bottom">
      <div className="d-flex justify-content-between align-items-center px-4 py-2">
        {/* Left Side */}
        <div className="d-flex align-items-center gap-3">
          <button 
            className="btn btn-light btn-sm rounded-circle"
            onClick={toggleSidebar}
            style={{ width: '38px', height: '38px' }}
          >
            <List size={20} />
          </button>
          
          <div className="d-none d-md-flex align-items-center bg-light rounded-pill px-3 py-1" style={{ width: '300px' }}>
            <Search size={16} className="text-muted me-2" />
            <input
              type="text"
              className="form-control border-0 bg-transparent shadow-none"
              placeholder="Search patients, doctors..."
              style={{ fontSize: '0.875rem' }}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="d-flex align-items-center gap-3">
          {/* Theme Toggle */}
          <button 
            className="btn btn-light btn-sm rounded-circle"
            onClick={toggleTheme}
            style={{ width: '38px', height: '38px' }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications */}
          <button className="btn btn-light btn-sm rounded-circle position-relative" style={{ width: '38px', height: '38px' }}>
            <Bell size={18} />
            <Badge 
              bg="danger" 
              className="position-absolute top-0 start-100 translate-middle rounded-pill"
              style={{ fontSize: '0.6rem' }}
            >
              3
            </Badge>
          </button>

          {/* User Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle 
              variant="light" 
              id="user-dropdown"
              className="d-flex align-items-center gap-2 rounded-pill"
              style={{ border: 'none' }}
            >
              <div 
                className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white"
                style={{ width: '32px', height: '32px', fontSize: '0.875rem' }}
              >
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div className="d-none d-md-block text-start">
                <div className="fw-semibold" style={{ fontSize: '0.875rem', lineHeight: '1.2' }}>
                  {user?.firstName} {user?.lastName}
                </div>
                <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                  {user?.role}
                </small>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="shadow-sm border-0 mt-2">
              <Dropdown.Header>
                <strong>{user?.firstName} {user?.lastName}</strong>
                <br />
                <small className="text-muted">{user?.email}</small>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item href="/settings/profile">
                <PersonCircle size={16} className="me-2" />
                Profile
              </Dropdown.Item>
              <Dropdown.Item href="/settings">
                <Gear size={16} className="me-2" />
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout} className="text-danger">
                <BoxArrowRight size={16} className="me-2" />
                Sign Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};