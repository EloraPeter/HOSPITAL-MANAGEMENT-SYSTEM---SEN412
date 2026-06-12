import React from 'react';
import { Dropdown, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  PersonCircle, 
  Gear, 
  BoxArrowRight,
  List,
  Moon,
  Sun
} from 'react-bootstrap-icons';
import { useAuthStore } from '@/app/store/authStore';
import { useUIStore } from '@/app/store/uiStore';
import { NotificationDropdown } from '@/features/notifications';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const theme = useUIStore((state) => state.theme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="bg-white border-bottom sticky-top" style={{ zIndex: 1030 }}>
      <div className="d-flex justify-content-between align-items-center px-3 px-md-4 py-2">
        {/* Left Side */}
        <div className="d-flex align-items-center gap-2 gap-md-3">
          <button 
            className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center"
            onClick={toggleSidebar}
            style={{ width: '38px', height: '38px', minWidth: '38px' }}
          >
            <List size={20} />
          </button>
          
          <div className="d-none d-md-flex align-items-center bg-light rounded-pill px-3 py-1" style={{ width: '300px' }}>
            <Search size={16} className="text-muted me-2 flex-shrink-0" />
            <input
              type="text"
              className="form-control border-0 bg-transparent shadow-none"
              placeholder="Search patients, doctors..."
              style={{ fontSize: '0.875rem' }}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="d-flex align-items-center gap-2 gap-md-3">
          <button 
            className="btn btn-light btn-sm rounded-circle d-md-none d-flex align-items-center justify-content-center"
            style={{ width: '38px', height: '38px' }}
          >
            <Search size={18} />
          </button>

          <button 
            className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center"
            onClick={toggleTheme}
            style={{ width: '38px', height: '38px' }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications - Using our new component */}
          <NotificationDropdown />

          {/* User Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle 
              variant="light" 
              id="user-dropdown"
              className="d-flex align-items-center gap-2 rounded-pill border-0 px-2 px-md-3"
            >
              <div 
                className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white flex-shrink-0"
                style={{ width: '32px', height: '32px', fontSize: '0.875rem' }}
              >
                {user?.name?.[0] || 'U'}
              </div>
              <div className="d-none d-md-block text-start">
                <div className="fw-semibold" style={{ fontSize: '0.875rem', lineHeight: '1.2' }}>
                  {user?.name || 'User'}
                </div>
                <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                  {user?.role || 'Staff'}
                </small>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="shadow-sm border-0 mt-2" style={{ minWidth: '200px' }}>
              <Dropdown.Header>
                <strong>{user?.name}</strong>
                <br />
                <small className="text-muted">{user?.email}</small>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => navigate('/settings/profile')}>
                <PersonCircle size={16} className="me-2" />
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate('/settings')}>
                <Gear size={16} className="me-2" />
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className="text-danger">
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