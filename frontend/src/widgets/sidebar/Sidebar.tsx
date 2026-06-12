import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Speedometer2, 
  People, 
  Calendar3, 
  PersonBadge,
  PersonPlus,
  Capsule,
  CashStack,
  GraphUp,
  Gear,
  Hospital,
  XLg
} from 'react-bootstrap-icons';
import { useUIStore } from '@/app/store/uiStore';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const location = useLocation();

  const navItems: NavItem[] = [
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      icon: <Speedometer2 size={20} /> 
    },
    { 
      path: '/patients', 
      label: 'Patients', 
      icon: <People size={20} />, 
      badge: '1.2k' 
    },
    { 
      path: '/appointments', 
      label: 'Appointments', 
      icon: <Calendar3 size={20} />, 
      badge: '48' 
    },
    { 
      path: '/staff',                    // <-- ADD THIS
      label: 'Staff',                     // <-- ADD THIS
      icon: <PersonPlus size={20} />,    // <-- ADD THIS
      badge: '150'                        // <-- ADD THIS (optional)
    },
    { 
      path: '/doctors', 
      label: 'Doctors', 
      icon: <PersonBadge size={20} /> 
    },
    { 
      path: '/pharmacy', 
      label: 'Pharmacy', 
      icon: <Capsule size={20} /> 
    },
    { 
      path: '/billing', 
      label: 'Billing', 
      icon: <CashStack size={20} /> 
    },
    { 
      path: '/reports', 
      label: 'Reports', 
      icon: <GraphUp size={20} /> 
    },
    { 
      path: '/settings', 
      label: 'Settings', 
      icon: <Gear size={20} /> 
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1035 }}
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className="position-fixed top-0 start-0 h-100 text-white"
        style={{
          width: '280px',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          background: 'linear-gradient(180deg, #1a73e8 0%, #0d47a1 100%)',
          zIndex: 1040,
        }}
      >
        {/* Logo */}
        <div className="d-flex align-items-center justify-content-between px-3" style={{ height: '64px' }}>
          <div className="d-flex align-items-center gap-2">
            <Hospital size={24} className="flex-shrink-0" />
            <span className="fw-bold text-truncate" style={{ fontSize: '1.1rem' }}>
              MediCare Pro
            </span>
          </div>
          <button 
            className="btn btn-link text-white d-lg-none p-0"
            onClick={toggleSidebar}
          >
            <XLg size={20} />
          </button>
        </div>

        <hr className="my-0 opacity-25" />

        {/* Navigation */}
        <nav className="py-2 overflow-auto" style={{ height: 'calc(100% - 65px)' }}>
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 992) toggleSidebar();
                }}
                className="d-flex align-items-center text-decoration-none mx-2 my-1 rounded-3"
                style={{
                  padding: '0.75rem 1rem',
                  color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                  background: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  transition: 'all 0.2s ease',
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
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
};