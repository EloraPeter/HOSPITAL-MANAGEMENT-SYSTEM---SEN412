import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Speedometer2, 
  People, 
  Calendar3, 
  PersonBadge, 
  Capsule,
  CashStack,
  GraphUp,
  Gear,
  Hospital
} from 'react-bootstrap-icons';
import { useUIStore } from '@/app/store';


interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const location = useLocation();

  const navItems: NavItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: <Speedometer2 size={20} /> },
    { path: '/patients', label: 'Patients', icon: <People size={20} />, badge: '1.2k' },
    { path: '/appointments', label: 'Appointments', icon: <Calendar3 size={20} />, badge: '48' },
    { path: '/doctors', label: 'Doctors', icon: <PersonBadge size={20} /> },
    { path: '/pharmacy', label: 'Pharmacy', icon: <Capsule size={20} /> },
    { path: '/billing', label: 'Billing', icon: <CashStack size={20} /> },
    { path: '/reports', label: 'Reports', icon: <GraphUp size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Gear size={20} /> },
  ];

  return (
    <div
      className="position-fixed top-0 start-0 h-100 text-white"
      style={{
        width: sidebarOpen ? '280px' : '80px',
        transition: 'width 0.3s ease',
        background: 'linear-gradient(180deg, #1a73e8 0%, #0d47a1 100%)',
        zIndex: 1040,
        overflowX: 'hidden',
      }}
    >
      {/* Logo */}
      <div className="d-flex align-items-center px-3" style={{ height: '64px' }}>
        <Hospital size={24} className="flex-shrink-0" />
        {sidebarOpen && (
          <span className="ms-2 fw-bold text-truncate" style={{ fontSize: '1.1rem' }}>
            MediCare Pro
          </span>
        )}
      </div>

      <hr className="my-0 opacity-25" />

      {/* Navigation */}
      <nav className="py-2" style={{ height: 'calc(100% - 65px)', overflowY: 'auto' }}>
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="d-flex align-items-center text-decoration-none mx-2 my-1 rounded-3"
              style={{
                padding: sidebarOpen ? '0.75rem 1rem' : '0.75rem',
                color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                background: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                transition: 'all 0.2s ease',
                justifyContent: sidebarOpen ? 'flex-start' : 'center',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#fff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                }
              }}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              
              {sidebarOpen && (
                <>
                  <span className="ms-3 flex-grow-1 text-truncate" style={{ fontSize: '0.9rem' }}>
                    {item.label}
                  </span>
                  
                  {item.badge && (
                    <span 
                      className="badge rounded-pill flex-shrink-0"
                      style={{
                        fontSize: '0.7rem',
                        background: isActive ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};